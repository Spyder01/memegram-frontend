import type {FC} from 'react';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import AppBar from '../../components/AppBar';
import Image from '../../components/Image';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Store from '../../store';
import { api } from '../../server';

import "./style/Meme.scss"



const Meme:FC = ()=>{

    const token = useRecoilValue (Store.token) 
    const isAuth = useRecoilValue (Store.isLoggedIn)


    const [isLoading, setIsLoading] = useState(true);
    const [meme, setMeme]:any = useState({});
    const [form, setForm]:any = useState ({});
    const [title, setTitle] = useState ({
        title: "",
        description: ""
    });

    const navigate = useNavigate ();
    const {id} = useParams ();

    useEffect (()=>{
        if (!isAuth) {
            navigate('/login');
        }
        else getMeme (setMeme).then (
            ()=>setIsLoading (false)
        );
    }, [isAuth])

    const getMeme = async (setMeme: (arg0: any) => void)=>{
        const res = await fetch (`${api}/memes/templates/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const meme = await res.json ();
        if (meme.success)
            setMeme (meme.meme);
        console.log (meme)
    }

    if (isLoading)
        return (<Loader />)

    const onSubmit = async (e:any)=>{
        e.preventDefault ();
        let f = false; 
        for (let key in form) {
            if (form[key] !== "" || form[key] !== null || form[key] !== undefined) {
                f = true;
            }
        }
        if (!f) {
            alert ("All the fields cannot be empty")
        } else {
            const captions = Object.keys (form).map (key=>{
                return {
                    text: form[key],
                    boxNumber: parseInt(key)+1
                }
            })

        try {
            const res = await fetch (`${api}/memes`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify ({
                    id: id,
                    captions: captions,
                    title: title.title,
                    description: title.description
                })
            })
            const data = await res.json ();
            if (data.success) {
                navigate (`/meme-screen/${data.id}`);
            } else {
                alert (data.message);
            }
        } catch (err:any) {
            alert (err.message)
        }

        }
    }

    
    return(
        <main className="meme">
            <AppBar />
            <section className="body">
                <div className="img-container">
                    <Image src={meme.url} alt={meme.name} Loader={()=><></>} className="meme-img"/>
                </div>

                <form action="" className="captions" onSubmit={onSubmit}>
                    <div className="title-description">
                        <Input placeholder='Title' className="title" value={title.title} onChange={(e)=>setTitle ({
                            ...title,
                            title: e.target.value
                        })} />
                        <textarea placeholder='Description' className="Description" value={title.description} onChange={(e)=>setTitle ({
                            ...title,
                            description: e.target.value
                        })} />
                    </div>
                    <h2>
                        Captions
                    </h2>
                    <div className="caption-grid">
                    {   
                        (()=>{
                            let ele = [];
                            for (let i = 0; i < meme.box_count; i++) {
                                   ele.push (<Input key={i} name={`caption${i}`} placeholder={`Caption ${i+1}`} className="caption" value={form[i]} onChange={(event)=>setForm ({
                                        ...form,
                                        [i]: event.target.value
                                   })} />)
                            }
                            return ele;
                        }) ()
                    }
                    </div>
                    <Button type="submit" className='submit-btn'>Submit</Button>
                </form>
            </section>
        </main>
    )
}


export default Meme;