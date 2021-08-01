import cn from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Time from "./Time";

export default function Header({ className }) {
  return (
    <div className={cn("flex items-end justify-between mt-4 flex-wrap px-3", className)}>
      <Link href="/">
        <a className="hover:no-underline">
          <h1
            className="font-extrabold text-6xl text-primary hover:opacity-70 flex"
            style={{ fontSize: "clamp(2em, 6vw, 4em)" }}
          >
            <Strikethrough>Morning</Strikethrough>
            <div>&nbsp;Routine</div>
          </h1>
        </a>
      </Link>
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
    <div className="relative pr-1">
      <span {...props} />
      <div className="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center pt-2">
        <Scribble />
      </div>
    </div>
  );
};

function Scribble(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 272 35" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 31c54.59-10.662 109.021-17.378 164.556-20.889 22.759-1.439 45.593-1.648 68.388-2.055 5.002-.09 9.973.058 14.945-.612C257.054 6.75 262.934 4 268 4"
        stroke="red"
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  );
}
