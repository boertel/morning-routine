export default function Video({ src, ...props }) {
  return (
    <div style={{ width: "100%" }}>
      <iframe
        width="100%"
        height="315"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
