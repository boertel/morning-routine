import cn from "classnames";

export default function Input({ className, as: AsComponent = "input", ...props }) {
  return (
    <AsComponent
      className={cn("p-2 rounded border-primary border-2 bg-transparent focus:border-primary-600", className)}
      {...props}
    />
  );
}
