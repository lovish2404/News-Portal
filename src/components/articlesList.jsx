import React from "react";
import { SingleArticle } from "./singleArticle";
import { Footer } from "./footer";

export const ArticleList = ({ articlesList, showMore, footer, setLoading }) => {
  if (articlesList.length == 0) {
    return (
      <div className="Modal">
        <span>No article</span>
      </div>
    );
  }
  return (
    <>
      <section className="center">
        {articlesList.map(
          (
            {
              image_url,
              pubDate,
              article_id,
              title,
              source_icon,
              source_id,
              video_url,
              creator,
              description,
            },
            index
          ) => {
            return (
              <SingleArticle
                key={index}
                image_url={image_url}
                pubDate={pubDate}
                article_id={article_id}
                title={title}
                source_icon={source_icon}
                source_id={source_id}
                video_url={video_url}
                creator={creator}
                description={description}
              ></SingleArticle>
            );
          }
        )}
      </section>
      {footer && <Footer showMore={showMore} setLoading={setLoading}></Footer>}
    </>
  );
};
