import type {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Store from '../../store';
import './styles/AppBar.scss';


const AppBar: FC = () => {
    const navigate = useNavigate();
    const username = useRecoilValue(Store.username);

    return (
        <nav>
            <h4 className="title" onClick={()=>{
                navigate('/');
            }}>
               Memegram 
            </h4>

            <h4 className="username" onClick={()=>{
                navigate('/meme-dashboard');
            }}>
                {username}
            </h4>
        </nav>
    )
}

export default AppBar;