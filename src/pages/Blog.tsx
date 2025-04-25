import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import {
  ArticleFilterDto,
  useGetPaginatedArticles,
} from "@/utils/api/blog-api";
import { Link } from "react-router-dom";
type Props = {};

const Blog = ({}: Props) => {
  const [filters] = useState<ArticleFilterDto>({});
  const [pagination] = useState<any>({
    page: 1,
    take: 10,
    query: filters,
  });
  const { articles, isLoading } = useGetPaginatedArticles(pagination);
  useEffect(() => {
    console.log({ articles, isLoading });
  }, [articles, isLoading]);

  return (
    <>
      <div className="flex flex-col relative">
        <div className="w-full top-0  gap-10 relative">
          <div className="bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center w-full flex flex-col gap-10 p-20 h-[30vh]">
            <ul className="flex flex-row items-center gap-2 container mx-auto uppercase">
              <Link to="/" className=" text-white font-bold py-0">
                Accueil
              </Link>
              <Link
                to="/blog"
                className=" text-white font-bold py-0 border-l-2 border-white pl-2"
              >
                Actualités
              </Link>
            </ul>
          </div>
        </div>

        <div className="container mx-auto grid grid-cols-3 gap-20 -translate-y-32">
          {articles?.data?.map((article: any) => (
            <div className="flex flex-col rounded-[10px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white gap-2 overflow-hidden">
              <img
                className="w-full h-[200px] object-cover"
                src={article.thumbnail.fullUrl}
              />
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col w-fit gap-2">
                  <Link to={`/blog/${article.id}`}>
                    <h1 className="text-primary text-3xl font-semibold">
                      {article.title}
                    </h1>
                  </Link>
                  <div className="h-1 w-1/2 bg-primary rounded-full"></div>
                </div>

                <h5 className="text-xl">{article.subtitle}</h5>
                <div className="flex flex-row w-full justify-start">
                  <Link
                    to={`/blog/${article.id}`}
                    className="font-semibold flex flex-row gap-2 group items-center"
                  >
                    Voir plus
                    <ArrowRight
                      className="group-hover:translate-x-1 duration-200"
                      strokeWidth={2}
                      size={20}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
