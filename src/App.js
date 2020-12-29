import { useEffect, useState } from "react";

export default function App() {
  const [hours, setHours] = useState("00");
  const [mins, setMins] = useState("00");
  const [sec, setSec] = useState("00");
  const [timer, setTimer] = useState(new Date(ms).toISOString().slice(11, 19));

  const timerF = () => {
    const startData = Date.now();
    setInterval(() => {
      const currentData = Date.now();
      const deltaDate = currentData - startData;
      const { hoursComp, minsComp, secComp } = getTimeComponents(deltaDate);
      setHours(hoursComp);
      setMins(minsComp);
      setSec(secComp);
    }, 1000);
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
      <button type="button" onClick={timerF}>
        запуск
      </button>
    </div>
  );
}

// Не вижу смысла сохранять отдельно часы, минуты, сек. Храни просто таймер в ms. А в рендере используй
// new Date(ms).toISOString().slice(11,19)
