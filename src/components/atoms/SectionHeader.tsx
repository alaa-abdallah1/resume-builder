import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
  size?: "sm" | "lg";
};

export const SectionHeader = (props: Props) => {
  const { title, size = "sm", className } = props;

  const sizeClass = {
    sm: "text-sm",
    lg: "text-xl",
  };

  return (
    <h2 className={cn("font-semibold", sizeClass[size], className)}>{title}</h2>
  );
};

export default SectionHeader;
