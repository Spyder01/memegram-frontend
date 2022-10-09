import type {FC} from 'react';
import './styles/Loader.scss';

const Loader: FC = () => {
    return (
        <div className="loader">
        <div className="loader__spinner" />
        </div>
    );
}

export default Loader;