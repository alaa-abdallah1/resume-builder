import { FormPayload } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date: string | Date | undefined,
  showDay = false
): string => {
  if (!date) return "";

  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.toLocaleString("en-US", { month: "short" });

  // Result will be like "2020 January"
  const formattedDate = showDay
    ? `${year} ${month} ${newDate.getDate()}`
    : `${year} ${month}`;

  return formattedDate;
};

export const getSavedData = (key: string): FormPayload =>
  JSON.parse(localStorage.getItem("formData") || "{}")?.[key];
