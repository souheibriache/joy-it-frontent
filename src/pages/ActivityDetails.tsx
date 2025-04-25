"use client";

import { useGetActivityById } from "@/utils/api/activity-api";
import { categories } from "@/utils/enums";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  Info,
  Loader,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { TimePicker24 } from "@/components/ui/TimePicker24";
import { useFetchCompany } from "@/utils/api/company-api";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanySuccess } from "@/redux/auth/company-slice";
import type { ActivityType } from "@/types/activity";

const ActivityDetails = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const today = startOfDay(new Date());
  const maxSelectable = addDays(today, 2);
  const [selectedTime, setSelectedTime] = useState<string>("12:00");
  const [participants, setParticipants] = useState<number>(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const dispatch = useDispatch();
  const { currentCompany } = useSelector((state: any) => ({
    currentCompany: state.company.currentCompany,
    currentUser: state.user?.currentUser,
  }));

  const { activity, isLoading: isFetching } = useGetActivityById(
    activityId || ""
  );

  const { mutate: createSchedule, isLoading } = useCreateSchedule();

  useEffect(() => {
    if (activity) {
      let image = activity?.images?.find((image: any) => image.isMain);
      if (!image) image = activity?.images[0];
      setMainImage(image);
    }
  }, [activity]);

  const { fetchCompany } = useFetchCompany();

  // Check if user has available credits for this activity type
  const hasAvailableCredits = () => {
    if (!currentCompany || !activity) return false;

    const currentPlan = currentCompany?.serviceOrders?.find(
      (order: any) => order.status === "ACTIVE"
    );
    if (!currentPlan) return false;

    const availableServices: Record<string, number> = {};
    currentPlan?.details.forEach(
      (detail: any) =>
        (availableServices[detail.serviceType] =
          detail.allowedBookings - detail.bookingsUsed)
    );

    // Check if user has credits for this activity type
    return availableServices[activity.type] > 0;
  };

  const handleSchedule = () => {
    // Check if user is authenticated
    if (!currentCompany) {
      toast.error("Veuillez vous connecter pour réserver cette activité");
      navigate("/login", { state: { from: `/activities/${activityId}` } });
      return;
    }

    // Check if user has available credits
    if (!hasAvailableCredits()) {
      toast.error(
        "Vous n'avez pas assez de crédits disponibles pour ce type d'activité. Veuillez rajouter un abonnement."
      );
      navigate("/order");
      return;
    }

    if (!selectedDate) {
      toast.error("Veuillez sélectionner une date");
      return;
    }

    const dt = new Date(selectedDate);
    const [h, m] = selectedTime.split(":").map(Number);
    dt.setHours(h, m, 0, 0);
    setScheduledDate(dt);

    createSchedule(
      { activityId: activityId!, date: dt.toISOString(), participants },
      {
        onSuccess: () => {
          toast.success("Réservation créée avec succès !");
          setBookingSuccess(true);

          // Update Redux store with new booking data
          fetchCompany().then((companyData: any) => {
            if (companyData) {
              dispatch(fetchCompanySuccess(companyData));
            }
          });
        },
        onError: (err: any) => {
          toast.error(err.message || "Une erreur est survenue");
        },
      }
    );
  };

  const renderBookingForm = () => (
    <Card className="shadow-lg border-t-4 border-t-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Réserver cette activité</CardTitle>
        <CardDescription>
          Choisissez une date et un horaire pour votre réservation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "dd MMMM yyyy", { locale: fr })
                ) : (
                  <span>Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                locale={fr}
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
        </div>

        {/* Time picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Heure</label>
          <TimePicker24 value={selectedTime} onChange={setSelectedTime} />
        </div>

        {/* Participants input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre de participants</label>
          <Input
            type="number"
            min={1}
            max={activity?.participants || 20}
            value={participants}
            onChange={(e) => setParticipants(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleSchedule}
          disabled={isLoading}
          className="w-full mt-4 text-white"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Réservation en cours...
            </>
          ) : (
            "Réserver maintenant"
          )}
        </Button>
      </CardContent>
    </Card>
  );

  const renderSuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg border-t-4 border-t-green-500">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-700">
            Félicitations !
          </CardTitle>
          <CardDescription className="text-base">
            Votre activité a été réservée avec succès
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="font-medium text-gray-700">
              Vous avez réservé{" "}
              <span className="text-primary font-bold">{activity?.name}</span>{" "}
              pour le{" "}
              <span className="font-bold">
                {scheduledDate
                  ? format(scheduledDate, "dd MMMM yyyy 'à' HH'h'mm", {
                      locale: fr,
                    })
                  : ""}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Type d'activité</p>
              <p className="font-medium">{categories(activity?.type)}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Participants</p>
              <p className="font-medium">
                {participants} personne{participants > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Un récapitulatif de votre réservation a été envoyé à votre adresse
              email.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/activities")}
            className="border-primary text-primary"
          >
            Voir toutes les activités
          </Button>
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-primary text-white"
          >
            Voir mes réservations
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const renderAvailableCredits = () => {
    if (!currentCompany) {
      return (
        <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
          <h3 className="font-medium text-amber-800 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Connectez-vous pour réserver
          </h3>
          <p className="text-amber-700 text-sm">
            Vous devez être connecté et avoir un abonnement actif pour réserver
            cette activité.
          </p>
        </div>
      );
    }

    const currentPlan = currentCompany?.serviceOrders?.find(
      (order: any) => order.status === "ACTIVE"
    );
    if (!currentPlan) {
      return (
        <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
          <h3 className="font-medium text-amber-800 mb-2">
            Aucun abonnement actif
          </h3>
          <p className="text-amber-700 text-sm">
            Vous n'avez pas d'abonnement actif. Veuillez souscrire à un
            abonnement pour réserver cette activité.
          </p>
          <Button
            variant="outline"
            className="mt-3 text-primary border-primary"
            onClick={() => navigate("/order")}
          >
            Voir les abonnements
          </Button>
        </div>
      );
    }

    const availableServices: Record<string, number> = {};
    currentPlan?.details.forEach(
      (detail: any) =>
        (availableServices[detail.serviceType] =
          detail.allowedBookings - detail.bookingsUsed)
    );

    // Check if the activity type matches any available service
    const activityType = activity?.type as ActivityType;
    const hasCredits = availableServices[activityType] > 0;

    return (
      <div
        className={`p-4 rounded-lg mb-6 ${
          hasCredits
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <h3
          className={`font-medium mb-2 ${
            hasCredits ? "text-green-800" : "text-red-800"
          }`}
        >
          Crédits disponibles
        </h3>
        <div className="flex gap-4 flex-wrap">
          {Object.entries(availableServices).map(([type, count]) => {
            const isCurrentType = type === activityType;
            return (
              <div key={type} className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  {categories(type as ActivityType)}:
                </span>
                <Badge
                  variant="outline"
                  className={`${
                    isCurrentType
                      ? count > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  } font-semibold`}
                >
                  {count}
                </Badge>
              </div>
            );
          })}
        </div>
        {!hasCredits && activityType && (
          <p className="text-red-700 text-sm mt-2">
            Vous n'avez pas assez de crédits pour ce type d'activité (
            {categories(activityType)}).
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {isFetching ? (
          <div className="flex w-full justify-center py-20">
            <Loader className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-10"
          >
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <a href="/" className="text-primary font-medium hover:underline">
                Accueil
              </a>
              <span>/</span>
              <a
                href="/activities"
                className="text-primary font-medium hover:underline"
              >
                {categories(activity?.type)}
              </a>
              <span>/</span>
              <span className="font-medium">{activity?.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left column - Images */}
              <div className="space-y-6">
                {/* Main image */}
                <div className="rounded-xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
                  <img
                    className="w-full h-full object-cover"
                    src={mainImage?.fullUrl || "/placeholder.svg"}
                    alt={activity?.name}
                  />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {activity?.images.map((image: any) => (
                    <div
                      key={image.id}
                      onClick={() => setMainImage(image)}
                      className={`
                        cursor-pointer rounded-lg overflow-hidden h-24 
                        ${
                          mainImage?.id === image.id
                            ? "ring-4 ring-primary ring-offset-2"
                            : "hover:opacity-80"
                        }
                        transition-all duration-200
                      `}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={image.fullUrl || "/placeholder.svg"}
                        alt="thumbnail"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column - Details */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 border-l-4 border-primary pl-4">
                    {activity?.name}
                  </h1>

                  <div className="flex items-center mt-3">
                    <div className="flex items-center">
                      <img
                        src={StarIcon || "/placeholder.svg"}
                        alt="star"
                        className="h-5 w-5"
                      />
                      <img
                        src={StarIcon || "/placeholder.svg"}
                        alt="star"
                        className="h-5 w-5"
                      />
                      <img
                        src={StarIcon || "/placeholder.svg"}
                        alt="star"
                        className="h-5 w-5"
                      />
                      <img
                        src={StarIcon || "/placeholder.svg"}
                        alt="star"
                        className="h-5 w-5"
                      />
                      <img
                        src={HalfStarIcon || "/placeholder.svg"}
                        alt="half star"
                        className="h-5 w-5"
                      />
                    </div>
                    <span className="ml-2 text-gray-600 font-medium">
                      (4.5/5)
                    </span>
                  </div>
                </div>

                {!bookingSuccess && renderAvailableCredits()}

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                    <Info className="h-5 w-5 text-primary" />
                    Description
                  </h2>
                  <p className="text-gray-700 mt-2">{activity?.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Durée</h3>
                      <p className="text-gray-700">
                        {activity?.duration} heures
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Catégorie</h3>
                      <Badge className="h-5 text-primary bg-primary/10 mt-1">
                        {categories(activity?.type)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Lieu</h3>
                      <p className="text-gray-700">
                        {activity?.isInsideCompany
                          ? "Sur site (en présentiel)"
                          : activity?.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Participants
                      </h3>
                      <p className="text-gray-700">
                        Jusqu'à {activity?.participants} personnes
                      </p>
                    </div>
                  </div>
                </div>

                {activity?.keyWords?.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Mots clés</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {activity?.keyWords?.map((keyword: string) => (
                          <Badge
                            key={keyword}
                            variant="outline"
                            className="bg-gray-100"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Form or Success Message */}
                {bookingSuccess ? renderSuccessMessage() : renderBookingForm()}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ActivityDetails;
