import React from "react";

const placeholderVideo =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
export const Video = ({ videoUrl }) => {
  return (
    <div className="iframe-container">
      <iframe
        src={videoUrl ? videoUrl : placeholderVideo}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Video"
      ></iframe>
    </div>
  );
};
