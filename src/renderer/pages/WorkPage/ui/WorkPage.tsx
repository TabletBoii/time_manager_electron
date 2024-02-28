
import { Link, useLocation } from 'react-router-dom';
import cls from './WorkPage.module.scss'


const WorkPage = (props: any) => {
    const location = useLocation();
    const { project } = location.state;
    
    return (
        
        <div className={cls.WorkPage}>
            <div className={ cls.workContent }>
                <div>Название проекта: {project.project_name}</div>
                <Link 
                    to='/create_work' 
                    state={{ project: project }}
                >
                    <button>Создать работу</button>
                </Link>
                <br/>
                <br/>
                <Link
                    to='/start_work' 
                    state={{ project: project }}
                >
                    <button>Начать работу</button>
                </Link>
                
                <br/>
                <br/>
                <Link
                    to='/work_list'
                    state={{ project: project }}
                >
                    <button>Список работ</button>
                </Link>
                
            </div>
        </div>
            
    );
};

export default WorkPage;