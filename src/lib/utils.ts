import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slufigy from "slugify";
import { randomUUID } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createChallengeSlug = (input: string) =>
  slufigy(input, {
    lower: true,
    strict: true,
    trim: true,
    replacement: "-",
  }) + randomUUID().split("-")[0];
