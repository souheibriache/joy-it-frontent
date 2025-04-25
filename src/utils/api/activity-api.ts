import { useQuery } from "react-query";
import fetchWithAuth from "../fetchWrapper";
import { toast } from "sonner";
import { serializeQuery } from "../mathods";
import type { ActivityOptionsDto } from "@/types/activity";

export const useGetPaginatedActivities = (options: ActivityOptionsDto) => {
  // Create a sanitized copy of options with proper number types
  const sanitizedOptions = {
    ...options,
    page: Number(options.page),
    take: Number(options.take),
    durationMin:
      options.durationMin !== undefined
        ? Number(options.durationMin)
        : undefined,
    durationMax:
      options.durationMax !== undefined
        ? Number(options.durationMax)
        : undefined,
  };

  const getPaginatedActivitiesRequest = async () => {
    const params = serializeQuery(sanitizedOptions);
    return await fetchWithAuth(`/activities?${params}`, { method: "GET" });
  };

  const {
    data: activities,
    isLoading,
    error,
  } = useQuery(["activities", sanitizedOptions], getPaginatedActivitiesRequest);

  if (error) {
    toast.error("Echéc de recuperation des activités");
  }

  return { activities, isLoading };
};

export const useGetActivityById = (activityId: string) => {
  const getActivityByIdRequest = async () => {
    return await fetchWithAuth(`/activities/${activityId}`, { method: "GET" });
  };

  const {
    data: activity,
    isLoading,
    error,
  } = useQuery(["activity", activityId], getActivityByIdRequest, {
    enabled: !!activityId,
  });

  if (error) {
    toast.error("Failed to fetch activity");
  }

  return { activity, isLoading };
};
