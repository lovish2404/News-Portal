import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useGlobalContext } from "../context";
const placerholderUrl =
  "https://via.placeholder.com/640x360.png?text=News+Image&bg=333333&fg=ffffff";
export const SingleArticle = ({
  image_url,
  pubDate,
  article_id,
  title,
  source_icon,
  source_id,
  video_url,
  creator,
  description,
}) => {
  const navigate = useNavigate();
  const [bookMark, setIsBookMark] = useState(false);
  const { saveList, setSaveList } = useGlobalContext();
  const checkIfSaved = saveList?.some(
    (obj) =>
      obj.hasOwnProperty("article_id") && obj["article_id"] === article_id
  );
  useEffect(() => {
    if (checkIfSaved) {
      setIsBookMark(true);
    }
  }, []);

  const article = {
    image_url,
    pubDate,
    article_id,
    title,
    source_icon,
    source_id,
    video_url,
    creator,
    description,
  };
  //for handling broken image links
  const handleError = (e) => {
    e.target.src = placerholderUrl;
  };
  const handleRedirection = () => {
    navigate(`/article/${article_id}`, {
      state: {
        article_id,
        source_icon,
        image_url,
        video_url,
        source_id,
        title,
        pubDate,
        creator,
        description,
      },
    });
  };
  const handleBookmark = () => {
    if (bookMark) {
      setSaveList((prev) => {
        const newSaveList = prev.filter((item) => {
          const itemId = item?.article_id;
          return itemId != article_id;
        });
        return newSaveList;
      });
    } else {
      setSaveList((prev) => {
        return [...prev, article];
      });
    }
    setIsBookMark(!bookMark);
  };
  return (
    <>
      <div className="article">
        <div className="img" onClick={handleRedirection}>
          <img
            src={image_url ? image_url : placerholderUrl}
            alt="articleImg"
            onError={handleError}
          />
        </div>
        <div className="Info" onClick={handleRedirection}>
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
        <div className="date">
          {`Posted on ${pubDate}`}
          {bookMark ? (
            <FaBookmark
              onClick={handleBookmark}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FaRegBookmark
              onClick={handleBookmark}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </div>
    </>
  );
};
