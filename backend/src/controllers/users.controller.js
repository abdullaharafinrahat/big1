export async function getProfile(req, res) {
  res.json({
    success: true,
    data: {
      id: 'USR-2026-08819',
      name: 'MD. Shariful Islam',
      phone: '01712345678',
      bloodGroup: 'O+',
      isVerified: true,
      totalDonations: 8,
      lastDonationDate: '2026-04-14',
      badge: 'Verified Golden Donor'
    }
  });
}

export async function updateProfile(req, res) {
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: { ...req.body, updatedAt: new Date().toISOString() }
  });
}
