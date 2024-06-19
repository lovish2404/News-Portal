import React from "react";
import { useNavigate } from "react-router-dom";
const placerholderUrl =
  "https://via.placeholder.com/640x360.png?text=News+Image&bg=333333&fg=ffffff";
export const SingleArticle = ({
  img_url,
  pubDate,
  article_id,
  title,
  source_icon,
  source_id,
  video_url,
  creator,
}) => {
  const navigate = useNavigate();
  //for handling broken image links
  const handleError = (e) => {
    e.target.src = placerholderUrl;
  };
  const handleRedirection = () => {
    navigate(`/article/${article_id}`, {
      state: {
        article_id,
        source_icon,
        img_url,
        video_url,
        source_id,
        title,
        pubDate,
        creator,
      },
    });
  };
  return (
    <>
      <div className="article" onClick={handleRedirection}>
        <div className="img">
          <img
            src={img_url ? img_url : placerholderUrl}
            alt="articleImg"
            onError={handleError}
          />
        </div>
        <div className="Info">
          <span className="title">{title}</span>
          <div className="divContainer">
            <div className="aboutSource">
              {source_icon && (
                <div className="sourceImgDiv">
                  <img src={source_icon} alt="source_icon" />
                </div>
              )}
              <span id="sourceName">{source_id}</span>
            </div>
            <span>Read More</span>
          </div>
        </div>
        <div className="date">{`Posted on ${pubDate}`}</div>
      </div>
    </>
  );
};
