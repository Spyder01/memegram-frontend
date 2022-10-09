import type { FC } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Store from '../../store';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Validate } from '../../utils';
import { api } from '../../server';
import './styles/SignUp.scss';


const SignUp: FC = () => {

    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const [, setUsername] = useRecoilState(Store.username);
    const [, setToken] = useRecoilState(Store.token);
    const [, setIsLoggedIn] = useRecoilState(Store.isLoggedIn);

    const [caption, setCaption] = useState({
        text: '',
        visibility: false,
    })

    const navigate = useNavigate();

    const handleChange = (e: any, regex = /^[a-zA-Z0-9\_\.]+$/) => {
        if (regex.test(e.target.value) || e.target.value === "" || e.target.value === null) {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { username, password } = form;
        const validated: boolean = Validate({ username, password }, setCaption);
        if (validated) {
            setCaption({
                text: '',
                visibility: false,
            })

            try {

                const response = await fetch(`${api}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                });

                //  const data = await response.json();

                if (response.status === 200 || response.status === 201) {

                    const login = await fetch(`${api}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(form)
                    });

                    if (login.status === 200) {

                        const data = await login.json();
                        setUsername(form.username);
                        setToken(data.token);
                        setIsLoggedIn(true);
                        navigate('/');

                    }
                } else {
                    const data = await response.json();
                    if (data.message)
                        setCaption({
                            text: data.message,
                            visibility: true,
                        })
                    else if (data.error)
                        setCaption({
                            text: data.error,
                            visibility: true,
                        })
                    else if (data.err)
                        setCaption({
                            text: data.err,
                            visibility: true,
                        });
                }


            } catch (error: any) {
                console.log(error);
            }


        }
    }

    return (
        <main className="sign-up">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className="header">
                Memegram
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="caption" style={{
                    visibility: caption.visibility ? 'visible' : 'hidden'
                }}>
                    {
                        caption.text
                    }
                </div>
                <Input type="text" name="username" placeholder="Username" value={form.username} className='inp-username' onChange={e => handleChange(e)} maxLength={20} />
                <Input type='password' name="password" placeholder="Password" value={form.password} className='inp-password' onChange={e => handleChange(e, /^[a-zA-Z0-9\_\.\'\"\:\;\!\@\#\$\%\^\&\*]+$/)} />
                <Button type='submit' className='btn-sign-up' >Submit</Button>

                <div className="links">
                    <span>Already have an account?</span>
                    <span onClick={() => navigate('/login')} className="link">Login</span>
                </div>
            </form>
        </main>
    )
}

export default SignUp;