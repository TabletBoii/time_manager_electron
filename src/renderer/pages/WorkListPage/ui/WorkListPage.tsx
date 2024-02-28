import { useEffect, useState } from 'react';
import cls from './WorkListPage.module.scss'
import { useLocation } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

const WorkListPage = () => {
    const [works, setWorks] = useState(Array<object>);
    const location = useLocation();
    const { project } = location.state; 
    console.log(project)
    
    async function getWorks() {
        let projectObject: any = await ipcRenderer.invoke("get_work_by_project",  project.id);

        if (projectObject) {
            console.log(projectObject)
            setWorks(projectObject);
        }
    }

    let calculateWorkHours = (start_date: number, finish_date: number) => {
        let difference = Math.abs(finish_date - start_date);

        var h = Math.floor(difference / (1000 * 60 * 60));
        var m = Math.floor(difference % 3600 / 60);
        var s = Math.floor(difference % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "0h ";
        var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "0m ";
        var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "0s";
        return hDisplay + mDisplay + sDisplay; 
    }

    useEffect(() => {
        getWorks()
    }, [])

    return (
        <div className={cls.WorkListPage}>
            {   
                works.map((work: any) => {
                    return (
                        <div key={ work.id } className={cls.workContent}> 
                            {work.project_id} {work.name} { calculateWorkHours(work.start_date, work.finish_date)}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default WorkListPage;