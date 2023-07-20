
import { User, Listing, Store, StoreItem } from '@prisma/client';


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeStore = Omit<
  Store,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeStoreItem = Omit<
  StoreItem,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeListing = Omit<
  Listing,
  "createdAt"
> & {
  createdAt: string;
};
