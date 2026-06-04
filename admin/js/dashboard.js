console.log("Dashboard Loaded Successfully");

import { supabase } from "./supabase.js";

// STATE
let currentTab = "projects";
let itemsList = [];
let editingItem = null;
let deletingItem = null;

// DOM ELEMENTS
const historyList = document.getElementById("history-list");
const tabButtons = document.querySelectorAll(".tab-btn");

// MODALS
const editModal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");
const previewModal = document.getElementById("previewModal");
const editForm = document.getElementById("editForm");
const editModalTitle = document.getElementById("editModalTitle");

// BUTTONS
const btnSaveEdit = document.getElementById("btnSaveEdit");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");

// GLOBAL CLOSE LISTENERS
function setupModalClose(modalId, btnCloseId, btnCancelId) {
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(btnCloseId);
  const cancelBtn = document.getElementById(btnCancelId);

  const close = () => {
    modal.classList.remove("active");
  };

  if (closeBtn) closeBtn.addEventListener("click", close);
  if (cancelBtn) cancelBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
}

// SETUP MODAL CLOSE HANDLERS
setupModalClose("editModal", "btnCloseEdit", "btnCancelEdit");
setupModalClose("deleteModal", "btnCloseDelete", "btnCancelDelete");
setupModalClose("previewModal", "btnClosePreview", "btnCancelPreview");

// EXPOSE CLOSE METHOD GLOBALLY
window.closeModal = (id) => {
  document.getElementById(id).classList.remove("active");
};

// TAB SWITCHING
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentTab = btn.dataset.tab;
    loadHistory();
  });
});

// LOAD HISTORY FROM SUPABASE
async function loadHistory() {
  historyList.innerHTML = '<p class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i> Loading history...</p>';

  try {
    const { data, error } = await supabase
      .from(currentTab)
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      historyList.innerHTML = `<p class="empty-state" style="color: #ef4444;">Error: ${error.message}</p>`;
      return;
    }

    itemsList = data || [];

    if (itemsList.length === 0) {
      historyList.innerHTML = `<p class="empty-state">No uploaded ${currentTab} found.</p>`;
      return;
    }

    renderHistory();
  } catch (err) {
    console.error(err);
    historyList.innerHTML = `<p class="empty-state" style="color: #ef4444;">Connection failed.</p>`;
  }
}

// RENDER HISTORY ITEMS
function renderHistory() {
  historyList.innerHTML = "";

  itemsList.forEach((item) => {
    const isDraft = (item.title || "").startsWith("[DRAFT]");
    const displayTitle = isDraft
      ? item.title.replace(/^\[DRAFT\]\s*/, "")
      : item.title || "Untitled";

    // Item image or placeholder
    const imgUrl = item.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

    // Dynamic metadata depending on tab
    let metaHTML = "";
    if (currentTab === "projects") {
      metaHTML = `
        <span><i class="fa-solid fa-laptop-code"></i> ${item.tech || "N/A"}</span>
      `;
    } else if (currentTab === "blogs") {
      metaHTML = `
        <span><i class="fa-solid fa-tag"></i> ${item.category || "General"}</span>
      `;
    } else if (currentTab === "certificates") {
      metaHTML = `
        <span><i class="fa-solid fa-building"></i> ${item.issuer || "N/A"}</span>
      `;
    }

    // Add Date
    const dateStr = item.created_at
      ? new Date(item.created_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Unknown date";
    metaHTML += `<span><i class="fa-solid fa-calendar-day"></i> ${dateStr}</span>`;

    const itemCard = document.createElement("div");
    itemCard.className = "history-item";
    itemCard.innerHTML = `
      <div class="item-left">
        <img class="item-img" src="${imgUrl}" alt="${displayTitle}" />
        <div class="item-details">
          <h3>${displayTitle}</h3>
          <div class="item-meta">
            <span class="badge ${isDraft ? "draft" : "published"}">${isDraft ? "Draft" : "Published"}</span>
            ${metaHTML}
          </div>
        </div>
      </div>
      <div class="item-right">
        <!-- Toggle Status -->
        <button class="action-btn status" title="${isDraft ? "Publish" : "Save as Draft"}" data-id="${item.id}">
          <i class="fa-solid ${isDraft ? "fa-circle-check" : "fa-circle-minus"}"></i>
        </button>
        <!-- Preview -->
        <button class="action-btn preview" title="Live Preview" data-id="${item.id}">
          <i class="fa-solid fa-eye"></i>
        </button>
        <!-- Edit -->
        <button class="action-btn edit" title="Edit" data-id="${item.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
        <!-- Delete -->
        <button class="action-btn delete" title="Delete" data-id="${item.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    // ATTACH ACTION HANDLERS
    itemCard.querySelector(".status").addEventListener("click", () => toggleStatus(item));
    itemCard.querySelector(".preview").addEventListener("click", () => openPreviewModal(item));
    itemCard.querySelector(".edit").addEventListener("click", () => openEditModal(item));
    itemCard.querySelector(".delete").addEventListener("click", () => openDeleteModal(item));

    historyList.appendChild(itemCard);
  });
}

// TOGGLE DRAFT / PUBLISH
async function toggleStatus(item) {
  const isDraft = (item.title || "").startsWith("[DRAFT]");
  const cleanTitle = isDraft ? item.title.replace(/^\[DRAFT\]\s*/, "") : item.title || "";
  const newTitle = isDraft ? cleanTitle : `[DRAFT] ${cleanTitle}`;

  try {
    const { error } = await supabase
      .from(currentTab)
      .update({ title: newTitle })
      .eq("id", item.id);

    if (error) {
      alert(`Error toggling status: ${error.message}`);
    } else {
      loadHistory();
    }
  } catch (err) {
    alert("Connection error.");
  }
}

// OPEN DELETE MODAL
function openDeleteModal(item) {
  deletingItem = item;
  deleteModal.classList.add("active");
}

// CONFIRM DELETION
btnConfirmDelete.addEventListener("click", async () => {
  if (!deletingItem) return;

  btnConfirmDelete.disabled = true;
  btnConfirmDelete.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Deleting...';

  try {
    const { error } = await supabase
      .from(currentTab)
      .delete()
      .eq("id", deletingItem.id);

    if (error) {
      alert(`Error deleting: ${error.message}`);
    } else {
      deleteModal.classList.remove("active");
      loadHistory();
    }
  } catch (err) {
    alert("Deletion failed due to network error.");
  } finally {
    btnConfirmDelete.disabled = false;
    btnConfirmDelete.textContent = "Delete";
  }
});

// OPEN EDIT MODAL
function openEditModal(item) {
  editingItem = item;
  editModalTitle.textContent = `Edit ${currentTab.charAt(0).toUpperCase() + currentTab.slice(1, -1)}`;

  const isDraft = (item.title || "").startsWith("[DRAFT]");
  const cleanTitle = isDraft ? item.title.replace(/^\[DRAFT\]\s*/, "") : item.title || "";

  // Render dynamic form fields based on tab
  if (currentTab === "projects") {
    editForm.innerHTML = `
      <label for="edit-title">Project Title</label>
      <input type="text" id="edit-title" value="${cleanTitle}" required />
      
      <label for="edit-description">Description</label>
      <textarea id="edit-description" required>${item.description || ""}</textarea>
      
      <label for="edit-tech">Tech Stack (comma separated)</label>
      <input type="text" id="edit-tech" value="${item.tech || ""}" required />
      
      <label for="edit-github">GitHub URL</label>
      <input type="url" id="edit-github" value="${item.github || ""}" />
      
      <label for="edit-live">Live URL</label>
      <input type="url" id="edit-live" value="${item.live || ""}" />
      
      <label for="edit-image">Replace Image (optional)</label>
      <input type="file" id="edit-image" accept="image/*" />
    `;
  } else if (currentTab === "blogs") {
    editForm.innerHTML = `
      <label for="edit-title">Blog Title</label>
      <input type="text" id="edit-title" value="${cleanTitle}" required />
      
      <label for="edit-category">Category</label>
      <input type="text" id="edit-category" value="${item.category || ""}" required />
      
      <label for="edit-description">Short Description</label>
      <textarea id="edit-description" required>${item.description || ""}</textarea>
      
      <label for="edit-content">Full Content</label>
      <textarea id="edit-content" style="min-height: 200px;" required>${item.content || ""}</textarea>
      
      <label for="edit-image">Replace Image (optional)</label>
      <input type="file" id="edit-image" accept="image/*" />
    `;
  } else if (currentTab === "certificates") {
    editForm.innerHTML = `
      <label for="edit-title">Certificate Title</label>
      <input type="text" id="edit-title" value="${cleanTitle}" required />
      
      <label for="edit-issuer">Issuer</label>
      <input type="text" id="edit-issuer" value="${item.issuer || ""}" required />
      
      <label for="edit-image">Replace Image (optional)</label>
      <input type="file" id="edit-image" accept="image/*" />
      
      <label for="edit-pdf">Replace PDF (optional)</label>
      <input type="file" id="edit-pdf" accept="application/pdf" />
    `;
  }

  editModal.classList.add("active");
}

// SAVE EDITS
btnSaveEdit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (!editingItem) return;

  // Validate form
  if (!editForm.checkValidity()) {
    editForm.reportValidity();
    return;
  }

  btnSaveEdit.disabled = true;
  btnSaveEdit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

  try {
    const isDraft = (editingItem.title || "").startsWith("[DRAFT]");
    const inputTitle = document.getElementById("edit-title").value;
    const finalTitle = isDraft ? `[DRAFT] ${inputTitle}` : inputTitle;

    const payload = {};

    // 1. DYNAMIC FIELDS
    if (currentTab === "projects") {
      payload.title = finalTitle;
      payload.description = document.getElementById("edit-description").value;
      payload.tech = document.getElementById("edit-tech").value;
      payload.github = document.getElementById("edit-github").value;
      payload.live = document.getElementById("edit-live").value;

      // Image upload
      const imgFile = document.getElementById("edit-image").files[0];
      if (imgFile) {
        const fileName = `${Date.now()}-${imgFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, imgFile);
        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: publicData } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);
        payload.image = publicData.publicUrl;
      }
    } else if (currentTab === "blogs") {
      payload.title = finalTitle;
      payload.category = document.getElementById("edit-category").value;
      payload.description = document.getElementById("edit-description").value;
      payload.content = document.getElementById("edit-content").value;

      // Image upload
      const imgFile = document.getElementById("edit-image").files[0];
      if (imgFile) {
        const fileName = `${Date.now()}-${imgFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(fileName, imgFile);
        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: publicData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(fileName);
        payload.image = publicData.publicUrl;
      }
    } else if (currentTab === "certificates") {
      payload.title = finalTitle;
      payload.issuer = document.getElementById("edit-issuer").value;

      // Image upload
      const imgFile = document.getElementById("edit-image").files[0];
      if (imgFile) {
        const fileName = `${Date.now()}-${imgFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("certificates")
          .upload(fileName, imgFile);
        if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`);

        const { data: publicData } = supabase.storage
          .from("certificates")
          .getPublicUrl(fileName);
        payload.image = publicData.publicUrl;
      }

      // PDF upload
      const pdfFile = document.getElementById("edit-pdf").files[0];
      if (pdfFile) {
        const fileName = `${Date.now()}-${pdfFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("certificates")
          .upload(fileName, pdfFile);
        if (uploadError) throw new Error(`PDF upload failed: ${uploadError.message}`);

        const { data: publicData } = supabase.storage
          .from("certificates")
          .getPublicUrl(fileName);
        payload.pdf = publicData.publicUrl;
      }
    }

    // 2. DB UPDATE
    const { error } = await supabase
      .from(currentTab)
      .update(payload)
      .eq("id", editingItem.id);

    if (error) {
      alert(`Update failed: ${error.message}`);
    } else {
      editModal.classList.remove("active");
      loadHistory();
    }
  } catch (err) {
    alert(err.message || "An error occurred while saving changes.");
  } finally {
    btnSaveEdit.disabled = false;
    btnSaveEdit.textContent = "Save Changes";
  }
});

// OPEN PREVIEW MODAL
function openPreviewModal(item) {
  const previewContainer = document.getElementById("previewContainer");
  previewContainer.innerHTML = "";

  const isDraft = (item.title || "").startsWith("[DRAFT]");
  const cleanTitle = isDraft ? item.title.replace(/^\[DRAFT\]\s*/, "") : item.title || "Untitled";
  const imgUrl = item.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

  if (currentTab === "projects") {
    const techSpans = (item.tech || "")
      .split(",")
      .filter((t) => t.trim() !== "")
      .map((t) => `<span>${t.trim()}</span>`)
      .join("");

    previewContainer.innerHTML = `
      <div class="project-card">
        <div class="project-image">
          <img src="${imgUrl}" alt="${cleanTitle}" />
        </div>
        <div class="project-content">
          <h2>${cleanTitle}</h2>
          <p>${item.description || "No description provided."}</p>
          <div class="tech-stack">${techSpans || "<span>No tech listed</span>"}</div>
          <div class="project-buttons">
            ${
              item.live
                ? `<a href="${item.live}" target="_blank" class="btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`
                : ""
            }
            ${
              item.github
                ? `<a href="${item.github}" target="_blank" class="icon-btn"><i class="fa-brands fa-github"></i></a>`
                : ""
            }
          </div>
        </div>
      </div>
    `;
  } else if (currentTab === "blogs") {
    previewContainer.innerHTML = `
      <div class="blog-card">
        <div class="blog-image">
          <img src="${imgUrl}" alt="${cleanTitle}" />
        </div>
        <div class="blog-content">
          <span class="blog-category">${item.category || "Tech"}</span>
          <h2>${cleanTitle}</h2>
          <p>${item.description || "No description provided."}</p>
          <div class="blog-footer">
            <span><i class="fa-regular fa-calendar"></i> ${
              item.created_at ? new Date(item.created_at).toLocaleDateString() : "Just now"
            }</span>
            <a href="#">Read More →</a>
          </div>
        </div>
      </div>
    `;
  } else if (currentTab === "certificates") {
    previewContainer.innerHTML = `
      <div class="certificate-card">
        <div class="certificate-image">
          <img src="${imgUrl}" alt="${cleanTitle}" />
        </div>
        <div class="certificate-content">
          <h2>${cleanTitle}</h2>
          <p>Issued by: ${item.issuer || "N/A"}</p>
          ${
            item.pdf
              ? `<a href="${item.pdf}" target="_blank" class="btn"><i class="fa-solid fa-file-pdf"></i> View Certificate</a>`
              : `<a href="#" class="btn outline" style="pointer-events: none;">No PDF Link</a>`
          }
        </div>
      </div>
    `;
  }

  previewModal.classList.add("active");
}

// INITIAL START
loadHistory();
