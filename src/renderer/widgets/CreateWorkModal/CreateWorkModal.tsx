import React, { useState } from 'react';
import cls from './CreateWorkModal.module.scss'
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

const CreateWorkModal = (props: any) => {
    const navigate = useNavigate()
    const [workName, setWorkName] = useState("")
    const [workDesc, setWorkDesc] = useState("")
    const modalState = props.toggle;
    const data = props.data;
    const action = props.action;
    const saveWork = async () => {
        let beginTimestamp = Date.parse(data.startTime.toString())
        let finishTimestamp = Date.parse(data.finalTime.toString())
        console.log(data.effectiveTime, typeof(data.effectiveTime))
        await ipcRenderer.invoke(
            "create-work", 
            {
                name: workName, 
                desc: workDesc, 
                project: data.project.id, 
                begin: beginTimestamp, 
                finish: finishTimestamp,
                time: data.effectiveTime
            }
        );
            
        action
        navigate('/')
    }

    return ( 
        <div className={`${cls.createWorkModal} ${modalState ? cls.active: ''}`}>
            <div className={cls.modal}>
                <div>Project Name: {data.project.project_name}</div>
                <div>Start Date: {data.startTime.toString()}</div>
                <div>Finish Time: {data.finalTime.toString()}</div>
                <div>Work in seconds {data.effectiveTime}</div>
                <div>Work Name: <input type="text" value={workName} onChange={(e: any) => setWorkName(e.target.value)}/></div>
                <div>Work Desc: <input type="text" value={workDesc} onChange={(e: any) => setWorkDesc(e.target.value)}/></div>
                <button onClick={saveWork}>Save</button>
            </div>
        </div>
    );
};


export default CreateWorkModal;