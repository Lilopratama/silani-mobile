import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const generateHumanDate = (): string => {
   // Define the location
   const location = "Samarinda";

   // Create a new date object
   const date = new Date();

   // Define an array of month names in Indonesian
   const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
   ];

   // Extract the day, month, and year from the date object
   const day = date.getDate();
   const month = months[date.getMonth()];
   const year = date.getFullYear();

   // Format the date
   return `${location}, ${day} ${month} ${year}`;
};
