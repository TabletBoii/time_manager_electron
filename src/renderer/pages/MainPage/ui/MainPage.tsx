import React, { useEffect, useState } from 'react';
import { classNames } from 'renderer/shared/lib/classNames';
import cls from './MainPage.module.scss'
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import { IProjects } from 'main/database/queries/dbQueries'


const MainPage = () => {
    const [projects, setProjects] = useState(Array<IProjects>);
    const navigate = useNavigate();

    async function getProjects() {
        let projectObject: Array<IProjects> = await ipcRenderer.invoke("get-projects");

        if (projectObject) {
            setProjects(projectObject);
        }
    }
    
    useEffect(() => {
        getProjects()
    }, [])
    return (
        <div className={ classNames(cls.MainPage, {}, []) }>
            
            <div className={ cls.projectContent }>
                <button onClick={() => {navigate('/create_project')}}>Создать проект</button>
                <div>
                    {
                        projects.map((project) => {
                            return (
                                <div key={ project.id }>{project.project_name} {project.price} </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    );
};

export default MainPage;