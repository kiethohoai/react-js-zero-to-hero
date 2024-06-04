import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CownDown = (props) => {
  const { handleFinishQuiz } = props;
  let initCount = 10;
  let temp = initCount;
  const [count, setCount] = useState(initCount);
  useEffect(() => {
    setTimeout(() => {
      let stop = setInterval(() => {
        temp = temp - 1;
        setCount(temp);

        if (temp == 0) {
          handleFinishQuiz();
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(stop);
      }, initCount * 1000);
    }, 3000);
  }, []);

  // convert second to hhmmss
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return <div className="cowndown-container">{toHHMMSS(count)}</div>;
};

export default CownDown;
