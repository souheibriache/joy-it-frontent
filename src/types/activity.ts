import type { OrderOptionsDto, PageDto } from "./order";

export enum ActivityType {
  BIEN_ETRE = "BIEN_ETRE",
  TEAM_BUILDING = "TEAM_BUILDING",
  NOURRITURE = "NOURRITURE",
}

export type CreateActivityDto = {
  name: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  locationUrl: string;
  duration: number; // Duration in hours
  creditCost: number;
  mainImageIndex?: number; // Optional
  isAvailable?: boolean; // Optional
  categories: ActivityType[];
  keyWords: string[];
};

export type UpdateActivityDto = Partial<CreateActivityDto>;

export type UpdateActivityMainImageDto = {
  imageId: string;
};

// Updated to match backend expectations
export type ActivityFilterDto = {
  search?: string | null;
  type?: ActivityType | null; // Changed from types to type
  durationMin?: number | null;
  durationMax?: number | null;
  isAvailable?: boolean | null;
};

// Updated to match backend expectations
export type ActivityOptionsDto = {
  page: number | null;
  take: number | null;
  search?: string | null;
  type?: ActivityType | null; // Changed from types to type
  durationMin?: number | null;
  durationMax?: number | null;
  isAvailable?: boolean | null;
  sort?: OrderOptionsDto | null; // Sorting options
};

export type Activity = {
  id: string;
  name: string;
  description: string;
  address: string;
  postalCode: string;
  city: string;
  locationUrl: string;
  duration: number;
  creditCost: number;
  mainImageIndex: number;
  isAvailable: boolean;
  categories: ActivityType[];
  keyWords: string[];
  images: string[]; // Array of image URLs or IDs
  createdAt: string;
  updatedAt: string;
};

export type ActivitySearchResponse = PageDto<Activity>;
