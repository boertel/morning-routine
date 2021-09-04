import { useCallback, useState, useEffect } from "react";
import useInterval from "./useInterval";

export default function useStateOnInterval<T>(callback: () => T, delay: number): T {
  const [state, setState] = useState<T>(callback());

  const every = useCallback(() => {
    setState(callback());
  }, [setState, callback]);

  useEffect(every, []);

  useInterval(every, delay);

  return state;
}
