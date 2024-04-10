import { useEffect, useState } from 'react';
import cls from './WorkListPage.module.scss'
import { useLocation } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import Button from '@mui/material/Button/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { WorkTable } from 'renderer/widgets/WorkTable';


const WorkListPage = () => {
    const [works, setWorks] = useState(Array<object>);
    const location = useLocation();
    const { project } = location.state; 
    console.log(project.price)
    
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
                {
                    works.length > 0 ? 
                        (<WorkTable props={{workList: works, projectPrice: project.price}} />)
                    
                    : 
                    (<div>Работа по этому проекту еще не велись</div>)
                }
            </div>
        </div>
    );
};

export default WorkListPage;