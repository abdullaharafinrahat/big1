export function rankDonorCandidates(candidates, requestedBloodGroup) {
  return candidates
    .map((donor) => {
      let score = 100;

      // 1. Exact match bonus (+30) vs compatible (+15)
      if (donor.bloodGroup === requestedBloodGroup) {
        score += 30;
      } else {
        score += 15;
      }

      // 2. Proximity penalty: -2 points per km
      if (donor.distanceKm != null) {
        score -= Math.min(donor.distanceKm * 2, 50);
      }

      // 3. Last donation eligibility:
      if (donor.lastDonationDate) {
        const daysAgo = (Date.now() - new Date(donor.lastDonationDate).getTime()) / (1000 * 60 * 60 * 24);
        if (daysAgo < 90) {
          score -= 100; // Not eligible
        } else {
          score += Math.min(daysAgo / 10, 20); // More rested donor bonus
        }
      } else {
        score += 10; // First-time eager donor
      }

      // 4. Response rate / verified badge
      if (donor.isVerified) score += 25;
      if (donor.badgeLevel === 'gold') score += 15;

      return {
        ...donor,
        matchScore: Math.max(0, Math.round(score))
      };
    })
    .filter((d) => d.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}
