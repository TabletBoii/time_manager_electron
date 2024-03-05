
import { Link, useLocation } from 'react-router-dom';
import cls from './WorkPage.module.scss'
import Button from '@mui/material/Button/Button';


const WorkPage = (props: any) => {
    const location = useLocation();
    const state = location.state;
    const project: IProject = state.project as IProject;
    
    return (
        
        <div className={cls.WorkPage}>
            <div className={ cls.workContent }>
                <div className={ cls.title }>
                    Проект "{project.project_name}"
                </div>
                <div className={ cls.menu }>
                    <div>
                        <Link 
                            to='/create_work' 
                            state={{ project: project }}
                        >
                            <Button variant="contained">
                                Добавить работу
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to='/start_work' 
                            state={{ project: project }}
                        >
                            <Button variant="contained">
                                Начать работу
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Link
                            to='/work_list'
                            state={{ project: project }}
                        >
                            <Button variant="contained">
                                Список работ
                            </Button>
                        </Link>
                    </div>
                </div>      
            </div>
        </div>
            
    );
};

export default WorkPage;