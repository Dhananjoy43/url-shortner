export interface ShortlinksProps {
  id: string;
  userId: string;
  title: string;
  slug: string;
  destinationUrl: string;
  clicks: number;
  isActive: boolean;
  lastAccessedAt: string;
  createdAt: string;
}

export interface LinkDetailsPros {
  id: string;
  title: string;
  slug: string;
  destinationUrl: string;
  createdAt: string;
  clicks?: number;
}
