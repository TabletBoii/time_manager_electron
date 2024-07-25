import React, { useState } from 'react';
import cls from './CreateProjectPage.module.scss'
// import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';

const { ipcRenderer } = window.require('electron');


const CreateProjectPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [formData, setFormData] = useState({name: "",desc: "",price: ""});
    const navigate = useNavigate();
    const handleChange = async (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        let answer = await setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log(answer);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        setLoading(true);
        event.preventDefault();
        await ipcRenderer.invoke("create-project", formData);
        navigate('/')
    }


    return (
        <div className={cls.CreateProjectPage}>
            <div className={cls.content}>
                <form onSubmit={handleSubmit}>
                    <div className={cls.input}>
                        <div>
                            <span>Название проекта: </span>
                        </div>
                        <TextField id="filled-basic" label="Проект" variant="filled" onChange={handleChange} name="name"/>
                    </div>
                    <div className={cls.input}>
                        <span>Описание проекта: </span><br />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Описание"
                            multiline
                            maxRows={4}
                            variant="filled"
                            onChange={handleChange}
                            name="desc"
                        />
                    </div>
                    <div className={cls.input}>
                        <div>
                            <span>Нормочас: </span>
                        </div>
                        <TextField id="filled-basic" label="Сумма" variant="filled" onChange={handleChange} name="price" type="number"/>
                    </div>

                    <Button
                        type="submit"
                        color="info"
                        loadingPosition="start"
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

export default CreateProjectPage;