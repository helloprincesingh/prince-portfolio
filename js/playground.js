/* ELEMENTS */

const htmlCode = document.getElementById(
  "html-code"
);

const cssCode = document.getElementById(
  "css-code"
);

const jsCode = document.getElementById(
  "js-code"
);

const runBtn = document.getElementById(
  "run-btn"
);

const output = document.getElementById(
  "output"
);

/* RUN FUNCTION */
function runCode(){

  const html =
  htmlCode.value;

  const css =
  "<style>" +
  cssCode.value +
  "</style>";

  const js =
  "<script>" +
  jsCode.value +
  "</script>";

  output.srcdoc =

  html +
  css +
  js;

}

/* CLICK */
runBtn.addEventListener(
  "click",
  runCode
);

/* AUTO RUN */
runCode();