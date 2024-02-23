import React, { useState } from 'react';
import cls from './CreateProjectPage.module.scss'
import { IProjects } from 'main/database/queries/dbQueries';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');


const CreateProjectPage = () => {
    const [formData, setFormData] = useState({name: "",desc: "",price: ""});
    const navigate = useNavigate();
    const handleChange = async (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        let answer = await setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(answer);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await ipcRenderer.invoke("create-project", formData);
        navigate('/')
    }


    return (
        <div className={cls.CreateProjectPage}>
            <div className={cls.content}>
                <form onSubmit={handleSubmit}>
                    <div className={cls.input}>
                        <span>Название проекта: </span><input type="text" name="name" onChange={handleChange}/>
                    </div>
                    <div className={cls.input}>
                        <span>Описание проекта: </span><br />
                        <textarea rows={1} cols={1} name="desc" onChange={handleChange}>

                        </textarea>
                    </div>
                    <div className={cls.input}>
                        <span>Нормочас: </span><input type="number" name="price" onChange={handleChange}/>
                    </div>
                    <button className={cls.createProjectButton}>
                        Создать проект
                    </button>
                </form>
            </div>  
        </div>
    );
};

export default CreateProjectPage;