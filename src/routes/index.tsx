import { FC } from 'react';
import { lazy, Suspense } from 'react';
import {
    Route,
    Routes
} from 'react-router-dom';
import Loader from '../components/Loader';

interface RouteType {
    path: string;
    component: FC;
}


// Lazily load routes and code split. 
const Home = lazy ((): Promise<any> => import ('../views/Home'));
const SignUp = lazy ((): Promise<any> => import ('../views/SignUp'));
const Login = lazy ((): Promise<any> => import ('../views/Login'));
const Meme = lazy ((): Promise<any> => import ('../views/Meme'));
const MemeScreen = lazy ((): Promise<any> => import ('../views/MemeScreen'));
const MemeDashboard = lazy ((): Promise<any> => import ('../views/MemeDashboard'));
const MemeView = lazy ((): Promise<any> => import ('../views/MemeView'));

const routes: RouteType[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/meme/:id',
        component: Meme
    },
    {
        path: '/meme-screen/:id',
        component: MemeScreen
    },
    {
        path: '/meme-dashboard',
        component: MemeDashboard
    },
    {
        path: '/meme-view/:id', 
        component: MemeView
    }
];

const RouteWithSubRoutes: FC = () => {
    const Element = (Component: FC) => <Component />;

    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={Element(route.component)} />
                ))}
            </Routes>
        </Suspense >
    )
}

export default RouteWithSubRoutes;