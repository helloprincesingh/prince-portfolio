/* GITHUB API */

const username =
"helloprincesingh";

/* ELEMENTS */
const avatar =
document.getElementById(
  "github-avatar"
);

const nameEl =
document.getElementById(
  "github-name"
);

const bioEl =
document.getElementById(
  "github-bio"
);

const repoCount =
document.getElementById(
  "repo-count"
);

const followers =
document.getElementById(
  "followers"
);

const following =
document.getElementById(
  "following"
);

const repoGrid =
document.getElementById(
  "repoGrid"
);

if (avatar && nameEl && bioEl && repoCount && followers && following && repoGrid) {

/* FETCH PROFILE */
fetch(
  `https://api.github.com/users/${username}`
)

.then((res)=>res.json())

.then((data)=>{

  avatar.src =
  data.avatar_url;

  nameEl.textContent =
  data.name;

  bioEl.textContent =
  data.bio;

  repoCount.textContent =
  data.public_repos;

  followers.textContent =
  data.followers;

  following.textContent =
  data.following;

});

/* FETCH REPOS */
fetch(
  `https://api.github.com/users/${username}/repos`
)

.then((res)=>res.json())

.then((repos)=>{

  repos
  .slice(0,6)

  .forEach((repo)=>{

    const card =
    document.createElement("div");

    card.classList.add(
      "repo-card"
    );

    card.innerHTML = `

      <h3>
        ${repo.name}
      </h3>

      <p>
        ${
          repo.description ||
          "No description available."
        }
      </p>

      <a
        href="${repo.html_url}"
        target="_blank"
      >
        View Repository →
      </a>

    `;

    repoGrid.appendChild(card);

  });

});

}