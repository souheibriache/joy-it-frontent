import Footer from "@/components/Footer";
import { useGetArticleById } from "@/utils/api/blog-api";
import { Link, useParams } from "react-router-dom";

type Props = {};

const ArticleDetails = ({}: Props) => {
  const { articleId } = useParams<{ articleId: string }>();

  const { article } = useGetArticleById(articleId || "");

  return (
    <>
      <div className="flex flex-col relative">
        <div className="w-full top-0  gap-10 relative">
          <div
            className={`bg-[url(/src/assets/landingpage_background.png)] bg-cover bg-center w-full flex flex-col gap-10 p-20 h-[30vh]`}
          >
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

            <h1 className="self-center text-white text-3xl font-bolota w-1/2 text-center">
              {article?.title}
            </h1>
          </div>
        </div>

        <div className="container mx-auto flex flex-col gap-4 my-5">
          <div className="flex flex-col gap-2 w-1/3">
            <p className="text-2xl font-semibold text-primary">
              {article?.title}
            </p>

            <div className="h-1 w-1/2 bg-secondary rounded-full"></div>
          </div>

          <div className="flex flex-row gap-5 text-base text-gray-500 font-semibold">
            <div className="flex flex-row gap-2">
              <p>{article?.author?.firstName}</p>{" "}
              <p>{article?.author?.lastName}</p>
            </div>
            <p className="font-light">
              {new Date(article?.createdAt).toLocaleDateString("fr")}
            </p>
          </div>

          <p>{article?.subtitle}</p>
          <img
            className="max-h-[20vh] object-cover"
            src={article?.thumbnail?.fullUrl}
          />
          <p>{article?.introduction}</p>
          <div className="flex flex-col gap-[30px]">
            {article?.paragraphs?.map((paragraph: any, index: number) => (
              <div
                key={index}
                className={`flex gap-10 ${
                  index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <img
                  className=" flex-1 w-[100px]  max-w-[500px] aspect-video object-cover"
                  src={paragraph?.image?.fullUrl}
                />
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-2xl font-bolota text-primary">
                    {paragraph?.title}
                  </h3>
                  <h5 className="text-gray-700  text-xl font-semibold">
                    {paragraph?.subtitle}
                  </h5>
                  <p className="text-lg ">{paragraph?.content}</p>
                </div>
              </div>
            ))}
          </div>
          <p>{article?.conclusion}</p>
          <ul className="flex space-x-2 items-center">
            <p> Mots clés:</p>
            {article?.tags?.map((tag: string, index: number) => (
              <li
                key={index}
                className="px-2 py-1 bg-gray-200 rounded-[10px] text-sm text-gray-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ArticleDetails;
