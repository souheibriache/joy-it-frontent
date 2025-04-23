import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ActivityFilterDto, TemplateOptionsDto } from "@/types/activity";
import { useGetPaginatedActivities } from "@/utils/api/activity-api";
import { ArrowRight, Filter, Loader } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ActivityFilter } from "@/components/ActivirtFilter";
import { Pagination } from "@/components/ui/pagination";

export const Activities = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL params into our filter shape
  const initialFilters: ActivityFilterDto = {
    search: searchParams.get("query[search]") || undefined,
    types: (searchParams.getAll("query[types][]") as any) || undefined,
    durationMin: searchParams.has("query[durationMin]")
      ? Number(searchParams.get("query[durationMin]"))
      : undefined,
    durationMax: searchParams.has("query[durationMax]")
      ? Number(searchParams.get("query[durationMax]"))
      : undefined,
    isAvailable: searchParams.has("query[isAvailable]")
      ? searchParams.get("query[isAvailable]") === "true"
      : undefined,
  };

  const [filters, setFilters] = useState<ActivityFilterDto>({});
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState<TemplateOptionsDto>({
    page: Number(searchParams.get("page")) || 1,
    take: Number(searchParams.get("take")) || 12,
    query: initialFilters,
  });

  const { activities, isLoading } = useGetPaginatedActivities(pagination);

  // Fix for initial load - ensure we have a valid pagination object
  useEffect(() => {
    // This ensures we always have a valid pagination object on first load
    setPagination((prev) => ({ ...prev, query: filters }));
  }, []);

  // Whenever filters change, reset to page 1 and refetch
  useEffect(() => {
    setPagination((prev) => ({ ...prev, query: filters, page: 1 }));
  }, [filters]);

  // Update URL when pagination changes
  useEffect(() => {
    updateUrlParams();
  }, [pagination]);

  const updateUrlParams = () => {
    // Build bracket-notation params
    const params = new URLSearchParams();

    // Add pagination params
    params.set("page", String(pagination.page));
    params.set("take", String(pagination.take));

    // Add filter params
    const { query } = pagination;
    if (query) {
      if (query.search) {
        params.set("query[search]", query.search);
      }
      if (query.types && query.types.length > 0) {
        query.types.forEach((t: any) => params.append("query[types][]", t));
      }
      if (query.durationMin != null) {
        params.set("query[durationMin]", String(query.durationMin));
      }
      if (query.durationMax != null) {
        params.set("query[durationMax]", String(query.durationMax));
      }
      if (query.isAvailable != null) {
        params.set("query[isAvailable]", String(query.isAvailable));
      }
    }

    setSearchParams(params);
  };

  const handleApplyFilters = (newFilters: ActivityFilterDto) => {
    // 1. Remove empty/undefined values
    const cleaned = Object.fromEntries(
      Object.entries(newFilters).filter(
        ([, v]) =>
          v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)
      )
    ) as ActivityFilterDto;

    setFilters(cleaned);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({});
    setShowFilters(false);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.types && filters.types.length > 0)
      count += filters.types.length;
    if (filters.isAvailable !== undefined) count++;
    if (filters.durationMin !== undefined || filters.durationMax !== undefined)
      count++;
    return count;
  };

  return (
    <>
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="flex items-center text-3xl font-bold text-primary mb-6 gap-3 uppercase">
            <div className="w-0 h-0 border-[15px] border-transparent border-l-primary" />
            Nos activités
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-lg text-gray-700">
                Sélectionnez l'activité que vous souhaitez réserver.
              </p>
              {getActiveFilterCount() > 0 && (
                <div className="mt-2 flex items-center">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary"
                  >
                    {getActiveFilterCount()} filtre
                    {getActiveFilterCount() > 1 ? "s" : ""} actif
                    {getActiveFilterCount() > 1 ? "s" : ""}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                  >
                    Réinitialiser
                  </Button>
                </div>
              )}
            </div>
            <Button
              className="text-white flex items-center gap-2"
              onClick={() => setShowFilters((v) => !v)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Masquer les filtres" : "Filtrer"}
            </Button>
          </div>
        </div>

        {showFilters && (
          <ActivityFilter
            initialFilters={filters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : activities?.data.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">
              Aucune activité trouvée
            </h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier vos filtres pour voir plus de résultats.
            </p>
            <Button onClick={handleClearFilters} className="text-white">
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {activities?.data.map((activity: any, index: number) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div
                  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-80 cursor-pointer"
                  onClick={() => navigate(`/activities/${activity.id}`)}
                >
                  <img
                    src={
                      activity.images.find((i: any) => i.isMain)?.fullUrl ||
                      activity.images[0]?.fullUrl
                    }
                    alt={activity.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex flex-col justify-end">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {activity.name}
                    </h2>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {activity.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-primary/90 hover:bg-primary text-white">
                        {activity.duration}h
                      </Badge>
                      <ArrowRight className="text-white h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activities && activities.meta.pageCount > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={pagination.page}
              totalPages={activities.meta.pageCount}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Activities;
