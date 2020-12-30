import { useState } from "react";

import Button from "../Button/Button";
import s from "./Timer.module.css"

export default function Timer() {
  const [ms, setMs] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const timer = () => {
    setIntervalId(
      setInterval(() => {
        setMs((state) => state + 1000);
      }, 1000)
    );
    setIsActive(true);
  };

  const timerStart = () => {
    if (isActive) {
      return;
    }
    timer();
  };

  const timerWite = () => {
    if (isActive) {
      clearInterval(intervalId);
      setIsActive(false);
      return;
    }
    if (intervalId) {
      timer();
    }
  };

  const timerReset = () => {
    timerStop();
    timer();
  };

  const timerStop = () => {
    clearInterval(intervalId);
    setMs(0);
    setIntervalId(null);
    setIsActive(false);
  };

  return (
    <div>
      <p>{new Date(ms).toISOString().slice(11, 19)}</p>
     
          <div>
              <Button onClick={timerStart}>Start</Button>
          <Button onClick={timerWite}>Wite</Button>
              <Button onClick={timerReset}>Reset</Button>
              <Button onClick={timerStop}>Stop</Button>
          </div>

    </div>
  );
}
