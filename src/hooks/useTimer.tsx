import { useState } from "react";

const useTimer = (sleep = 3000) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const start = (onEnd: () => void) => {
    setIsRunning(true);
    setTimeout(() => {
      onEnd();
      setIsRunning(false);
    }, sleep);
  };
  return { start, isRunning };
};

export default useTimer;
