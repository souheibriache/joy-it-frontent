import ActivityFilters from "./ActivityFilters";

type Props = {};

const SearchActivities = ({}: Props) => {
  return (
    <div className="h-64 bg-secondaryred w-full bg-opacity-45">
      <ActivityFilters />
    </div>
  );
};

export default SearchActivities;
