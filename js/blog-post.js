// js/blog-post.js – Fetch and render a single blog post by ?id=
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = "https://whpdqhhhdabwkoueuwkd.supabase.co";
const SUPABASE_KEY = "sb_publishable_rKjq_ASEK5HTfVkYCgFN5A_qGrkb6W-";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadPost() {
  const root = document.getElementById('post-root');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    root.innerHTML = `<div class="post-error"><i class="fa-solid fa-triangle-exclamation"></i><p>No blog post specified.</p><a href="blog.html" class="post-back"><i class="fa-solid fa-arrow-left"></i> Back to Blog</a></div>`;
    return;
  }

  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !blog) {
    root.innerHTML = `<div class="post-error"><i class="fa-solid fa-triangle-exclamation"></i><p>Blog post not found.</p><a href="blog.html" class="post-back"><i class="fa-solid fa-arrow-left"></i> Back to Blog</a></div>`;
    return;
  }

  // Update page title
  document.title = `${blog.title.replace(/^\[DRAFT\]\s*/,'')} | Prince Kumar`;

  // Format date
  const date = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })
    : '';

  root.innerHTML = `
    <a href="blog.html" class="post-back">
      <i class="fa-solid fa-arrow-left"></i> Back to Blog
    </a>

    ${blog.image ? `<img class="post-hero" src="${blog.image}" alt="${blog.title}" />` : ''}

    <span class="post-category">${blog.category || 'General'}</span>

    <h1 class="post-title">${blog.title.replace(/^\[DRAFT\]\s*/, '')}</h1>

    <div class="post-meta">
      ${date ? `<span><i class="fa-regular fa-calendar"></i> ${date}</span>` : ''}
      ${blog.category ? `<span><i class="fa-solid fa-tag"></i> ${blog.category}</span>` : ''}
    </div>

    ${blog.description ? `<p class="post-description">${blog.description}</p>` : ''}

    <div class="post-content">${blog.content || ''}</div>
  `;
}

loadPost();
