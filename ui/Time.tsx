import useStateOnInterval from "./hooks/useStateOnInterval";

function getTime() {
  const now: Date = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Time({ className }: { className?: string }) {
  const time: string = useStateOnInterval<string>(getTime, 1000);

  return <div className={className}>{time}</div>;
}
