import { useQuery } from "react-query";
import fetchWithAuth from "../fetchWrapper";
import { toast } from "sonner";
import { serializeQuery } from "../mathods";
import { ActivityOptionsDto } from "@/types/activity";

export const useGetPaginatedActivities = (options: ActivityOptionsDto) => {
  const getPaginatedActivitiesRequest = async () => {
    const params = serializeQuery(options);
    return await fetchWithAuth(`/activities?${params}`, { method: "GET" });
  };

  const {
    data: activities,
    isLoading,
    error,
  } = useQuery(["activities", options], getPaginatedActivitiesRequest);

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
