import { ActivityFilter } from "@/components/ActivirtFilter";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ActivityFilterDto, ActivityOptionsDto } from "@/types/activity";
import { useGetPaginatedActivities } from "@/utils/api/activity-api";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Activities = ({}: Props) => {
  const [filters, setFilters] = useState<ActivityFilterDto>({});
  const [showFilters, setShowFilters] = useState(false);

  const [pagination, setPagination] = useState<ActivityOptionsDto>({
    page: 1,
    take: 10,
    query: filters,
  });

  const { activities } = useGetPaginatedActivities(pagination);
  const navigate = useNavigate();

  // const handlePageChange = (newPage: number) => {
  //   setPagination((prev) => ({ ...prev, page: newPage }));
  // };

  const handleApplyFilters = (newFilters: ActivityFilterDto) => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );
    setFilters(cleanedFilters);
    setPagination((prev) => ({ ...prev, query: cleanedFilters, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({});
    setPagination((prev) => ({ ...prev, query: {}, page: 1 }));
  };

  return (
    <>
      <div className="container mx-auto py-20 flex flex-col gap-5">
        <h1 className=" flex flex-row items-center text-3xl font-bold text-purple mb-10 gap-3 uppercase">
          <div className="w-0 h-0 border-[15px] border-transparent border-l-purple border-r-0"></div>{" "}
          Nos activités
        </h1>

        <div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg ">
              Sélectionnez l’activité que vous souhaitez réserver.
            </p>
            <div>
              <div className="flex items-center justify-between mb-4">
                <Button onClick={() => setShowFilters(!showFilters)}>
                  {showFilters ? "Fermer" : "Filters"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {showFilters && (
          <ActivityFilter
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        )}
        <div className="grid grid-cols-4 gap-16 ">
          {activities?.data.map((activity: any) => (
            <div
              key={activity.id}
              className="rounded-3xl overflow-hidden relative hover:scale-[102%] duration-150 cursor-pointer"
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <img
                src={
                  activity.images.find((image: any) => image.isMain)?.fullUrl
                }
              />
              <div className="absolute h-full w-full bg-black bg-opacity-50 text-white flex flex-col items-start justify-end top-0 left-0 p-5">
                <h1 className="text-2xl  font-bold">{activity?.name}</h1>
                <p className=" text-lg">{activity.description}</p>
                <div className="w-full flex flex-row justify-end">
                  <button className="hover:translate-x-1 duration-150">
                    <ArrowRight />
                  </button>
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

export default Activities;
