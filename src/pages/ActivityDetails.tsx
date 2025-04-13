import { useGetActivityById } from "@/utils/api/activity-api";
import { categories } from "@/utils/enums";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "../assets/icons/StarIcon.svg";
import HalfStarIcon from "../assets/icons/HalfStarIcon.svg";
import Footer from "@/components/Footer";

type Props = {};

const ActivityDetails = ({}: Props) => {
  const { activityId } = useParams<{ activityId: string }>();
  const [mainImage, setMainImage] = useState<any>();

  const { activity, isLoading: isFetching } = useGetActivityById(
    activityId || ""
  );

  useEffect(() => {
    if (activity) {
      let image = activity?.images?.find((image: any) => image.isMain);
      if (!image) image = activity?.images[0];
      setMainImage(image);
    }
  }, [activity]);

  return (
    <>
      <div className="container mx-auto flex flex-col py-20">
        {isFetching ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-10">
            <ul className="flex flex-row items-center gap-2">
              <li className=" text-primary font-bold py-0">Accueil</li>
              <li className=" px-2 border-l-2 border-primary text-primary font-bold py-0">
                {categories(activity?.type)}
              </li>
              <li className=" px-2 border-l-2 border-primary  font-bold py-0">
                {activity?.name}
              </li>
            </ul>

            <div className="flex flex-row gap-20">
              <div className="flex-1 flex flex-col gap-5">
                <img
                  className="w-full aspect-square object-cover  rounded drop-shadow-xl shadow-black"
                  src={mainImage?.fullUrl}
                  alt=""
                />
                <div
                  className={`grid grid-cols-${activity.images.length} gap-5`}
                >
                  {activity.images.map((image: any) => (
                    <img
                      onClick={() => setMainImage(image)}
                      className={`aspect-square object-cover hover:scale-[102%] max-w-[${
                        (activity?.images?.length / 4) * 100
                      }%] duration-150 cursor-pointer rounded drop-shadow`}
                      src={image.fullUrl}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-10 items-start">
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-4xl px-2 border-l-4 border-primary text-primary">
                    {activity.name}
                  </h1>
                  <p className="flex flex-row gap-2 font-bold">
                    <span>(4.5/5)</span>
                    <div className="flex flex-row items-center gap-1">
                      <img className="h-4 w-auto" src={StarIcon} alt="" />
                      <img className="h-4 w-auto" src={StarIcon} alt="" />
                      <img className="h-4 w-auto" src={StarIcon} alt="" />
                      <img className="h-4 w-auto" src={StarIcon} alt="" />
                      <img className="h-4 w-auto" src={HalfStarIcon} alt="" />
                    </div>
                  </p>
                </div>

                <section>
                  <h2>Descriptif :</h2>
                  <p>{activity.description}</p>
                </section>

                <section>
                  <h2>Durée :</h2>
                  <p>{activity.duration}</p>
                </section>

                <section>
                  <h2>Lieu :</h2>
                  <p>
                    {activity.isInsideCompany
                      ? "Sur site (en présentiel)"
                      : activity.address}
                  </p>
                </section>

                <section>
                  <h2>Nombre de participants :</h2>
                  <p>{activity.participants} Personnes</p>
                </section>

                <section>
                  <h2>Mots clés</h2>
                  <p>{activity?.keyWords?.join(",")}</p>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ActivityDetails;
