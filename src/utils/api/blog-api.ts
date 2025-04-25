import { useQuery } from "react-query";
import fetchWithAuth from "../fetchWrapper";
import { toast } from "sonner";
import { serializeQuery } from "../mathods";

export type ArticleFilterDto = {};

export const useGetPaginatedArticles = (options: any) => {
  const getPaginatedArticlesRequest = async () => {
    const params = serializeQuery(options);
    return await fetchWithAuth(`/articles?${params}`, { method: "GET" });
  };

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery(["articles", options], getPaginatedArticlesRequest);

  if (error) {
    toast.error("Echéc de recuperation des articles");
  }

  return { articles, isLoading };
};

export const useGetArticleById = (articleId: string) => {
  const getArticleByIdRequest = async () => {
    return await fetchWithAuth(`/articles/${articleId}`, { method: "GET" });
  };

  const {
    data: article,
    isLoading,
    error,
  } = useQuery(["article", articleId], getArticleByIdRequest, {
    enabled: !!articleId,
  });

  if (error) {
    toast.error("Failed to fetch article");
  }

  return { article, isLoading };
};
