import { useGetActivityById } from "@/utils/api/activity-api";
import { categories } from "@/utils/enums";
import { CalendarIcon, Clock, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "../assets/icons/StarIcon.svg";
import HalfStarIcon from "../assets/icons/HalfStarIcon.svg";
import Footer from "@/components/Footer";
import { useCreateSchedule } from "@/utils/api/schedule-api";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { addDays, format, startOfDay } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TimePicker24 } from "@/components/ui/TimePicker24";

type Props = {};

const ActivityDetails = ({}: Props) => {
  const { currentCompany } = useSelector((state: RootState) => state.company);
  const { activityId } = useParams<{ activityId: string }>();
  const [mainImage, setMainImage] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const today = startOfDay(new Date());
  const maxSelectable = addDays(today, 2);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [participants, setParticipants] = useState<number>(1);

  const { activity, isLoading: isFetching } = useGetActivityById(
    activityId || ""
  );

  const createSchedule = useCreateSchedule();

  useEffect(() => {
    if (activity) {
      let image = activity?.images?.find((image: any) => image.isMain);
      if (!image) image = activity?.images[0];
      setMainImage(image);
    }
  }, [activity]);

  const handleSchedule = () => {
    if (!selectedDate) return;
    const dt = new Date(selectedDate);
    const [h, m] = selectedTime.split(":").map(Number);
    dt.setHours(h, m, 0, 0);

    createSchedule.mutate(
      { activityId: activityId!, date: dt.toISOString(), participants },
      {
        onSuccess: () => {
          toast.success("Planning créé avec succès !");
        },
        onError: (err: any) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <>
      <div className="container mx-auto flex flex-col py-20">
        {isFetching ? (
          <div className="flex w-full justify-center">
            <Loader className="animate-spin" />
          </div>
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
                {/* main image */}
                <img
                  className="w-full aspect-square object-cover rounded drop-shadow-xl shadow-black"
                  src={mainImage?.fullUrl}
                  alt=""
                />

                {/* thumbnails: always 4 equal columns */}
                <div className="grid grid-cols-4 gap-5">
                  {activity?.images.map((image: any) => (
                    <img
                      key={image.id}
                      onClick={() => setMainImage(image)}
                      className="w-full aspect-square object-cover hover:scale-[102%] duration-150 cursor-pointer rounded drop-shadow"
                      src={image.fullUrl}
                      alt="thumbnail"
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-10 items-start">
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-4xl px-2 border-l-4 border-primary text-primary">
                    {activity?.name}
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
                  <p>{activity?.description}</p>
                </section>

                <section>
                  <h2>Durée :</h2>
                  <p>{activity?.duration}</p>
                </section>

                <section>
                  <h2>Categorie :</h2>
                  <p>{categories(activity?.type)}</p>
                </section>

                <section>
                  <h2>Lieu :</h2>
                  <p>
                    {activity?.isInsideCompany
                      ? "Sur site (en présentiel)"
                      : activity?.address}
                  </p>
                </section>

                <section>
                  <h2>Nombre de participants :</h2>
                  <p>{activity?.participants} Personnes</p>
                </section>

                <section>
                  <h2>Mots clés</h2>
                  <p>{activity?.keyWords?.join(",")}</p>
                </section>

                <div className="w-full p-6 bg-white rounded-lg shadow">
                  <h2 className="text-lg font-bold mb-4">
                    Réserver cette activité
                  </h2>

                  {/* Date picker */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-start flex flex-row items-center justify-start mb-4 relative"
                      >
                        <CalendarIcon className="cursor-pointer -translate-x-1 h-10 w-10 top-1/2 text-muted-foreground" />
                        {selectedDate
                          ? format(selectedDate, "dd/MM/yyyy")
                          : "Choisir une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="single"
                        disabled={(date) => {
                          const day = date.getDay();
                          return (
                            date < maxSelectable ||
                            date > new Date("2100-1-1") ||
                            day === 0 ||
                            day === 6
                          );
                        }}
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date || undefined)}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Time input */}
                  <TimePicker24
                    value={selectedTime}
                    onChange={setSelectedTime}
                  />

                  {/* Participants input */}
                  <Input
                    type="number"
                    defaultValue={currentCompany?.employeesNumber || 0}
                    value={participants}
                    onChange={(e) => setParticipants(Number(e.target.value))}
                    placeholder="Nombre de participants"
                    className="w-full mb-6"
                  />

                  <Button
                    onClick={handleSchedule}
                    disabled={createSchedule.isLoading}
                    className="w-full text-white"
                  >
                    {createSchedule.isLoading ? "En cours..." : "Réserver"}
                  </Button>
                </div>
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
