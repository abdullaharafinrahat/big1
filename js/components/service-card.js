export function createServiceCard({ icon = '🤝', image = '', alt = '', title, description, href }) {
  const article = document.createElement('article');
  article.className = 'service-card';
  const media = image
    ? `<img class="service-icon-img" src="${image}" alt="${alt || `${title} icon`}" loading="lazy">`
    : `<span class="service-card-emoji" aria-hidden="true">${icon}</span>`;
  article.innerHTML = `${media}<h3>${title}</h3><p>${description}</p><a href="${href}">Open</a>`;
  return article;
}
