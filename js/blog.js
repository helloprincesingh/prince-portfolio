// js/blog.js – Fetch and display published blogs from Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://whpdqhhhdabwkoueuwkd.supabase.co";
const SUPABASE_KEY = "sb_publishable_rKjq_ASEK5HTfVkYCgFN5A_qGrkb6W-";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadBlogs() {
  const container = document.getElementById('blog-container');
  if (!container) return;

  // Loading state
  container.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:60px;color:#94a3b8;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem;"></i>
      <p style="margin-top:14px;">Loading blog posts…</p>
    </div>`;

  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch blogs:', error);
    container.innerHTML = `<p style="color:#f87171;grid-column:1/-1;text-align:center;">Failed to load blogs. Try again later.</p>`;
    return;
  }

  // Only show published (non-draft) posts
  const published = (blogs || []).filter(b => !b.title.startsWith('[DRAFT]'));

  if (published.length === 0) {
    container.innerHTML = `<p style="color:#94a3b8;grid-column:1/-1;text-align:center;">No blog posts yet. Check back soon!</p>`;
    return;
  }

  container.innerHTML = '';

  published.forEach(blog => {
    const card = document.createElement('div');
    card.className = 'blog-card';

    const date = blog.created_at
      ? new Date(blog.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
      : '';

    card.innerHTML = `
      <img class="blog-image" src="${blog.image || ''}" alt="${blog.title}" />
      <div class="blog-content">
        <span class="blog-category">${blog.category || 'General'}</span>
        <h3 class="blog-title">${blog.title}</h3>
        ${date ? `<p style="font-size:13px;color:#94a3b8;margin-bottom:10px;"><i class="fa-regular fa-calendar"></i> ${date}</p>` : ''}
        <p class="blog-description">${blog.description || ''}</p>
        <a class="blog-link" href="blog-post.html?id=${blog.id}">
          Read More <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>`;

    container.appendChild(card);
  });
}

loadBlogs();
