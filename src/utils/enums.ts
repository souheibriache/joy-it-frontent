export const categories = (
  category: "BIEN_ETRE" | "TEAM_BUILDING" | "SPORT" | "NOURRITURE"
): string => {
  switch (category) {
    case "BIEN_ETRE":
      return "Bien-être";
    case "TEAM_BUILDING":
      return "Team building";
    case "SPORT":
      return "Sport";
    case "NOURRITURE":
      return "Snacking";
  }
};
