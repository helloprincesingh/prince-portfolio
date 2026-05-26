/* VISITOR COUNTER */

const visitorCount =
document.getElementById(
  "visitor-count"
);

if (visitorCount) {

  /* LOCAL STORAGE COUNTER */
  let count =
  parseInt(
    localStorage.getItem("visitorCount") || "0"
  );

  /* INCREMENT ON NEW SESSION */
  if (!sessionStorage.getItem("visited")) {

    count++;

    localStorage.setItem(
      "visitorCount",
      count
    );

    sessionStorage.setItem(
      "visited",
      "true"
    );

  }

  visitorCount.textContent = count;

}