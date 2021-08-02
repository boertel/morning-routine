import { useRef, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import YouTube from "react-youtube";
import { PlayIcon } from "ui/icons";
import { useOnKeyDown } from "ui/hooks";

export default function VideoPlayer({ src, thumbnail, selected, onReady, options = {}, ...props }) {
  const ref = useRef();
  const [showVideo, setShowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const parts = src.split("/");
  const videoId = parts[parts.length - 1];

  function handleOnReady({ target }) {
    ref.current = target;
    setIsReady(true);
    if (onReady) {
      onReady(target);
    }
  }

  function onEnd() {
    setIsReady(false);
    setShowVideo(false);
  }

  const pauseOnSpace = useCallback(
    (evt) => {
      if (evt.key === " ") {
        evt.preventDefault();
        if (ref.current) {
          const playerState = ref.current.getPlayerState();
          if (playerState !== 2) {
            ref.current.pauseVideo();
          } else {
            ref.current.playVideo();
          }
        } else if (selected) {
          setShowVideo(true);
        }
      }
    },
    [ref, selected]
  );

  useEffect(() => {
    if (selected && ref.current) {
      const playerState = ref.current.getPlayerState();
      if (playerState !== 2) {
        ref.current.pauseVideo();
        setShowVideo(false);
      }
    }
  }, [selected, ref, setShowVideo]);

  useOnKeyDown(pauseOnSpace);

  // to be remove when https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility supports Safari

  const containerRef = useRef();
  const [minHeight, setMinHeight] = useState(0);
  const onResize = useCallback(
    debounce(() => {
      if (containerRef?.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setMinHeight((width * 9) / 16);
      }
    }),
    [containerRef, setMinHeight]
  );

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);
  // to be removed - END

  return (
    <div className="w-full relative" style={{ maxHeight: thumbnail.height, minHeight }} ref={containerRef}>
      <div
        className={cn(
          "absolute w-full h-full transition-opacity bg-no-repeat bg-center bg-cover cursor-pointer flex justify-center items-center hover:opacity-100 transition-opacity",
          {
            "opacity-0": isReady,
            "pointer-events-none": isReady,
          }
        )}
        style={{ backgroundImage: `url(${thumbnail.src})` }}
        onClick={() => setShowVideo(true)}
      >
        <div className="p-5 bg-gray-800 bg-opacity-60 rounded-lg transform duration-200 hover:scale-125">
          <PlayIcon />
        </div>
      </div>
      {showVideo && (
        <YouTube
          videoId={videoId}
          onReady={handleOnReady}
          onEnd={onEnd}
          opts={{ width: "100%", height: minHeight, playerVars: { autoplay: 1, ...(options || {}) } }}
        />
      )}
    </div>
  );
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
