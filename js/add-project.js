/* FORM */
const projectForm =

document.getElementById(
  "project-form"
);

/* SUBMIT */
projectForm.addEventListener(

  "submit",

  async (e) => {

    e.preventDefault();

    /* VALUES */
    const title =
    document.getElementById(
      "title"
    ).value;

    const description =
    document.getElementById(
      "description"
    ).value;

    const tech =
    document.getElementById(
      "tech"
    ).value;

    const github =
    document.getElementById(
      "github"
    ).value;

    const live =
    document.getElementById(
      "live"
    ).value;

    /* IMAGE */
    const imageFile =
    document.getElementById(
      "image"
    ).files[0];

    /* FILE NAME */
    const fileName =

    `${Date.now()}-${imageFile.name}`;

    /* UPLOAD IMAGE */
    const {

      data: uploadData,

      error: uploadError

    } = await supabaseClient

    .storage

    .from("project-images")

    .upload(

      fileName,

      imageFile

    );

    /* ERROR */
    if (uploadError) {

      alert(
        uploadError.message
      );

      return;

    }

    /* PUBLIC URL */
    const {

      data: publicData

    } = supabaseClient

    .storage

    .from("project-images")

    .getPublicUrl(fileName);

    /* IMAGE URL */
    const imageUrl =
    publicData.publicUrl;

    /* SAVE DATABASE */
    const {

      error

    } = await supabaseClient

    .from("projects")

    .insert([

      {

        title,

        description,

        image: imageUrl,

        tech,

        github,

        live

      }

    ]);

    /* SUCCESS */
    if (!error) {

      alert(
        "Project Uploaded 🚀"
      );

      projectForm.reset();

    }

    else {

      alert(
        error.message
      );

    }

  }
);