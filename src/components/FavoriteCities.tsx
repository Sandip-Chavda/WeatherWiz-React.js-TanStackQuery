import { useFavorites } from "@/hooks/useFavorite";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/useWeather";
import { Button } from "./ui/button";
import { LoaderPinwheel, X } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites Cities</h1>

      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 py-2">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();

  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8  transition-all shadow-md dark:shadow-gray-700"
      tabIndex={0}
    >
      <Button
        variant={"ghost"}
        size={"icon"}
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 dark:hover:text-destructive-foreground group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favorites.`);
        }}
      >
        <X className="h-4 w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <LoaderPinwheel className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-3">
            <img
              alt={weather.weather[0].description}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys.country}
              </p>
            </div>
          </div>

          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main.temp)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FavoriteCities;
