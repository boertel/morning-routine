import { Strikethrough, Time } from "ui";

export default function Header() {
  return (
    <div className="flex items-end justify-between mt-4 flex-wrap">
      <h1 className="font-extrabold text-6xl text-primary">
        <Strikethrough>Morning</Strikethrough> Routine
      </h1>
      <Time className="text-gray-500 font-light" />
    </div>
  );
}
