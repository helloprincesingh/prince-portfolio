// js/certificates.js – Fetch and display certificates from Supabase on about.html
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://whpdqhhhdabwkoueuwkd.supabase.co";
const SUPABASE_KEY = "sb_publishable_rKjq_ASEK5HTfVkYCgFN5A_qGrkb6W-";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadCertificates() {
  const grid = document.getElementById('certificate-grid');
  if (!grid) return;

  const { data: certs, error } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch certificates:', error);
    grid.innerHTML = `<p style="color:#f87171;grid-column:1/-1;text-align:center;">Failed to load certificates. Please try again later.</p>`;
    return;
  }

  // Filter out drafts
  const published = (certs || []).filter(c => !c.title.startsWith('[DRAFT]'));

  if (published.length === 0) {
    grid.innerHTML = `<p style="color:#94a3b8;grid-column:1/-1;text-align:center;">No certificates uploaded yet.</p>`;
    return;
  }

  grid.innerHTML = '';

  published.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'certificate-card';

    // Determine the view link (PDF or image)
    const viewUrl = cert.pdf || cert.image || '#';

    card.innerHTML = `
      <div class="certificate-image">
        <img src="${cert.image || ''}" alt="${cert.title}" />
      </div>
      <div class="certificate-content">
        <h2>${cert.title}</h2>
        ${cert.issuer ? `<p style="color:#a78bfa;font-size:14px;margin-bottom:8px;"><i class="fa-solid fa-building"></i> ${cert.issuer}</p>` : ''}
        ${cert.description ? `<p>${cert.description}</p>` : ''}
        <a href="${viewUrl}" class="btn" target="_blank" rel="noopener">
          <i class="fa-solid fa-eye"></i> View Certificate
        </a>
      </div>`;

    grid.appendChild(card);
  });
}

loadCertificates();
