import { Car, Bus, Navigation, Clock, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransportOptionProps {
  type: "auto" | "taxi" | "bus" | "walk";
  name: string;
  duration: string;
  cost: string;
  description?: string;
  onClick?: () => void;
  selected?: boolean;
}

const typeConfig = {
  auto: {
    icon: Car,
    label: "Auto",
    className: "transport-auto",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  taxi: {
    icon: Car,
    label: "Taxi",
    className: "transport-taxi",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  bus: {
    icon: Bus,
    label: "Bus",
    className: "transport-bus",
    iconColor: "text-green-600 dark:text-green-400",
  },
  walk: {
    icon: Navigation,
    label: "Walk",
    className: "transport-walk",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
};

const TransportOption = ({
  type,
  name,
  duration,
  cost,
  description,
  onClick,
  selected,
}: TransportOptionProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all touch-target text-left",
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
          config.className
        )}
      >
        <Icon className={cn("w-6 h-6", config.iconColor)} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground">{name}</h4>
        {description && (
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        )}
        <div className="flex items-center gap-4 mt-1.5 text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
          <span className="flex items-center gap-1 font-medium text-primary">
            <IndianRupee className="w-3.5 h-3.5" />
            {cost}
          </span>
        </div>
      </div>
    </button>
  );
};

export default TransportOption;
