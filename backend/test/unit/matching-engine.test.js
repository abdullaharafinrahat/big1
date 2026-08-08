import test from 'node:test';
import assert from 'node:assert/strict';
import { isBloodCompatible, getAllowedDonorGroups } from '../../src/shared/blood-compatibility.js';
import { calculateDistanceKm } from '../../src/shared/distance.util.js';
import { rankDonorCandidates } from '../../src/services/matching-engine/ranking.service.js';

test('Blood compatibility matrix returns valid donor pools', () => {
  // O- can donate to anyone
  assert.equal(isBloodCompatible('A+', 'O-'), true);
  assert.equal(isBloodCompatible('O+', 'O-'), true);
  assert.equal(isBloodCompatible('AB-', 'O-'), true);

  // O+ can only receive from O+ and O-
  assert.equal(isBloodCompatible('O+', 'A+'), false);
  assert.equal(isBloodCompatible('O+', 'B+'), false);
  assert.equal(isBloodCompatible('O+', 'O+'), true);

  // AB+ universal recipient
  const abPositiveAllowed = getAllowedDonorGroups('AB+');
  assert.equal(abPositiveAllowed.length, 8);
});

test('Haversine distance calculation is accurate', () => {
  // Distance between Dhanmondi (23.7465, 90.3760) and Mirpur-10 (23.8067, 90.3687) ~ 6.7 km
  const distance = calculateDistanceKm(23.7465, 90.3760, 23.8067, 90.3687);
  assert.ok(distance > 6.0 && distance < 8.0, `Expected ~6.7km, got ${distance}`);
});

test('Ranking service ranks closest exact match highest', () => {
  const candidates = [
    { id: '1', bloodGroup: 'O+', distanceKm: 15, isVerified: true, badgeLevel: 'bronze' },
    { id: '2', bloodGroup: 'A+', distanceKm: 2, isVerified: true, badgeLevel: 'gold' }
  ];
  const ranked = rankDonorCandidates(candidates, 'A+');
  assert.equal(ranked[0].id, '2'); // Exact match, closer distance, gold badge
});
