
import { useLocation, useNavigate } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import cls from './StartWorkPage.module.scss'

import { useState } from 'react';
import CreateWorkModal from 'renderer/widgets/CreateWorkModal/CreateWorkModal';
import Button from '@mui/material/Button/Button';

const StartWorkPage = () => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const [startTime, setStartTime] = useState<Date>()
    const [finalTime, setFinalTime] = useState<Date>()
    const [effectiveTime, setEffectiveTime] = useState<number>(0)
    const [isWorkStarted, setIsWorkStarted] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [modalState, setModalState] = useState<boolean>(false)

    const location = useLocation();
    const state = location.state;
    const project: IProject = state.project as IProject;
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

    const openModal = () => {
        setModalState(!modalState)
    }


    const onClickStart = () => {
        start()
        setStartTime(undefined)    
        let startDateTime: Date = new Date();
        setStartTime(startDateTime)
        setIsWorkStarted(true)
        
    }

    const onClickFinish = () => { 
        setFinalTime(undefined)
        let finishDateTime: any = new Date();
        setFinalTime(finishDateTime)
        setIsWorkStarted(false)
        setEffectiveTime(totalSeconds)
        reset()
        pause()
        openModal()
    }

    const onClickPause = () => { 
        setIsPaused(true)
        pause()
    }

    const onClickResume = () => { 
        setIsPaused(false)
        start()
    }

    const onConsole = () => {
        console.log(totalSeconds)
        console.log(effectiveTime)
        console.log(startTime)
        console.log(finalTime)     
    }

    return (
        <div className={cls.StartWorkPage}>
            <div className={cls.projectTitleStatic}><span>Проект:</span> {project.project_name}</div>
            <div className={ cls.timerBlock }>
                <div className={ cls.timerMain }>
                    {
                        isWorkStarted ? 
                        <div className={ cls.timer }>
                            <span className={ cls.timerElement }>{hours<10 ? "0"+hours: hours}</span><span className={ cls.timerElementDouble }>:</span>
                            <span className={ cls.timerElement }>{minutes<10 ? "0"+minutes: minutes}</span><span className={ cls.timerElementDouble }>:</span>
                            <span className={ cls.timerElement }>{seconds<10 ? "0"+seconds: seconds}</span>
                        </div> : ""
                    }
                </div>
                
                <div className={ cls.timerButtons }>
                    {
                        !isWorkStarted ? 
                        <Button className={ cls.buttonStart } variant="contained" onClick={onClickStart}>Начать работу</Button> : 
                        !isPaused ? <Button variant="contained" onClick={onClickPause}>Пауза</Button> : <Button variant="contained" onClick={onClickResume}>Продолжить</Button>
                    }
                    {
                        !isWorkStarted ?
                        "" : 
                        <Button variant="contained" onClick={onClickFinish}>Завершить работу</Button>
                    }
                    {
                        // <Button variant="contained" onClick={onConsole}>Вывести в консоль</Button>
                        
                    }
                    {/* <button onClick={openModal}>Включить окно</button> */}
                </div>
            </div> 
            <div className={cls.modalContent}>
                <CreateWorkModal 
                    toggle={modalState}
                    action={openModal}
                    data={{
                        startTime: startTime,
                        finalTime: finalTime,
                        effectiveTime: effectiveTime,
                        project: project
                    }}
                />
            </div>
        </div>
    );
};

export default StartWorkPage;