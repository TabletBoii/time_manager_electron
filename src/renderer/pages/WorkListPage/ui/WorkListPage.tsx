import { useEffect, useState } from 'react';
import cls from './WorkListPage.module.scss'
import { useLocation } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import Button from '@mui/material/Button/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { convertSeconds } from 'renderer/utils/utils';

const WorkListPage = () => {
    const [works, setWorks] = useState(Array<object>);
    const location = useLocation();
    const { project } = location.state; 
    console.log(project)
    
    async function getWorks() {
        let projectObject: any = await ipcRenderer.invoke("get_work_by_project",  project.id);

        if (projectObject) {
            // console.log(projectObject)
            setWorks(projectObject);
        }
    }

    const deleteWorkByID = async (work_id: number) => {
        await ipcRenderer.invoke("delete-work-by-id", work_id);
        await getWorks();
        // let projectObject: Array<IProjects> = await ipcRenderer.invoke("get-projects");

        // if (projectObject) {
        //     setProjects(projectObject);
        // }
    }

    useEffect(() => {
        getWorks()
    }, [])

    return (
        <div className={cls.WorkListPage}>
            <div className={cls.workContent}>
                <div className={cls.title}>
                    Список работ по проекту "{project.project_name}"
                </div>
                <div className={cls.table}>
                    {
                        works.length > 0 ?
                        <table className={cls.workTable}>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Начало</th>
                                    <th>Окончание</th>
                                    <th>Время</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {works.map((work: any) => (
                                    <tr key={work.id}>
                                        <td>{work.name}</td>
                                        <td>{work.desc}</td>
                                        <td>
                                            {new Intl.DateTimeFormat('ru-RU', 
                                            {
                                                year: 'numeric', 
                                                month: 'long',
                                                day: '2-digit', 
                                                hour: '2-digit', 
                                                minute: '2-digit', 
                                                second: '2-digit'
                                            })
                                            .format(work.start_date)}
                                        </td>
                                        <td>
                                            {new Intl.DateTimeFormat('ru-RU', 
                                            {
                                                year: 'numeric', 
                                                month: 'long',
                                                day: '2-digit', 
                                                hour: '2-digit', 
                                                minute: '2-digit', 
                                                second: '2-digit'
                                            })
                                            .format(work.finish_date)}
                                        </td>
                                        <td>
                                            {convertSeconds(work.effective_time)}
                                        </td>
                                        <td>
                                            <IconButton>
                                                <DeleteForeverIcon 
                                                    className={ cls.buttonIcon }
                                                    onClick={()=>deleteWorkByID(work.id)}
                                                />
                                            </IconButton>
                                        </td>
                                    </tr>
                                    
                                ))}
                            </tbody>
                        </table>: "Работ по проекту ещё не велось"
                    }          
                </div>
            
            </div>
        </div>
    );
};

export default WorkListPage;