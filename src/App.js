import { useState } from "react";

export default function App() {
  const [hours, setHours] = useState("00");
  const [mins, setMins] = useState("00");
  const [sec, setSec] = useState("00");
  const [intervalId, setIntervalId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [timesetPause, setTimesetPause] = useState(null);

  const timer = () => {
    const startTime = Date.now();
    setIntervalId(
      setInterval(() => {
        const currentTime = Date.now();
        const deltaDate = currentTime - startTime;
        setTimesetPause(deltaDate);
        const { hoursComp, minsComp, secComp } = getTimeComponents(deltaDate);
        setHours(hoursComp);
        setMins(minsComp);
        setSec(secComp);
        console.log();
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

  const timerStop = () => {
    clearInterval(intervalId);
    setTimesetPause(null);
    setIsActive(false);
    setHours("00");
    setMins("00");
    setSec("00");
  };

  const timerReset = () => {
    timerStop();
    timer();
  };
  const timerWite = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsActive(false);
      setIntervalId(null);
      return;
    }

    if (timesetPause) {
      const newStartDate = Date.now();
      setIntervalId(
        setInterval(() => {
          const newCurentDate = Date.now();
          const deltaDateWeit = newCurentDate - newStartDate + timesetPause;
          setTimesetPause(deltaDateWeit);
          const { hoursComp, minsComp, secComp } = getTimeComponents(
            deltaDateWeit
          );
          setHours(hoursComp);
          setMins(minsComp);
          setSec(secComp);
          console.log();
        }, 1000)
      );
      setIsActive(true);
    }
  };

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function getTimeComponents(time) {
    const hoursComp = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minsComp = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secComp = pad(Math.floor((time % (1000 * 60)) / 1000));
    return { hoursComp, minsComp, secComp };
  }

  return (
    <div>
      <p>{hours}</p>
      <p>{mins}</p>
      <p>{sec}</p>
      <button type="button" onClick={timerStart}>
        запуск
      </button>
      <button type="button" onClick={timerStop}>
        Stop
      </button>
      <button type="button" onClick={timerReset}>
        Reset
      </button>
      <button type="button" onClick={timerWite}>
        Wite
      </button>
    </div>
  );
}

// Не вижу смысла сохранять отдельно часы, минуты, сек. Храни просто таймер в ms. А в рендере используй
// new Date(ms).toISOString().slice(11,19)
