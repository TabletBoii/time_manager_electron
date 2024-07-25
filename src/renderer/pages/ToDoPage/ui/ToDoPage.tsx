import { useEffect, useState } from 'react';
import cls from './ToDoPage.module.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ITODO } from 'main/database/interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { ToDoElementMenu } from 'renderer/widgets/ToDoElementMenu';
const { ipcRenderer } = window.require('electron');

const ToDoPage = () => {

    const navigate = useNavigate()

    const [todos, setTodos] = useState(Array<ITODO>);

    async function getTodoRecords() {
        let todoObject: Array<ITODO> = await ipcRenderer.invoke("get-todo-records");
        console.log(todoObject)
        if (todoObject) {
            setTodos(todoObject);
        }
    }



    useEffect(() => {
        getTodoRecords()
    }, [])

    return (
        <div className={ cls.ToDoPage }>
            <div className={ cls.content }>
                {
                    todos.map((todo) => {
                        return (
                            <div className={cls.toDoElement}>
                                <div className={cls.toDoElementOptions}>
                                    <ToDoElementMenu/>
                                    <MenuIcon className={cls.toDoIcon}/>
                                    <CheckCircleOutlineIcon className={cls.toDoIcon}/>
                                    <CheckCircleIcon className={cls.toDoIcon}/>
                                </div>
                                <div className={cls.toDoElementText}>
                                    <p>
                                        {todo.name}
                                    </p>

                                    <p className={cls.toDoElementDate}>
                                        {todo.todo_when}
                                    </p>
                                </div>            
                            </div>
                        )
                    })
                }
            </div>
            <div className={ cls.AddIconContent }>
                <AddCircleIcon className={ cls.AddIcon } onClick={ () => navigate('/create_todo') }/>
            </div>
        </div>
    );
};

export default ToDoPage;