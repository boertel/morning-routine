import cn from "classnames";

export default function Toggle({ children, className, disabled, ...props }) {
  return (
    <label
      className={cn("border-2 border-primary rounded text-xs", className, {
        "cursor-pointer hover:bg-primary hover:bg-opacity-30": !disabled,
      })}
    >
      <style jsx>{`
        input[type="checkbox"]:checked ~ div {
          background-color: rgba(250, 165, 73, var(--tw-bg-opacity));
          color: #000;
          font-weight: 600;
        }
      `}</style>
      <input type="checkbox" {...props} className="hidden" disabled={disabled} />
      <div className="px-1 pt-2 flex justify-center flex-wrap overflow-hidden" style={{ height: "32px" }}>
        {children}
      </div>
    </label>
  );
}
