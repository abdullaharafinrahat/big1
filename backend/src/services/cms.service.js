let memoryNews = [
  {
    id: 'NEWS-01',
    title: 'জরুরি তথ্য যাচাই করে প্রকাশ করুন — Bondhu Emergency Notice',
    category: 'alert',
    content: 'সকল ব্যবহারকারীকে জরুরি রক্তের প্রয়োজন এবং নিখোঁজ বিজ্ঞপ্তি প্রকাশের পূর্বে হটলাইনে তথ্য যাচাই করার অনুরোধ করা হচ্ছে।',
    publishedAt: '2026-08-06T09:00:00.000Z'
  },
  {
    id: 'NEWS-02',
    title: 'New ICU Wing Opened at Bondhu General Hospital',
    category: 'hospital',
    content: 'An additional 20 fully equipped ICU & CCU beds are now operational for emergency cardiac and surgical patients.',
    publishedAt: '2026-08-04T12:00:00.000Z'
  },
  {
    id: 'NEWS-03',
    title: 'Donation Tips: Hydrate, eat, and carry ID before donating blood',
    category: 'guideline',
    content: 'To ensure a safe and comfortable donation experience, drink at least 500ml of water and have a healthy snack 30 minutes prior.',
    publishedAt: '2026-08-01T08:30:00.000Z'
  }
];

export async function getAllNews() {
  return [...memoryNews];
}

export async function createNews(payload) {
  const item = {
    id: `NEWS-${String(memoryNews.length + 1).padStart(2, '0')}`,
    title: payload.title,
    category: payload.category || 'general',
    content: payload.content,
    publishedAt: new Date().toISOString()
  };
  memoryNews.unshift(item);
  return item;
}
