import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import customAxios from "../axios";
import { useGlobalContext } from "../context";
import { ArticleList } from "../components/articlesList";
import { Skeleton } from "../components/skeleton";
export const Home = () => {
  const {
    filterList,
    searchKeyword,
    paginationPayload,
    setPaginationPayload,
    resetPayload,
  } = useGlobalContext();
  const [articlesList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const footer = true;
  const filterFinal = filterList.join(",");
  const fetchData = async (token) => {
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

      setArticleList(data?.data?.results);
    } catch (error) {}
    setLoading(false);
  };
  const showMore = (token) => {
    fetchData(token);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    resetPayload();
  }, [filterList]);

  return (
    <>
      <Navbar
        setArticleList={setArticleList}
        fetchData={fetchData}
        setLoading={setLoading}
      ></Navbar>
      <Sidebar></Sidebar>
      {loading && <Skeleton></Skeleton>}
      {!loading && (
        <ArticleList
          articlesList={articlesList}
          showMore={showMore}
          footer={footer}
          setLoading={setLoading}
        ></ArticleList>
      )}
    </>
  );
};
