import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import customAxios from "../axios";
import { useGlobalContext } from "../context";
import { ArticleList } from "../components/articlesList";
import { Skeleton } from "../components/skeleton";
export const Home = () => {
  const { filterList, searchKeyword } = useGlobalContext();
  const [articlesList, setArticleList] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMoreAvailable, setIsMoreAvailable] = useState(true);
  const filterFinal = filterList.join(",");
  const fetchData = async () => {
    try {
      const data = await customAxios.get("", {
        params: {
          image: 1,
          size: "10",
          language: "en,hi,mr,pa,ta",
          ...(filterFinal && { category: filterFinal }),
          ...(pageToken && { page: pageToken }),
          ...(searchKeyword && { qInTitle: searchKeyword }),
        },
      });

      //used this if-else to prevent fetching more articles
      if (data?.data?.nextPage) {
        setIsMoreAvailable(true);
        setPageToken(data?.data?.nextPage);
      } else {
        setPageToken(null);
        setIsMoreAvailable(false);
      }
      setArticleList((prev) => {
        return [...prev, ...data?.data?.results];
      });
    } catch (error) {}
    setLoading(false);
  };
  const showMore = () => {
    fetchData();
  };

  useEffect(() => {
    setLoading(true);
    setArticleList([]);
    setPageToken("");
    fetchData();
  }, [filterList]);

  return (
    <>
      <Navbar
        setArticleList={setArticleList}
        setPageToken={setPageToken}
        fetchData={fetchData}
        setLoading={setLoading}
      ></Navbar>
      <Sidebar setPageToken={setPageToken}></Sidebar>
      {loading && <Skeleton></Skeleton>}
      {!loading && (
        <ArticleList
          articlesList={articlesList}
          showMore={showMore}
          isMoreAvailable={isMoreAvailable}
        ></ArticleList>
      )}
    </>
  );
};
