import { Heart } from "lucide-react";
import ClientSpaceSvg from "../assets/client-space.svg";
import { useSelector } from "react-redux";
import { Schedule, useGetAllSchedules } from "@/utils/api/schedule-api";
import { ScheduleStatusEnum } from "@/types/schedule";
import CalendarComponent from "@/components/CallendarComponent";

type Props = {};

const Reservations = ({}: Props) => {
  const { data: schedules } = useGetAllSchedules();
  const { currentCompany } = useSelector((state: any) => state.company);

  const currentPlan = currentCompany?.serviceOrders?.find(
    (order: any) => order.status === "ACTIVE"
  );

  const availableServices: Record<string, number> = {};
  currentPlan?.details.forEach(
    (detail: any) =>
      (availableServices[detail.serviceType] =
        detail.allowedBookings - detail.bookingsUsed)
  );

  const completedCount = schedules?.filter(
    (s: Schedule) => s.status === ScheduleStatusEnum.COMPLETED
  ).length;

  // 2️⃣ Activité programmée = PENDING || ONGOING
  const plannedCount = schedules?.filter(
    (s: Schedule) =>
      s.status === ScheduleStatusEnum.PENDING ||
      s.status === ScheduleStatusEnum.ONGOING
  ).length;

  const remainingCount = Object.values(availableServices).reduce(
    (sum, v) => sum + v,
    0
  );

  return (
    <div className="container mx-auto flex flex-col lg:flex-row  gap-6 lg:gap-10 px-4 py-6">
      <div className="w-full lg:flex-[3] bg-gray-100 h-full p-4 pt-6 lg:pt-10 rounded-lg">
        {/* Header Section */}
        <div className="bg-teal-800 text-white p-4 sm:p-6 rounded-lg mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase">
              BONJOUR "{currentCompany?.name}"
            </h1>
            <p className="text-xs sm:text-sm">
              Prêt à commencer la journée avec Joy!!
            </p>
          </div>
          <div className="relative">
            <div className="bg-white text-teal-800 p-2 rounded-md absolute top-0 right-4 z-10">
              <div className="text-sm font-bold">HELLO</div>
              <div className="italic font-bold text-lg">Dana</div>
            </div>
            <img
              src={ClientSpaceSvg || "/placeholder.svg"}
              alt="Avatar"
              className="h-[60%] w-auto relative z-0"
            />
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          <ActivityCard title="Activité restante" count={remainingCount || 0} />
          <ActivityCard title="Activité programmée" count={plannedCount || 0} />
          <ActivityCard title="Activité réalisée" count={completedCount || 0} />
        </div>

        {/* Statistics Section */}
        <h2 className="font-bold mb-2">Statistique après évènement</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          <StatCard percentage={0} label="Gain de productivité" />
          <StatCard percentage={0} label="Cohésion après l'activité" />
          <StatCard percentage={0} label="Amélioration ambiance de travail" />
        </div>

        <h2 className="font-bold mb-2">Credit actuelles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          <SoldCard
            service="Snacking"
            count={availableServices["NOURRITURE"] || 0}
          />
          <SoldCard
            service="Bien‑être"
            count={availableServices["BIEN_ETRE"] || 0}
          />
          <SoldCard
            service="Team building"
            count={availableServices["TEAM_BUILDING"] || 0}
          />
        </div>

        {/* Wishlist Section */}
        <h2 className="font-bold mb-2">Liste d'envie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <WishlistItem title="GESTION DU STRESS" />
          <WishlistItem title="ATELIER DIY" />
          <WishlistItem title="MASSAGE" />
          <WishlistItem title="PANIER DE PETIT-DÉJEUNER" />
        </div>
      </div>
      <div className="w-full lg:flex-1 flex justify-center lg:justify-start lg:pt-10">
        <CalendarComponent reservations={schedules} />
      </div>
    </div>
  );
};

export default Reservations;

function ActivityCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-center mb-2">{title}</h3>
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-bold">{count}</span>
      </div>
    </div>
  );
}

function StatCard({
  percentage,
  label,
}: {
  percentage: number;
  label: string;
}) {
  // Calculate the circumference and offset for the progress circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-2">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#E6F4E6"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#8CC152"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-xl md:text-2xl font-bold">
            {percentage} %
          </span>
        </div>
      </div>
      <p className="text-xs text-center text-teal-800 font-medium">{label}</p>
    </div>
  );
}

function WishlistItem({ title }: { title: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
      <span className="font-bold text-sm sm:text-base">{title}</span>
      <Heart className="text-red-500 fill-red-500" size={20} />
    </div>
  );
}

function SoldCard({ service, count }: { service: string; count: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center">
      <h3 className="text-sm font-medium mb-2">{service}</h3>
      <div className="text-xl sm:text-2xl font-bold">{count}</div>
    </div>
  );
}
