import {
  RecoilRoot
} from 'recoil';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import './App.css'

function App() {


  return (
    <RecoilRoot>
        <Router>
          <Routes />
        </Router>
    </RecoilRoot>
  )
}

export default App
