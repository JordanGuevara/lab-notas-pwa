// Referencias
const noteInput = document.getElementById("note-text");
const saveBtn = document.getElementById("save-note-btn");
const notesContainer = document.getElementById("notes-container");
const btnInstall = document.getElementById("btn-install"); // botón para instalar PWA
let deferredPrompt;

// Cargar notas desde localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
renderNotes();

// Renderizar notas
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((text, index) => addNoteCard(text, index));
}

// Crear Card de nota
function addNoteCard(text, index) {
  const cardHTML = `
    <div class="mdl-card mdl-shadow--2dp" style="width:100%; margin-bottom:16px;">
      <div class="note-text">${text}</div>
      <div class="card-actions">
        <button class="mdl-button mdl-js-button mdl-button--icon delete-btn" onclick="deleteNote(${index})">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
  `;
  notesContainer.insertAdjacentHTML("beforeend", cardHTML);
}

// Guardar nueva nota
saveBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (text !== "") {
    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    noteInput.value = "";
  }
});

// Eliminar nota
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

// Registro del Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("Error en registro SW", err));
}

// Evento para instalación PWA
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (btnInstall) btnInstall.style.display = "inline-block"; // mostrar botón
});

// Botón de instalación
if (btnInstall) {
  btnInstall.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("Usuario aceptó la instalación");
      } else {
        console.log("Usuario rechazó la instalación");
      }
      deferredPrompt = null;
      btnInstall.style.display = "none"; // ocultar botón
    }
  });
}
