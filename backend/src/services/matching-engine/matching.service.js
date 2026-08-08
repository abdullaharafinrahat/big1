import { getAllowedDonorGroups } from '../../shared/blood-compatibility.js';
import { filterByRadius } from './geo-index.service.js';
import { rankDonorCandidates } from './ranking.service.js';

export async function matchDonorsForRequest(request, donorPool) {
  const allowedGroups = getAllowedDonorGroups(request.bloodGroup);

  // Filter pool by compatible blood group, active status, availability
  const compatibleDonors = donorPool.filter((d) => {
    return (
      allowedGroups.includes(d.bloodGroup) &&
      d.isAvailable !== false &&
      d.isActive !== false
    );
  });

  // Filter by geographical distance if coordinates are present
  let filtered = compatibleDonors;
  if (request.latitude && request.longitude) {
    filtered = filterByRadius(compatibleDonors, request.latitude, request.longitude, request.maxRadiusKm || 30);
  }

  // Rank and prioritize candidates
  const ranked = rankDonorCandidates(filtered, request.bloodGroup);

  return {
    requestId: request.id,
    bloodGroupRequested: request.bloodGroup,
    unitsRequested: request.unitsCount || 1,
    compatibleGroups: allowedGroups,
    totalEligibleFound: ranked.length,
    matches: ranked.slice(0, 15) // Top 15 best matches
  };
}
