import React, { useEffect, useState } from 'react';
import { classNames } from 'renderer/shared/lib/classNames';
import cls from './MainPage.module.scss'
import { Link, useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import { IProjects } from 'main/database/queries/dbQueries'
import Button from '@mui/material/Button/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';



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
            
            <div className={ cls.content }>
                
                <div className={ cls.title }>
                    <h1>Проекты</h1> 
                    <Button startIcon={<AddCircleIcon/>} variant="contained" onClick={() => {navigate('/create_project')}}>
                        Создать проект
                    </Button>
                </div>
                <div className={ cls.projectContent }>
                    {
                        projects.map((project) => {
                            return (
                                <div className={ cls.projectElement }>
                                    <Link 
                                        to='/work' 
                                        state={{ project: project }}
                                        className={ cls.projectButton }
                                    >
                                        {project.project_name}
                                    </Link>
                                    <MoreVertIcon className={ cls.projectOptions }/>
                                </div>
                                
                            )
                        })
                    }
                </div>        
            </div>
            
        </div>
    );
};

export default MainPage;