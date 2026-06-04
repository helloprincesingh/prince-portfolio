/* FORM */
const projectForm = document.getElementById("project-form");
const btnDraft = document.getElementById("btn-draft");

// MAIN SUBMIT FUNCTION
async function saveProject(e, isDraft) {
  if (e) e.preventDefault();

  // Validate form manually if triggered by draft button
  if (!projectForm.checkValidity()) {
    projectForm.reportValidity();
    return;
  }

  // Get values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const tech = document.getElementById("tech").value;
  const github = document.getElementById("github").value;
  const live = document.getElementById("live").value;
  const imageFile = document.getElementById("image").files[0];

  // Disable buttons while uploading
  const btnPublish = document.getElementById("btn-publish");
  btnPublish.disabled = true;
  btnDraft.disabled = true;
  const originalPublishText = btnPublish.textContent;
  btnPublish.textContent = "Uploading...";

  try {
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }

    /* FILE NAME */
    const fileName = `${Date.now()}-${imageFile.name}`;

    /* UPLOAD IMAGE */
    const { data: uploadData, error: uploadError } = await supabaseClient
      .storage
      .from("project-images")
      .upload(fileName, imageFile);

    /* ERROR */
    if (uploadError) {
      alert(`Upload Error: ${uploadError.message}`);
      return;
    }

    /* PUBLIC URL */
    const { data: publicData } = supabaseClient
      .storage
      .from("project-images")
      .getPublicUrl(fileName);

    const imageUrl = publicData.publicUrl;

    /* DRAFT FLAG WORKAROUND */
    const finalTitle = isDraft ? `[DRAFT] ${title}` : title;

    /* SAVE DATABASE */
    const { error } = await supabaseClient
      .from("projects")
      .insert([
        {
          title: finalTitle,
          description,
          image: imageUrl,
          tech,
          github,
          live
        }
      ]);

    /* SUCCESS */
    if (!error) {
      alert(isDraft ? "Project saved as Draft! 📁" : "Project Uploaded & Published! 🚀");
      projectForm.reset();
    } else {
      alert(`Database Error: ${error.message}`);
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
projectForm.addEventListener("submit", (e) => saveProject(e, false));
btnDraft.addEventListener("click", (e) => saveProject(e, true));