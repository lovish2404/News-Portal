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
  const [paginationPayload, setPaginationPayload] = useState({
    total: 0,
    nextPageToken: "",
    prevPageToken: ["nan"],
    currentPage: 1,
  });
  const footer = true;
  const filterFinal = filterList.join(",");
  const fetchData = async (token) => {
    console.log(token);
    console.log(paginationPayload);
    try {
      const data = await customAxios.get("", {
        params: {
          image: 1,
          size: "10",
          language: "en,hi,mr,pa,ta",
          ...(filterFinal && { category: filterFinal }),
          ...(token && token !== "nan" && { page: token }),
          ...(searchKeyword && { qInTitle: searchKeyword }),
        },
      });
      setPaginationPayload((prev) => ({
        ...prev,
        ...(prev.currentPage === 1 && {
          total: Math.ceil(data?.data?.totalResults / 10),
        }),
        nextPageToken: data?.data?.nextPage,
      }));
      //used this if-else to prevent fetching more articles
      if (data?.data?.nextPage) {
        setIsMoreAvailable(true);
        setPageToken(data?.data?.nextPage);
      } else {
        setPageToken(null);
        setIsMoreAvailable(false);
      }
      setArticleList(data?.data?.results);
    } catch (error) {}
    setLoading(false);
  };
  const showMore = (token) => {
    fetchData(token);
  };

  useEffect(() => {
    setLoading(true);
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
          footer={footer}
          setLoading={setLoading}
          paginationPayload={paginationPayload}
          setPaginationPayload={setPaginationPayload}
          setPageToken={setPageToken}
        ></ArticleList>
      )}
    </>
  );
};
