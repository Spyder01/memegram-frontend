import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Store from '../../store';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import AppBar from '../../components/AppBar';
import MemeImageLayout from '../../components/MemeImageLayout';
import BottomBar from '../../components/BottomBar';
import { api } from '../../server';
import './styles/index.scss';

const Home: FC = () => {

    const navigate = useNavigate();
    const isAuth = useRecoilValue(Store.isLoggedIn);
    const token = useRecoilValue (Store.token)
    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState ([]);


    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        } else getTemplates (setTemplates).then (
            ()=>setIsLoading (false)
        );
    }, [isAuth]);

    const getTemplates = async (setTemplates: (arg0: any) => void)=>{
        const res = await fetch (`${api}/memes/templates`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

        })
        const templates = await res.json ();
        if (templates.success)
        setTemplates (templates.memes);
        console.log (templates)
    }

    const handleClick = (id: string) => {
        navigate (`/meme/${id}`);
    }



    

    if (isLoading)
        return (<>Loading...</>)
    else
        return (
            <main className="home">
                <Helmet>
                    <title>Memegram</title>
                </Helmet>
                <AppBar />
                <div className="meme-templates">
                    <MemeImageLayout images={templates} onClick={handleClick } />
                </div>
                <BottomBar />
            </main>
        )
}

export default Home;