const SUPABASE_URL = "https://whpdqhhhdabwkoueuwkd.supabase.co";
const SUPABASE_KEY = "sb_publishable_rKjq_ASEK5HTfVkYCgFN5A_qGrkb6W-";

let supabaseClient;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.error("Supabase library is not loaded. Dynamic database features are disabled.");
}

/* GLOBAL */
window.supabaseClient = supabaseClient;