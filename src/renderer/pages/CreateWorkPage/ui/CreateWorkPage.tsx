import React, { useState } from 'react';
import cls from './CreateWorkPage.module.scss'
import {convertToSeconds} from '../../../utils/utils'
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateWorkPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { project } = location.state;

    // const [formData, setFormData] = useState({name: "",desc: "", project: "", begin: "", finish: ""});
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [begin, setBegin] = useState('');
    const [finish, setFinish] = useState('');
    const [timeHours, setTimeHours] = useState('');
    const [timeMinutes, setTimeMinutes] = useState('');
    const [timeSeconds, setTimeSeconds] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        
        if (name && project && begin && finish && timeHours && timeMinutes && timeSeconds){
            let beginTimestamp = Date.parse(begin.toString());
            let finishTimestamp = Date.parse(finish.toString());
            

            let workSeconds = convertToSeconds(parseInt(timeHours), parseInt(timeMinutes), parseInt(timeSeconds));
            console.log(finishTimestamp-beginTimestamp)
            console.log(workSeconds)
            if ((finishTimestamp-beginTimestamp) / 1000 >= workSeconds) {
                await ipcRenderer.invoke(
                    "create-work", 
                    {
                        name: name, 
                        desc: desc, 
                        project: project.id, 
                        begin: beginTimestamp, 
                        finish: finishTimestamp,
                        time: workSeconds
                    }
                );
                navigate('/')
            } else {
                toast.error("Время работы не должно превышать временных рамок", {
                    // position: toast.POSITION.TOP_RIGHT,
                });
            }
            
        }
        // await ipcRenderer.invoke("create-project", formData);
        // navigate('/')
    }

    const handleInputChange = (e: any) => {
        let value = e.target.value;
        let inputName = e.target.name;

        const numberValue = Number(value);
    
        if (numberValue > 59) {
          value = 59;
        } else if (numberValue < 0) {
          value = 0;
        }

        if (inputName == 'timeMinutes') {
            setTimeMinutes(value);
        } else {
            setTimeSeconds(value);
        }
    };


    return (
        <div className={cls.CreateWorkPage}>
            <div className={cls.content}>
                <div className={cls.projectName}>Проект: <span>{project.project_name}</span></div>
                <form onSubmit={handleSubmit}>
                    <div className={cls.input}>
                        <span>Название: </span><input type="datetime" name="name" onChange={e => { setName(e.target.value); }} value={name}/>
                        
                    </div>
                    <div className={cls.input}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Описание"
                            multiline
                            maxRows={4}
                            variant="filled"
                            onChange={e => { setDesc(e.target.value); }}
                            name={desc}
                        />
                    </div>
                    <div className={cls.timeInput}>
                        <span>Часы: </span><br />
                        <input type="number" name="timeHours" onChange={e => { setTimeHours(e.target.value); }} value={timeHours}/>
                        <span>Минуты: </span><br />
                        <input type="number" name="timeMinutes" onChange={handleInputChange} value={timeMinutes} max="60"/>
                        <span>Секунды: </span><br />
                        <input type="number" name="timeSeconds" onChange={handleInputChange} value={timeSeconds} max="60"/>
                    </div>
                    <div className={cls.dateInput}>
                        {/* <span>Начало: </span> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                                label="Начало" 
                                name="begin"
                                onChange={(e: any) => { setBegin(e); }}
                                value={begin}
                                disabled={!timeHours || !timeMinutes || !timeSeconds}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className={cls.dateInput}>
                        {/* <span>Окончание: </span> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker 
                                label="Окончание" 
                                name="finish" 
                                onChange={(e: any) => { setFinish(e); }}
                                value={finish}
                                disabled={!timeHours || !timeMinutes || !timeSeconds}
                            />
                        </LocalizationProvider>
                    </div>
                    <Button
                        type="submit"
                        color="info"
                        // loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        className={cls.createProjectButton}
                    >
                        <span>Сохранить</span>
                    </Button>
                </form>
                
            </div>  
            
        </div>
        
    );
};

export default CreateWorkPage;