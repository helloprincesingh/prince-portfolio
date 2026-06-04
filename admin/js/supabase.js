import {

  createClient

} from

"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* URL */
const supabaseUrl =

"https://whpdqhhhdabwkoueuwkd.supabase.co";

/* KEY */
const supabaseKey =

"sb_publishable_rKjq_ASEK5HTfVkYCgFN5A_qGrkb6W-";

/* CLIENT */
export const supabase =

createClient(

  supabaseUrl,

  supabaseKey

);