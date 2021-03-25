import useInterval from "./hooks/useInterval";
import { useState } from "react";

function getTime() {
  const now = new Date();
  const minutes = now.getMinutes();
  return [now.getHours(), minutes < 10 ? `0${minutes}` : minutes];
}

export default function Time({ className, ...props }) {
  const [time, setTime] = useState(getTime());

  useInterval(() => {
    setTime(getTime());
  }, 1000);

  return (
    <div className={className}>
      {time[0]}:{time[1]}
    </div>
  );
}
