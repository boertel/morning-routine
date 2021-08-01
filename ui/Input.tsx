import { forwardRef } from "react";
import cn from "classnames";

const Input = forwardRef(({ className, as: AsComponent = "input", ...props }: any, ref) => {
  return (
    <AsComponent
      ref={ref}
      className={cn("p-2 rounded border-primary border-2 bg-transparent focus:border-primary-600", className)}
      {...props}
    />
  );
});
export default Input;
