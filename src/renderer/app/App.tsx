import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { classNames } from '../shared/lib/classNames';
import './styles/index.scss';
import { Sidebar } from '../widgets/Sidebar';
import { Titlebar } from '../widgets/Titlebar';
import { AppRouter } from './providers/router';
import { StoreProvider } from './providers/StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  

  return (
    <StoreProvider>
      <Router>
        <div className='app'>
          <Titlebar/>  
          
          <Sidebar/>
          <div className='contentContainer'>
          <ToastContainer className="Toastify__toast-container"/>
            <AppRouter/>
            
          </div>
        </div>   
      </Router>
    </StoreProvider>
  );
}
