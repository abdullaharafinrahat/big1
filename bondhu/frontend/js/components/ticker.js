export function initTicker(root=document){root.querySelectorAll('[data-ticker]').forEach(e=>{if(!e.dataset.ready){e.dataset.ready='1';e.innerHTML+=e.innerHTML}})}
