import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { classNames } from '../shared/lib/classNames';
import './styles/index.scss';
import { Sidebar } from '../widgets/Sidebar';
import { Titlebar } from '../widgets/Titlebar';
import { AppRouter } from './providers/router';

export default function App() {
  

  return (
    <Router>
      <div className='app'>
        <Titlebar/>  
        <Sidebar/>
        <AppRouter/>
      </div>   
    </Router>
  );
}
