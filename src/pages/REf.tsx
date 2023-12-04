import { FC, ReactElement, DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

export interface RefProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Ref: FC<RefProps> = ({ ...props }): ReactElement => {
  const countRef = useRef(0);
  const countDisplayRef = useRef<HTMLSpanElement>(null);

  const handleIncrement = () => {
    countRef.current += 1;
    updateDisplay();
  };

  const handleDecrement = () => {
    countRef.current -= 1;
    updateDisplay();
  };

  const updateDisplay = () => {
    if (countDisplayRef.current) {
      countDisplayRef.current.textContent = countRef.current.toString();
    }
  };

  // Обновление при монтировании
  useEffect(() => {
    updateDisplay();
  }, []);

  console.log("render");

  return (
    <>
      <div
        {...props}
        className="w-full min-h-screen flex justify-center items-center gap-[20px]"
      >
        <button
          className="px-2 py-2 bg-blue-500 text-white text-[18px] font-bold"
          onClick={handleDecrement}
        >
          -
        </button>
        <span ref={countDisplayRef}>{countRef.current}</span>
        <button
          className="px-2 py-2 bg-blue-500 text-white text-[18px] font-bold"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </>
  );
};
