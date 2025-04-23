"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { normalize } from "@/utils/mathods";
import { Schedule } from "@/utils/api/schedule-api";
import { ScheduleStatusEnum } from "@/types/schedule";

declare type Props = {
  reservations?: Schedule[];
};

const COLORS = {
  primary: "#13534B",
  secondary: "#A4C84F",
  beige: "#F6EADB",
  orange: "#FFAA94",
  red: "#EF4444", // you can tweak to match your red-500
};

const CalendarComponent = ({ reservations }: Props) => {
  const eventDays = React.useMemo(
    () => new Set(reservations?.map((r) => normalize(new Date(r.date)))),
    [reservations]
  );

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openId, setOpenId] = useState<string | null>(null);

  // Filter reservations for selectedDate
  const todaysEvents = reservations?.filter(
    (r) => new Date(r.date).toDateString() === selectedDate.toDateString()
  );

  const selectedTs = normalize(selectedDate);

  // Get color for event card
  const getEventColor = (status: ScheduleStatusEnum): string => {
    switch (status) {
      case ScheduleStatusEnum.PENDING:
        return COLORS.orange;
      case ScheduleStatusEnum.COMPLETED:
        return COLORS.primary;
      case ScheduleStatusEnum.ONGOING:
        return COLORS.secondary;
      case ScheduleStatusEnum.CANCELED:
        return COLORS.red;
      default:
        return COLORS.primary;
    }
  };

  // Format date to French locale
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full max-w-sm">
      {/* Title */}
      <h2 className="text-xl font-bold text-teal-800 mb-6 border-l-4 border-green-500 pl-3">
        MES RESERVATIONS
      </h2>

      {/* Calendar Section */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-2">Calendrier</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <Calendar
            onChange={(d) =>
              setSelectedDate(new Date(d?.toLocaleString() as string))
            }
            value={selectedDate}
            className="custom-calendar border-none shadow-none"
            navigationLabel={({ date }) => formatMonthYear(date)}
            formatShortWeekday={(locale, date) => {
              locale;
              return date
                .toLocaleDateString("fr-FR", { weekday: "short" })
                .substring(0, 3);
            }}
            next2Label={null}
            prev2Label={null}
            nextLabel={<ChevronRight size={16} />}
            prevLabel={<ChevronLeft size={16} />}
            tileClassName={({ date, view }) => {
              if (view !== "month") return "";

              const dayTs = normalize(date);
              const classes = [
                "!rounded-full",
                "!aspect-square",
                "!flex",
                "!items-center",
                "!justify-center",
              ];

              if (dayTs === selectedTs)
                classes.push(
                  "!border-2 !border-teal-600 text-teal-800 !font-medium"
                );
              if (eventDays.has(dayTs))
                classes.push("!text-teal-800 !bg-white !font-medium");
              if (date.getMonth() !== selectedDate.getMonth())
                classes.push("!text-gray-300");

              return classes.join(" ");
            }}
            tileContent={({ date, view }) => {
              if (view !== "month") return null;
              const dayTs = normalize(date);

              if (eventDays.has(dayTs) && dayTs === selectedTs) {
                return (
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <div className="w-1 h-1 bg-teal-600 rounded-full"></div>
                  </div>
                );
              }
              return null;
            }}
          />
        </div>
      </div>

      {/* Events List */}
      <div>
        <h3 className="text-base font-medium text-gray-800 mb-3">Évènement</h3>
        {todaysEvents?.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Aucun événement pour cette date.
          </p>
        ) : (
          <ul className="space-y-3">
            {todaysEvents?.map((evt: Schedule) => {
              const isOpen = openId === evt.id;
              const borderColor = isOpen
                ? COLORS.secondary
                : getEventColor(evt.status);
              return (
                <li
                  key={evt.id}
                  style={{ borderLeft: `8px solid ${borderColor}` }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : evt.id)}
                    className="w-full flex items-center justify-between p-3"
                  >
                    <div className="flex items-start">
                      <div className="text-left">
                        <div className="font-bold uppercase text-gray-800">
                          {evt.activity?.name || evt.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(evt.date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                          &nbsp;&nbsp;
                          {`${evt.startTime.slice(0, 4)} ${evt.startTime.slice(
                            -2
                          )}`}{" "}
                          –{" "}
                          {`${evt.endTime.slice(0, 4)} ${evt.endTime.slice(
                            -2
                          )}`}
                        </div>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </button>
                  {isOpen && evt.activity && (
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      {/* Activity Details */}
                      <div className="space-y-3 mt-2">
                        {evt.activity.images &&
                          evt.activity.images.length > 0 && (
                            <div className="w-full h-40 overflow-hidden rounded-lg">
                              <img
                                src={
                                  evt.activity.images[
                                    evt.activity.mainImageIndex || 0
                                  ]
                                }
                                alt={evt.activity.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                        <div className="mt-2">
                          <p className="text-gray-700">
                            {evt.activity.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">Durée</p>
                            <p className="font-medium">
                              {evt.activity.duration} heurs
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Lieu</p>
                          {evt?.activity?.address ? (
                            <>
                              <p className="font-medium">
                                {evt.activity.address},{" "}
                                {evt.activity.postalCode} {evt.activity.city}
                              </p>
                            </>
                          ) : (
                            <p>Chez le client</p>
                          )}
                          {evt.activity.locationUrl && (
                            <a
                              href={evt.activity.locationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline text-xs inline-block mt-1"
                            >
                              Voir sur la carte
                            </a>
                          )}
                        </div>

                        {evt.activity.categories &&
                          evt.activity.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {evt.activity.categories.map(
                                (category, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700"
                                  >
                                    {category}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
