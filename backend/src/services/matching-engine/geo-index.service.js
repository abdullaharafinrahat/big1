import { calculateDistanceKm } from '../../shared/distance.util.js';

export function filterByRadius(candidates, centerLat, centerLon, maxRadiusKm = 25) {
  return candidates
    .map((c) => {
      const distanceKm = calculateDistanceKm(centerLat, centerLon, c.latitude, c.longitude);
      return { ...c, distanceKm };
    })
    .filter((c) => c.distanceKm != null && c.distanceKm <= maxRadiusKm);
}
