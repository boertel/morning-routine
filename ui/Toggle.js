import cn from "classnames";

export default function Toggle({ children, className, ...props }) {
  return (
    <label className={cn("border-2 border-primary rounded text-xs cursor-pointer", className)}>
      <style jsx>{`
        input[type="checkbox"]:checked ~ div {
          background-color: rgba(250, 165, 73, var(--tw-bg-opacity));
          color: #000;
          font-weight: 600;
        }
      `}</style>
      <input type="checkbox" {...props} className="hidden" />
      <div className="px-4 py-2 flex justify-center">{children}</div>
    </label>
  );
}
