

// Function to convert degrees to radians
function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  // Function to convert radians to degrees
  function toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }
  
  // Function to calculate the bounding box
  export default function calculateBoundingBox(latitude: number, longitude: number, distance: number): any {
    const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers
  
    // Convert distance from kilometers to radians
    const distanceRadians = distance / EARTH_RADIUS_KM;
  
    // Convert latitude and longitude to radians
    const latRadians = toRadians(latitude);
    const lonRadians = toRadians(longitude);
  
    // Calculate minimum latitude and longitude
    const minLat = toDegrees(latRadians - distanceRadians);
    const minLon = toDegrees(lonRadians - distanceRadians / Math.cos(latRadians));
  
    // Calculate maximum latitude and longitude
    const maxLat = toDegrees(latRadians + distanceRadians);
    const maxLon = toDegrees(lonRadians + distanceRadians / Math.cos(latRadians));
  
    return {
      minLatitude: minLat,
      minLongitude: minLon,
      maxLatitude: maxLat,
      maxLongitude: maxLon,
    };
  }