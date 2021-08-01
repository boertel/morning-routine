import { useCallback, useEffect } from "react";

const INPUT_TAG_NAMES = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"];

export default function useOnKeyDown(listener, options = {}) {
  const handleListener = useCallback(
    (evt) => {
      if (!INPUT_TAG_NAMES.includes(evt.target.tagName)) {
        listener(evt);
      }
    },
    [listener]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleListener);
    return () => window.removeEventListener("keydown", handleListener);
  }, [handleListener]);
}
