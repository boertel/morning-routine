import { useState } from "react";

export default function Video({ src, thumbnail, ...props }) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {!showVideo && (
        <img
          src={thumbnail.src}
          height={thumbnail.height}
          className="object-contain w-full"
          onClick={() => setShowVideo(true)}
        />
      )}
      {showVideo && (
        <iframe
          width="100%"
          height={thumbnail.height}
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
