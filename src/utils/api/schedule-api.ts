import { useQuery, useMutation, useQueryClient } from "react-query";
import fetchWithAuth from "../fetchWrapper";
import { Activity } from "@/types/activity";

// 1. Create a schedule
export const useCreateSchedule = () => {
  const qc = useQueryClient();
  return useMutation(
    (payload: CreateScheduleDto) =>
      fetchWithAuth("/schedule", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: () => qc.invalidateQueries("schedules"),
    }
  );
};

// 2. Get all schedules for current client
export const useGetAllSchedules = () =>
  useQuery<Schedule[]>("schedules", () => fetchWithAuth("/schedule"));

// 3. Get one schedule by ID
export const useGetSchedule = (scheduleId: string) =>
  useQuery<Schedule>(
    ["schedule", scheduleId],
    () => fetchWithAuth(`/schedule/${scheduleId}`),
    { enabled: !!scheduleId }
  );

// 6. Update a schedule (client)
export const useUpdateSchedule = (scheduleId: string) => {
  const qc = useQueryClient();
  return useMutation(
    (payload: UpdateScheduleDto) =>
      fetchWithAuth(`/schedule/${scheduleId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: () => {
        qc.invalidateQueries("schedules");
        qc.invalidateQueries(["schedule", scheduleId]);
      },
    }
  );
};

// 7. Cancel a schedule (client)
export const useCancelSchedule = (scheduleId: string) => {
  const qc = useQueryClient();
  return useMutation(
    () =>
      fetchWithAuth(`/schedule/${scheduleId}/cancel`, {
        method: "PUT",
      }),
    {
      onSuccess: () => {
        qc.invalidateQueries("schedules");
        qc.invalidateQueries(["schedule", scheduleId]);
      },
    }
  );
};

// 9. Delete a schedule (client)
export const useDeleteSchedule = () => {
  const qc = useQueryClient();
  return useMutation(
    (scheduleId: string) =>
      fetchWithAuth(`/schedule/${scheduleId}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => qc.invalidateQueries("schedules"),
    }
  );
};

export interface CreateScheduleDto {
  activityId: string;
  participants: number;
  date: string;
}

export interface UpdateScheduleDto {
  // define update fields
  title?: string;
  date?: string;
  // ...other fields
}

export enum ScheduleStatusEnum {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface Schedule {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatusEnum;
  activity: Activity;
  company?: { id: string };
}
