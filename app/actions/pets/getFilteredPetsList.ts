import prisma from "@/app/libs/prismadb";
import { de } from "date-fns/locale";
import { m } from "framer-motion";
import calculateBoundingBox from "../../utils/CalculateDistance";

interface IParams {
  user_input: string[];
}

export default async function getFilteredPetsList(params: IParams) {
  try {
    const { user_input } = params;

    const long = user_input.pop()
    const lat = user_input.pop()
    const maxLocation = user_input.pop()
    const maxPrice = user_input.pop()

    const price = maxPrice ? parseInt(maxPrice, 10) : 100
    const location = maxLocation ? parseInt(maxLocation, 10) : 10000
    const longitude = long ? parseFloat(long) : 0
    const latitude = lat ? parseFloat(lat) : 0

    // console.log("maxPrice", price);
    // console.log("maxLocation", location);
    // console.log("latitude", latitude);
    // console.log("longitude", longitude);

    // console.log("user_input", user_input);

    const filters: { [key: string]: any }[] = user_input
      ?.filter((input) => input !== "all")
      .map((input) => ({
        OR: [
          {
            kind: {
              contains: input,
              mode: "insensitive",
            },
          },
          {
            breed: {
              contains: input,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: input,
              mode: "insensitive",
            },
          },
          {
            gender: {
              contains: input,
              mode: "insensitive",
            },
          }
        ],
      }));

    const priceFilter = maxPrice
      ? {
          price: {
            lte: price,
          },
        }
      : {};

    const results = calculateBoundingBox(latitude, longitude, location)
    console.log("results", results);

    const locationFilter = maxLocation
      ? {
        latitude: {
          gte: results.minLatitude,
          lte: results.maxLatitude,
        },
        longitude: {
          gte: results.minLongitude,
          lte: results.maxLongitude,
        },
      } : {};

    let listings;
 
    listings = await prisma.listing.findMany({
      where: {
        AND: [
          ...(filters || []),
          priceFilter,
          // locationFilter
        ],
      },
    });

    const safeListings = listings?.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
