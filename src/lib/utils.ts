import { ComponentSection, FormPayload } from "@/types";
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

export const getSavedData = () =>
  JSON.parse(localStorage.getItem("formData") || "{}");

export const setSavedData = (newData: FormPayload) =>
  localStorage.setItem("formData", JSON.stringify(newData));

export const getSavedDataitems = (key: string): FormPayload =>
  JSON.parse(localStorage.getItem("formData") || "{}")?.[key];

export const setSectionsData = (sections: ComponentSection[]) => {
  localStorage.setItem("sectionsOrder", JSON.stringify(sections));
};

export const getSectionsData = (): ComponentSection[] =>
  JSON.parse(localStorage.getItem("sectionsOrder") || "[]");
