import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ActivityFilterDto, TemplateOptionsDto } from "@/types/activity";
import { useGetPaginatedActivities } from "@/utils/api/activity-api";
import { ArrowRight } from "lucide-react";
import { ActivityFilter } from "@/components/ActivirtFilter";

export const Activities = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL params into our filter shape
  const initialFilters: ActivityFilterDto = {
    search: searchParams.get("search") || undefined,
    types: (searchParams.getAll("type") as any) || undefined,
    durationMin: searchParams.has("durationMin")
      ? Number(searchParams.get("durationMin"))
      : undefined,
    durationMax: searchParams.has("durationMax")
      ? Number(searchParams.get("durationMax"))
      : undefined,
    isAvailable: searchParams.has("isAvailable")
      ? searchParams.get("isAvailable") === "true"
      : undefined,
  };

  const [filters, setFilters] = useState<ActivityFilterDto>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState<TemplateOptionsDto>({
    page: 1,
    take: 10,
    query: initialFilters,
  });

  const { activities } = useGetPaginatedActivities(pagination);

  // Whenever filters change, reset to page 1 and refetch
  useEffect(() => {
    setPagination((prev) => ({ ...prev, query: filters, page: 1 }));
  }, [filters]);

  const handleApplyFilters = (newFilters: ActivityFilterDto) => {
    // 1. Remove empty/undefined values
    const cleaned = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([, v]) =>
          v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)
      )
    ) as ActivityFilterDto;

    setFilters(cleaned);

    // 2. Build bracket‑notation params
    const params = new URLSearchParams();
    if (cleaned.search) {
      params.set("query[search]", cleaned.search);
    }
    if (cleaned.types) {
      cleaned.types.forEach((t) => params.append("query[types][]", t));
    }
    if (cleaned.durationMin != null) {
      params.set("query[durationMin]", String(cleaned.durationMin));
    }
    if (cleaned.durationMax != null) {
      params.set("query[durationMax]", String(cleaned.durationMax));
    }
    if (cleaned.isAvailable != null) {
      params.set("query[isAvailable]", String(cleaned.isAvailable));
    }

    // 3. Reset to page 1
    params.set("page", "1");
    params.set("take", String(pagination.take));

    setSearchParams(params);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchParams({});
    setShowFilters(false);
  };

  return (
    <>
      <div className="container mx-auto py-20 flex flex-col gap-5">
        <h1 className="flex items-center text-3xl font-bold text-primary mb-10 gap-3 uppercase">
          <div className="w-0 h-0 border-[15px] border-transparent border-l-primary" />
          Nos activités
        </h1>

        <div className="flex justify-between items-center">
          <p className="text-lg">
            Sélectionnez l’activité que vous souhaitez réserver.
          </p>
          <Button
            className="text-white"
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "Fermer" : "Filtrer"}
          </Button>
        </div>

        {showFilters && (
          <ActivityFilter
            initialFilters={filters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        )}

        <div className="grid grid-cols-4 gap-16">
          {activities?.data.map((activity: any) => (
            <div
              key={activity.id}
              className="relative rounded-3xl overflow-hidden hover:scale-[102%] duration-150 cursor-pointer"
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <img
                src={activity.images.find((i: any) => i.isMain)?.fullUrl}
                alt={activity.name}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-5 flex flex-col justify-end">
                <h2 className="text-2xl font-bold">{activity.name}</h2>
                <p className="text-lg">{activity.description}</p>
                <div className="flex justify-end">
                  <ArrowRight className="hover:translate-x-1 duration-150" />
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
