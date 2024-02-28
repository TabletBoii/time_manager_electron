
import { useLocation } from 'react-router-dom';
import { useStopwatch } from 'react-timer-hook';
import cls from './StartWorkPage.module.scss'

import { useState } from 'react';
import CreateWorkModal from 'renderer/widgets/CreateWorkModal/CreateWorkModal';

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

    const [startTime, setStartTime] = useState('')
    const [finalTime, setFinalTime] = useState('')
    const [effectiveTime, setEffectiveTime] = useState(0)
    const [isWorkStarted, setIsWorkStarted] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [modalState, setModalState] = useState(false)
    const location = useLocation();
    const { project } = location.state;
    
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

    const openModal = () => {
        setModalState(!modalState)
    }

    const onClickStart = () => {
        start()
        setStartTime(undefined)    
        let startDateTime: any = new Date();
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
            <div>Проект: {project.project_name}</div>
            {
                !isWorkStarted ? 
                <button onClick={onClickStart}>Начать работу</button> : 
                !isPaused ? <button onClick={onClickPause}>Пауза</button> : <button onClick={onClickResume}>Продолжить</button>
            }
            {
                !isWorkStarted ?
                "" : 
                <button onClick={onClickFinish}>Завершить работу</button>
            }
            {
                <button onClick={onConsole}>Вывести в консоль</button>
                
            }
            <button onClick={openModal}>Включить окно</button>
            <CreateWorkModal 
                toggle={modalState}
                data={{
                    startTime: startTime,
                    finalTime: finalTime,
                    effectiveTime: effectiveTime,
                    project: project
                }}
            />
        </div>
    );
};

export default StartWorkPage;