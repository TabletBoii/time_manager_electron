import { useState } from 'react';
import cls from './CreateWorkModal.module.scss'
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');
import Button from '@mui/material/Button/Button';
import { convertSeconds } from 'renderer/utils/utils';

const CreateWorkModal = (props: any) => {
    const navigate = useNavigate()
    const [workName, setWorkName] = useState("")
    const [workDesc, setWorkDesc] = useState("")
    const modalState = props.toggle;
    const data: IWorkModelData = props.data;
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

    const closeModal = () => {
        navigate("/")
    }

    return ( 
        <div className={`${cls.createWorkModal} ${modalState ? cls.active: ''}`}>
            <div className={cls.modal}>
                <div>
                    <span>Проект:</span> {data.project.project_name}
                </div>
                <div>
                    <span>Начало:</span> {data.startTime ? data.startTime.toLocaleString(): ""}
                </div>
                <div>
                    <span>Окончание:</span> {data.finalTime ? data.finalTime.toLocaleString(): ""}
                </div>
                <div>
                    <span>Время:</span> {convertSeconds(data.effectiveTime)}
                </div>
                <div>
                    <span>Название:</span> <input type="text" value={workName} onChange={(e: any) => setWorkName(e.target.value)}/>
                </div>
                <div>
                    <span>Описание:</span><textarea value={workDesc} onChange={(e: any) => setWorkDesc(e.target.value)}/>
                </div>
                {/* <Button onClick={action} variant="contained">Close</Button> */}
                <Button onClick={closeModal} className={cls.cancelButton} variant="contained">Cancel</Button>
                <Button onClick={saveWork} className={cls.saveButton} variant="contained">Save</Button>
            </div>
        </div>
    );
};


export default CreateWorkModal;