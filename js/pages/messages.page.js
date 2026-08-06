(() => {
  const A = window.BondhuApp;
  if (!A) return;
  const $ = A.$;
  A.setupShell('messages');

  function trackingHref(alert) {
    return `blood-tracking.html?id=${encodeURIComponent(alert.trackingId || '')}`;
  }

  function renderMessages() {
    const alerts = A.getMatchingAlerts();
    const list = $('#message-list');
    if (!list) return;
    if (!alerts.length) {
      list.innerHTML = '<p class="empty-state">No matching blood request messages yet.</p>';
      return;
    }
    list.innerHTML = alerts.map((alert) => `
      <article class="message-card ${alert.read ? '' : 'unread'}" data-alert-id="${alert.id}">
        <div class="message-card-head">
          <strong>${alert.read ? 'Blood Request SMS' : 'New Blood Request SMS'}</strong>
          <small>${new Date(alert.createdAt).toLocaleString('bn-BD')}</small>
        </div>
        ${A.smsMarkup(alert)}
        <div class="button-row">
          <a class="btn soft" href="${trackingHref(alert)}">Open Tracking Page</a>
          <button class="btn primary donor-respond" type="button" data-id="${alert.id}">I can donate</button>
        </div>
      </article>
    `).join('');
  }

  $('#mark-all-read')?.addEventListener('click', () => {
    A.markAlertsRead();
    renderMessages();
    A.toast('All messages marked read');
  });

  document.addEventListener('click', (event) => {
    const respond = event.target.closest('.donor-respond');
    if (respond) {
      const alerts = A.getAlerts().map((alert) => alert.id === respond.dataset.id ? { ...alert, read: true, responded: true, respondedAt: new Date().toISOString() } : alert);
      A.setAlerts(alerts);
      A.renderNotificationBadges();
      renderMessages();
      A.toast('Your donor response has been sent');
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'bondhu.donorAlerts') renderMessages();
  });
  window.addEventListener('bondhu:alerts-updated', renderMessages);
  renderMessages();
})();
