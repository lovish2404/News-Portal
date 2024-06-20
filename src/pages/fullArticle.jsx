import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import customAxios from "../axios";
import { Video } from "../components/video";
import { ArticleLoader } from "../components/articleLoading";

export const FullArticle = () => {
  const { state } = useLocation();
  const {
    article_id,
    image_url,
    video_url,
    source_icon,
    source_id,
    title,
    pubDate,
    creator,
    description,
  } = state;
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const data = await customAxios.get("", {
        params: {
          id: article_id,
        },
      });
      setInfo(data.data.results[0]);
    } catch (error) {}
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  function handleError(e) {
    e.target.style.display = "none";
  }
  if (loading) {
    return <ArticleLoader></ArticleLoader>;
  }
  return (
    !loading && (
      <>
        <main className="hero">
          <header className="heroHeader">
            <button onClick={handleBack} className="goBackBtn">
              Home
            </button>
            <a href={info.source_url} className="sourceHero">
              <div className="sourceHeroImage">
                {source_icon && <img src={source_icon} alt="source_icon" />}
              </div>
              <span>{source_id}</span>
            </a>
          </header>
          <div className="titleDiv">
            <div>
              <span id="titleMain">{title}</span>
              <div className="titleDescription">{description}</div>
            </div>
            <div className="publishDate">
              <span id="publish">
                Published- <span>{pubDate}</span>
              </span>
              <span id="creater">-{creator}</span>
            </div>
          </div>
          <div className="articleImg">
            {image_url && (
              <img src={image_url} alt="article_img" onError={handleError} />
            )}
          </div>
          <pre className="full_content">
            Showcasing dummy api content as the api response always contains
            this data because of free subscription <br />
            <br />
            {info.content}
          </pre>
          <Video videoUrl={video_url}></Video>
        </main>
      </>
    )
  );
};
