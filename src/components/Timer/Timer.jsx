import { useState } from "react";

import Button from "../Button/Button";
import Container from "../Container/Container";
import s from "./Timer.module.css";

export default function Timer() {
  const [ms, setMs] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerId, setTimerId] = useState(null);
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

  const timerWite = (e) => {
    if (isActive) {
      clearTimeout(timerId);
      setTimerId(
        setTimeout(() => {
          if (e.detail === 2) {
            clearInterval(intervalId);
            setIsActive(false);
          } else {
            clearTimeout(timerId);
          }
        }, 300)
      );

      return;
    }
    if (intervalId) {
      clearTimeout(timerId);
      setTimerId(
        setTimeout(() => {
          if (e.detail === 2) {
            timer();
          } else {
            clearTimeout(timerId);
          }
        }, 300)
      );
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
    <Container>
      <div>
        <span className={s.timer}>
          {new Date(ms).toISOString().slice(11, 19)}
        </span>
      </div>

      <div className={s.containerBtn}>
        <Button onClick={timerStart}>Start</Button>
        <Button onClick={timerWite}>Wite</Button>
        <Button onClick={timerReset}>Reset</Button>
        <Button onClick={timerStop}>Stop</Button>
      </div>
    </Container>
  );
}
