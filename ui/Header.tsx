import { useEffect, useState } from "react";
import Time from "./Time";

export default function Header() {
  return (
    <div className="flex items-end justify-between mt-4 flex-wrap">
      <h1 className="font-extrabold text-6xl text-primary" style={{ fontSize: "clamp(2em, 6vw, 4em)" }}>
        <Strikethrough>Morning</Strikethrough> Routine
      </h1>
      <Time className="text-gray-500 font-light" />
    </div>
  );
}

function useOnMount(cb) {
  const [state, setState] = useState();
  useEffect(() => {
    setState(cb);
  }, []);
  return state;
}

const Strikethrough = (props) => {
  const hours = useOnMount(() => new Date().getHours());
  return (
    <>
      <span {...props} />
      <style jsx>{`
        span {
          position: relative;
        }
        span:before {
          content: "";
          display: ${hours >= 12 ? "block" : "none"};
          position: absolute;
          top: 50%;
          margin-top: 2px;
          left: -6px;
          right: -6px;
          height: 4px;
          background-color: red;
        }
      `}</style>
    </>
  );
};
