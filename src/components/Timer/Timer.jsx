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

  const timerWait = (e) => {
    // якщо активний таймер, виконай це.
    if (isActive) {
      // спочатку почисти таймаут від минулого (якщо був)
      clearTimeout(timerId);
      //створи новий таймер і запиши його в стейт
      setTimerId(
        setTimeout(() => {
          //якщо e.detail === 2, очисти інтервал і зроби таймер не активним в іншому випадку (якщо був по факту 1 клік), вилали цей таймаут
          if (e.detail === 2) {
            clearInterval(intervalId);
            setIsActive(false);
          } else {
            clearTimeout(timerId);
          }
        }, 300)
      );
      //вийди
      return;
    }
    // якщо щось було записано в intervalId, виконай це.

    if (intervalId) {
      // спочатку почисти таймаут від минулого (якщо був)

      clearTimeout(timerId);
      //створи новий таймер і запиши його в стейт

      setTimerId(
        setTimeout(() => {
          //якщо e.detail === 2, очисти інтервал і зроби таймер не активним в іншому випадку (якщо був по факту 1 клік), вилали цей таймаут

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
    clearTimeout(timerId);
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
        <Button onClick={timerWait}>Wait</Button>
        <Button onClick={timerReset}>Reset</Button>
        <Button onClick={timerStop}>Stop</Button>
      </div>
    </Container>
  );
}
