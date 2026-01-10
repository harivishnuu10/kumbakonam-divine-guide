import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FilterChipsProps {
  options: FilterOption[];
  selected: string;
  onChange: (id: string) => void;
  className?: string;
}

const FilterChips = ({ options, selected, onChange, className }: FilterChipsProps) => {
  return (
    <div className={cn("flex gap-2 overflow-x-auto hide-scrollbar py-1", className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors touch-target",
            selected === option.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterChips;
