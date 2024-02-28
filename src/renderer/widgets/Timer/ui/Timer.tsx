import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import cls from './Timer.module.scss'

function Timer({setTime}) {
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


  return (
    <div className={cls.Timer}>
      <div>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? <button onClick={pause}>Pause</button> : <button onClick={start}>Start</button>}</p>
      <button onClick={event => setTime(totalSeconds)}>Stop</button>
      {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
}

export { 
    Timer
}