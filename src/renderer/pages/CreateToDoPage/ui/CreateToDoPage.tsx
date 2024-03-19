import { useNavigate } from 'react-router-dom';
import cls from './CreateToDoPage.module.scss'
import { useState } from 'react';
const { ipcRenderer } = window.require('electron');

const CreateToDoPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name: "",desc: "",todo_when: "", status: ""});

    const handleChange = async (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        let answer = await setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(answer);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await ipcRenderer.invoke("add-todo-record", formData);
        navigate('/')
    }

    return (
        <div className={cls.CreateProjectPage}>
            <div className={cls.content}>
                <form onSubmit={handleSubmit}>
                    <div className={cls.input}>
                        <span>Название: </span><input type="text" name="name" onChange={handleChange}/>
                    </div>
                    <div className={cls.input}>
                        <span>Описание: </span><br />
                        <textarea rows={1} cols={1} name="desc" onChange={handleChange}>

                        </textarea>
                    </div>
                    <div className={cls.input}>
                        <span>Крайний срок: </span><input type="text" name="todo_when" onChange={handleChange}/>
                    </div>
                    <div className={cls.input}>
                        <span>Статус: </span><input type="text" name="status" onChange={handleChange}/>
                    </div>
                    
                    <button className={cls.createProjectButton}>
                        Создать проект
                    </button>
                </form>
            </div>  
        </div>
    );
};

export default CreateToDoPage;