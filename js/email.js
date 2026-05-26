/* EMAILJS INIT */

emailjs.init("Z-DMXJjqmyQhMQiGY");

/* FORM */
const form =
document.getElementById(
  "contact-form"
);

if (form) {
  form.addEventListener("submit",(e)=>{

    e.preventDefault();

    /* DATA */
    const params = {

      from_name:
      document.getElementById("name").value,

      email:
      document.getElementById("email").value,

      message:
      document.getElementById("message").value

    };

    /* SEND */
    emailjs.send(

      "service_i66afzq",

      "template_yteelry",

      params

    )

    .then(()=>{

      alert(
        "Message sent successfully 🚀"
      );

      form.reset();

    })

    .catch((error)=>{

      alert(
        "Something went wrong!"
      );

      console.log(error);

    });

  });
}