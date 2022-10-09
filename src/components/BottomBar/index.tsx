import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {FiSearch, FiHome} from 'react-icons/fi';
import Button from '../Button';
import './styles/BottomBar.scss';


const BottomBar: FC = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className="container">
                <Button onClick={() => navigate ("/")} className="icon-btn">
                    <FiHome />
                </Button>
                <Button onClick={() => navigate ("/meme-dashboard")} className="icon-btn">
                    <FiSearch />
                </Button>
            </div>
        </footer>
    )
}


export default BottomBar;