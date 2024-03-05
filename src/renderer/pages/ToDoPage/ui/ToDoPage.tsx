import cls from './ToDoPage.module.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';


const ToDoPage = () => {
    return (
        <div className={ cls.ToDoPage }>
            <div className={ cls.content }>
                
            </div>
            <div className={ cls.AddIconContent }>
                <AddCircleIcon className={ cls.AddIcon }/>
            </div>
        </div>
    );
};

export default ToDoPage;