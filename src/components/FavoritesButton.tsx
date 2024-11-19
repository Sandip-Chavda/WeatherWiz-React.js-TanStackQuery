import type { WeatherData } from "@/api/types";
import { useFavorites } from "@/hooks/useFavorite";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface FavoritesButtonProps {
  data: WeatherData;
}

const FavoritesButton = ({ data }: FavoritesButtonProps) => {
  const { addFavorite, isFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? "outline" : "outline"}
      size={"icon"}
      className={`shadow-md dark:shadow-gray-700  ${
        isCurrentlyFavorite ? "bg-white dark:bg-black" : ""
      }`}
      onClick={handleToggleFavorite}
    >
      <Heart
        className={`h-7 w-7 ${isCurrentlyFavorite ? "fill-red-500" : ""}`}
      />
    </Button>
  );
};

export default FavoritesButton;
