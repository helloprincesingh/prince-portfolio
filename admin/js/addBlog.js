import { supabase } from "./supabase.js";

/* FORM */
const form = document.getElementById("blog-form");
const btnDraft = document.getElementById("btn-draft");

// SAVE BLOG FUNCTION
async function saveBlog(e, isDraft) {
  if (e) e.preventDefault();

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  /* FILE */
  const file = document.getElementById("image").files[0];
  if (!file) {
    alert("Please select a blog image.");
    return;
  }

  // Disable buttons
  const btnPublish = document.getElementById("btn-publish");
  btnPublish.disabled = true;
  btnDraft.disabled = true;
  const originalPublishText = btnPublish.textContent;
  btnPublish.textContent = "Uploading...";

  try {
    /* FILE NAME */
    const fileName = Date.now() + "-" + file.name;

    /* UPLOAD IMAGE */
    const { error: imageError } = await supabase
      .storage
      .from("blog-images")
      .upload(fileName, file);

    /* ERROR */
    if (imageError) {
      console.log(imageError);
      alert(`Image Upload Failed: ${imageError.message}`);
      return;
    }

    /* GET URL */
    const { data: urlData } = supabase
      .storage
      .from("blog-images")
      .getPublicUrl(fileName);

    /* IMAGE URL */
    const imageUrl = urlData.publicUrl;

    const title = document.getElementById("title").value;
    const finalTitle = isDraft ? `[DRAFT] ${title}` : title;

    /* INSERT BLOG */
    const { error } = await supabase
      .from("blogs")
      .insert([{
        title: finalTitle,
        category: document.getElementById("category").value,
        image: imageUrl,
        description: document.getElementById("description").value,
        content: document.getElementById("content").value
      }]);

    /* RESULT */
    if (error) {
      console.log(error);
      alert(`Blog Upload Failed: ${error.message}`);
    } else {
      alert(isDraft ? "Blog saved as Draft! 📁" : "Blog Uploaded & Published! 🚀");
      form.reset();
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  } finally {
    btnPublish.disabled = false;
    btnDraft.disabled = false;
    btnPublish.textContent = originalPublishText;
  }
}

// EVENTS
form.addEventListener("submit", (e) => saveBlog(e, false));
btnDraft.addEventListener("click", (e) => saveBlog(e, true));