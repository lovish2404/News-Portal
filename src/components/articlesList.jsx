import React, { useEffect, useState } from "react";
import customAxios from "../axios";
import { useGlobalContext } from "../context";
import { SingleArticle } from "./singleArticle";

export const ArticleList = ({ articlesList, showMore, isMoreAvailable }) => {
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
            },
            index
          ) => {
            return (
              <SingleArticle
                key={index}
                img_url={image_url}
                pubDate={pubDate}
                article_id={article_id}
                title={title}
                source_icon={source_icon}
                source_id={source_id}
                video_url={video_url}
                creator={creator}
              ></SingleArticle>
            );
          }
        )}
      </section>
      {articlesList.length > 0 && isMoreAvailable && (
        <div className="showMore">
          <button onClick={showMore}>Show more</button>
        </div>
      )}
    </>
  );
};
