export default function Strikethrough(props) {
  const hours = new Date().getHours();
  return (
    <>
      <span {...props} />
      <style jsx>{`
        span {
          position: relative;
        }
        span:before {
          content: "";
          display: ${hours >= 12 ? "block" : "none"};
          position: absolute;
          top: 50%;
          margin-top: 2px;
          left: -6px;
          right: -6px;
          height: 4px;
          background-color: red;
        }
      `}</style>
    </>
  );
}
