import type {FC} from 'react';
import {useState, useEffect} from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate} from 'react-router-dom';
import AppBar from '../../components/AppBar';
import MemeImageLayout from '../../components/MemeImageLayout';
import Loader from '../../components/Loader';
import BottomBar from '../../components/BottomBar';
import Store from '../../store';
import { api } from '../../server';
import './styles/MemeDashboard.scss';


const MemeDashboard: FC = () => {
    const token = useRecoilValue(Store.token)
    const isAuth = useRecoilValue(Store.isLoggedIn)


    const [isLoading, setIsLoading] = useState(true);
  //  const [saved, setSaved] = useState(false);
    const [memes, setMemes]: any = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
        else if (isLoading || ((memes === undefined || memes === null))) {
            getMemes ().then(() => setIsLoading(false)).catch(err => alert(err.message))
        }
    }, [isLoading, isAuth])

    const getMemes = async () => {
        try{
            const res = await fetch(`${api}/memes`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const memes = await res.json();
            if (memes.success) {
                setMemes(memes.memes);
              //  setIsLoading(false);
            console.log(memes)
            }
        } catch (error) {
            throw error;
        }
    }

   const onClick = (id:string) => {
    navigate(`/meme-view/${id}`)
   }
   if (isLoading) {
       return <Loader />
   }
    return (
        <main className="meme-dashboard">
            <AppBar />
            <div className="body">
                <MemeImageLayout images={memes} onClick={onClick} />
            </div>
            <BottomBar />
        </main>
    );
}

export default MemeDashboard;