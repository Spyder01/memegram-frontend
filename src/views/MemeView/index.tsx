import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {AiOutlineDownload} from 'react-icons/ai';
import {BsSave} from 'react-icons/bs';
import AppBar from '../../components/AppBar';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Store from '../../store';
import { api } from '../../server';
import { download } from '../../utils';
import './styles/MemeView.scss';

const Page: FC = () => {
    const token = useRecoilValue(Store.token)
    const isAuth = useRecoilValue(Store.isLoggedIn)


    const [isLoading, setIsLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [meme, setMeme]: any = useState({});

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
        else if (isLoading || ((meme === undefined || meme === null) && meme.id !== id)) {
            getMeme(id).then(() => setIsLoading(false)).catch(err => alert(err.message))
        }
    }, [isLoading, isAuth])


    const getMeme = async (id: string | undefined) => {
        try {
            const res = await fetch(`${api}/memes/created`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
            const meme = await res.json();
            if (meme.success)
                setMeme(meme.meme);
            console.log(meme)
        } catch (error) {
            throw error;
        }
    }

    const onDownload = ()=>{
        download(meme.url)
    }

    const onSave = ()=>{
    
        fetch (`${api}/memes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: meme.id,
                operation: !saved? 'save' : 'unsave'
        })
        }).then(res => res.json().then(data => {
            if (data.success) {
                alert(!saved? 'Saved' : 'Unsaved')
                setSaved (!saved)
            }
            else
                alert(data.message)
        })).catch(err => alert(err.message))
    }

    if (isLoading)
        return (<Loader />)


    return (
        <main className="meme-view">
            <AppBar />
            <section className="body">
                <div className="img-container">
                    <Image src={meme.url} alt={meme.name} Loader={() => <></>} className="meme-img" />
                    <MemeOptions onDownload={onDownload} onSave={onSave} />
                </div>
                <div className="text-container">
                    <header className="title">
                        <h1>{meme.title}</h1>
                    </header>

                    <div className="description">
                        <p>{meme.description}</p>
                    </div>
                </div>

                <div className="buttons">
                    <Button onClick={()=>navigate("/meme-dashboard")} className="PostBtn">Back</Button>
                </div>

            </section>
        </main>
    )
}


const MemeOptions:FC<{onDownload: ()=>void, onSave: ()=>void}> = ({onDownload, onSave})=>{
    
    return(
        <div className="meme-options">
            <Button onClick={onDownload} className="DownloadBtn">
                <AiOutlineDownload />
            </Button>
            <Button onClick={onSave} className="SaveBtn">
                <BsSave />
            </Button>
        </div>
    )
}

export default Page;