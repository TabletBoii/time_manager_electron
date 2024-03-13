import { useEffect, useState } from 'react';
import cls from './ToDoPage.module.scss'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ITODO } from 'main/database/interfaces/interfaces';
const { ipcRenderer } = window.require('electron');

const ToDoPage = () => {

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
                            <div>{todo.name} {todo.desc} {todo.when} {todo.status}</div>
                        )
                    })
                }
            </div>
            <div className={ cls.AddIconContent }>
                <AddCircleIcon className={ cls.AddIcon }/>
            </div>
        </div>
    );
};

export default ToDoPage;