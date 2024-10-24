import { useRef, useCallback, useEffect, useState } from "react";
import qs from "qs";
import cn from "classnames";
import YouTube from "react-youtube";
import { PlayIcon } from "ui/icons";
import { useOnKeyDown } from "ui/hooks";

export default function VideoPlayer({ src, thumbnail, selected, onReady, onEnd, onStart, options = {}, ...props }) {
  const ref = useRef();
  const [showVideo, setShowVideo] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoId = qs.parse(new URL(src).search, { ignoreQueryPrefix: true })["v"];

  function handleOnReady({ target }) {
    ref.current = target;
    setIsReady(true);
    if (onReady) {
      onReady(target);
    }
  }

  const hasStarted = useRef<boolean>(false);

  function handleOnPlay() {
    if (onStart && hasStarted.current === false) {
      onStart();
      hasStarted.current = true;
    }
  }

  function handleOnEnd() {
    setIsReady(false);
    setShowVideo(false);
    if (onEnd) {
      onEnd();
    }
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

  // TODO rely on `aspect-ratio` but also make sure there is no shift when pressing play
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
    <div
      className="w-full relative"
      style={{ aspectRatio: "16 / 9", maxHeight: thumbnail.height, minHeight }}
      ref={containerRef}
    >
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
          onPlay={handleOnPlay}
          onEnd={handleOnEnd}
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
