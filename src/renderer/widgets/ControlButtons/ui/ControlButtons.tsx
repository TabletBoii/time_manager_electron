import React from 'react';
import cls from './ControlButtons.module.scss'

export const ControlButtons = (props: any) => {
    const StartButton = (
        <div className={cls.btnOne}
            onClick={props.handleStart}>
            Start
        </div>
    );
    const ActiveButtons = (
        <div className={cls.btnGrp}>
            <div className={cls.btnOne}
                onClick={props.handleReset}>
                Reset
            </div>
            <div className={cls.btnOne}
                onClick={props.handlePauseResume}>
                {props.isPaused ? "Resume" : "Pause"}
            </div>
        </div>
    );
 
    return (
        <div className={cls.ControlButtons}>
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
};
