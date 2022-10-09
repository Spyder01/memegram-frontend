import type { FC } from 'react';
import Image from '../Image';
import './styles/MemeImageLayout.scss';


type Images = Array<{
    id: string;
    url: string;
    title: string;
    description?: string;
}>;

interface Props {
    images: Images;
    onClick: (id: string) => void;
}

const MemeImageLayout: FC<Props> = ({ images, onClick }) => {

    return (
        <div className="meme-image-layout">
            {
                images.map(({ id, url, title }) => (
                    <div onClick={() => onClick(id)} className='meme-image-item'>
                        <Image key={id} src={url} alt={title} Loader={() => <></>} className={'meme-image'} />
                    </div>
                ))
            }
        </div>
    )
}

export default MemeImageLayout;