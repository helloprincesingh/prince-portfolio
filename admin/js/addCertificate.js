import { supabase } from "./supabase.js";

/* FORM */
const form = document.getElementById("certificate-form");

let isDraft = false;

/* DRAFT BUTTON */
const draftBtn = document.getElementById("btn-draft");

if (draftBtn) {
  draftBtn.addEventListener("click", () => {
    isDraft = true;
    form.requestSubmit();
  });
}

/* SUBMIT */
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  try {

    /* TITLE */
    const titleInput =
      document.getElementById("title")
      .value
      .trim();

    const finalTitle =
      isDraft
        ? `[DRAFT] ${titleInput}`
        : titleInput;

    /* ISSUER */
    const issuer =
      document.getElementById("issuer")
      .value
      .trim();

    /* FILES */
    const imageFile =
      document.getElementById("image")
      .files[0];

    const pdfFile =
      document.getElementById("pdf")
      .files[0];

    if (!imageFile || !pdfFile) {

      alert(
        "Please select Image and PDF"
      );

      return;

    }

    /* IMAGE NAME */
    const imageName =
      `${Date.now()}-${imageFile.name}`;

    /* PDF NAME */
    const pdfName =
      `${Date.now()}-${pdfFile.name}`;

    /* IMAGE UPLOAD */
    const {
      error: imageError
    } = await supabase
      .storage
      .from("certificates")
      .upload(
        imageName,
        imageFile
      );

    if (imageError) {

      console.log(imageError);

      alert(
        "Image Upload Failed"
      );

      return;

    }

    /* PDF UPLOAD */
    const {
      error: pdfError
    } = await supabase
      .storage
      .from("certificates")
      .upload(
        pdfName,
        pdfFile
      );

    if (pdfError) {

      console.log(pdfError);

      alert(
        "PDF Upload Failed"
      );

      return;

    }

    /* IMAGE URL */
    const {
      data: imageUrlData
    } = supabase
      .storage
      .from("certificates")
      .getPublicUrl(
        imageName
      );

    /* PDF URL */
    const {
      data: pdfUrlData
    } = supabase
      .storage
      .from("certificates")
      .getPublicUrl(
        pdfName
      );

    /* SAVE DATABASE */
    const {
      error
    } = await supabase
      .from("certificates")
      .insert([
        {
          title: finalTitle,
          issuer: issuer,
          image: imageUrlData.publicUrl,
          pdf: pdfUrlData.publicUrl
        }
      ]);

    if (error) {

      console.log(error);

      alert(
        "Certificate Upload Failed"
      );

    } else {

      alert(
        isDraft
          ? "Draft Saved 🚀"
          : "Certificate Uploaded 🚀"
      );

      form.reset();

    }

  } catch (err) {

    console.log(err);

    alert(
      "Something went wrong"
    );

  } finally {

    isDraft = false;

  }

});