import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { classNames } from 'renderer/shared/lib/classNames';
import cls from './Titlebar.module.scss'
const { ipcRenderer } = window.require('electron');

interface TitlebarProps {
    className: string;
}

export const Titlebar = ({className}: TitlebarProps) => {

    const closeWindow = () => {
        ipcRenderer.send('closeApp');
    };

    const minimizeWindow = () => {
        ipcRenderer.send('minimizeApp');
    };

    const maximizeWindow = () => {
        ipcRenderer.send('maximizeApp');
    };
    
    return (
        <div className={ classNames(cls.topBar, {}, [className]) }>
            <div className={ classNames(cls.titleBar, {}, [className]) }>
                <div className={ classNames(cls.title, {}, [className]) }>
                    Time Manager
                </div>
            </div>
            <div className={ classNames(cls.titleBarBtns, {}, [className]) }>
                <button onClick={minimizeWindow} id={cls.minimizeBtn} className={ `${cls.topBtn} ${cls.minimizeBtn}` }></button>
                <button onClick={maximizeWindow} id={cls.maxResBtn} className={ `${cls.topBtn} ${cls.maximizeBtn}` }></button>
                <button onClick={closeWindow} id={cls.closeBtn} className={ `${cls.topBtn} ${cls.closeBtn}`}></button>
            </div>
        </div>
    );
};
