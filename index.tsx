import type {FC} from 'react';
import useDocumentTitle from '@rehooks/document-title';

const Home:FC = () => {
    
        useDocumentTitle ('Alvakheda');
    
        return (
            <div>
                <h1>Home</h1>
            </div>
        )
}

export default Home;