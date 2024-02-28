import React, { useState } from 'react';
import cls from './CreateWorkPage.module.scss'
import { IProjects } from 'main/database/queries/dbQueries';
import { useLocation, useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const CreateWorkPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { project } = location.state;

    // const [formData, setFormData] = useState({name: "",desc: "", project: "", begin: "", finish: ""});
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [begin, setBegin] = useState('');
    const [finish, setFinish] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        if (name && desc && project && begin && finish && time){
            let beginTimestamp = Date.parse(begin.toString())
            let finishTimestamp = Date.parse(finish.toString())
            await ipcRenderer.invoke(
                "create-work", 
                {
                    name: name, 
                    desc: desc, 
                    project: project.id, 
                    begin: beginTimestamp, 
                    finish: finishTimestamp,
                    time: parseInt(time)
                }
            );
            navigate('/')
        }
        // await ipcRenderer.invoke("create-project", formData);
        // navigate('/')
    }


    return (
        <div className={cls.CreateWorkPage}>
            <div className={cls.content}>
                <div>Проект: {project.project_name}</div>
                <form onSubmit={handleSubmit}>
                    <div className={cls.input}>
                        <span>Название работы: </span><input type="datetime" name="name" onChange={e => { setName(e.target.value); }} value={name}/>
                        
                    </div>
                    <div className={cls.input}>
                        <span>Описание работы: </span><br />
                        <textarea rows={1} cols={1} name="desc" onChange={e => { setDesc(e.target.value); }} value={desc}>

                        </textarea>
                    </div>
                    <div className={cls.input}>
                        <span>Время в часах: </span><br />
                        <input name="time" onChange={e => { setTime(e.target.value); }} value={time}/>
                    </div>
                    <div className={cls.input}>
                        <span>Начало: </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                                label="Начало" 
                                name="begin"
                                onChange={(e: any) => { setBegin(e); }}
                                value={begin}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className={cls.input}>
                        <span>Окончание: </span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                                label="Окончание" 
                                name="finish" 
                                onChange={(e: any) => { setFinish(e); }}
                                value={finish}
                            />
                        </LocalizationProvider>
                    </div>
                    <button className={cls.createProjectButton} onSubmit={handleSubmit}>
                        Создать проект
                    </button>
                </form>
            </div>  
        </div>
    );
};

export default CreateWorkPage;