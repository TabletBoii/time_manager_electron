import React from 'react';
import { classNames } from 'renderer/shared/lib/classNames';
import cls from './MainPage.module.scss'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();
    let project = window.electron.getProjectList();
    return (
        <div className={ classNames(cls.MainPage, {}, []) }>
            
            <div className={ cls.projectContent }>
                <button onClick={() => {navigate('/create_project')}}>Создать проект</button>
                <div>
                    {
                        project.map((item: any) => {
                            <div>{item}</div>
                        })
                    }
                    <div>Проект 1</div>
                    <div>Проект 2</div>
                    <div>Проект 3</div>
                    <div>Проект 4</div>
                    <div>Проект 5</div>
                </div>
            </div>
            
        </div>
    );
};

export default MainPage;