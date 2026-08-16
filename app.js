const form = document.querySelector("#note-form");
const resultSection = document.querySelector("#result-section");
const result = document.querySelector("#result");
const copyButton = document.querySelector("#copy-button");
const clearButton = document.querySelector("#clear-button");
const copyStatus = document.querySelector("#copy-status");
const dateInput = document.querySelector("#date");

function formatDate(value) {
  if (!value) return "";

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function cleanText(value) {
  return value.trim().replace(/\s+/g, " ");
}

function endSentence(value) {
  const text = cleanText(value);
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function buildDraft(data) {
  const placeAndDate = `${cleanText(data.place)}, ${formatDate(data.date)}`;
  const recipient = cleanText(data.recipient);
  const subject = cleanText(data.subject);
  const background = endSentence(data.background);
  const activity = endSentence(data.activity);
  const additional = cleanText(data.additional);

  const paragraphs = [
    placeAndDate,
    recipient,
    "",
    `Asunto: ${subject}`,
    "",
    "De mi consideración:",
    "",
    `Me dirijo a usted en relación con el siguiente antecedente o motivo: ${background}`,
    "",
    `En este marco, se informa y pone a consideración lo siguiente: ${activity}`
  ];

  if (additional) {
    paragraphs.push("", `Asimismo, se deja constancia de la siguiente información adicional: ${endSentence(additional)}`);
  }

  paragraphs.push(
    "",
    "Sin otro particular, y agradeciendo desde ya su atención, saludo a usted atentamente.",
    "",
    "",
    "Firma: ______________________________",
    "Nombre y cargo: _____________________"
  );

  return paragraphs.join("\n");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporary = document.createElement("textarea");
  temporary.value = text;
  temporary.setAttribute("readonly", "");
  temporary.style.position = "fixed";
  temporary.style.opacity = "0";
  document.body.appendChild(temporary);
  temporary.select();
  const copied = document.execCommand("copy");
  temporary.remove();

  if (!copied) {
    throw new Error("No fue posible copiar el texto");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  result.textContent = buildDraft(data);
  resultSection.hidden = false;
  copyStatus.textContent = "";
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  result.focus({ preventScroll: true });
});

copyButton.addEventListener("click", async () => {
  try {
    await copyText(result.textContent);
    copyStatus.textContent = "Texto copiado al portapapeles.";
    copyButton.textContent = "Copiado";
  } catch {
    copyStatus.textContent = "No se pudo copiar automáticamente. Seleccioná el texto y copialo manualmente.";
  }

  window.setTimeout(() => {
    copyButton.textContent = "Copiar texto";
    copyStatus.textContent = "";
  }, 3000);
});

clearButton.addEventListener("click", () => {
  form.reset();
  result.textContent = "";
  resultSection.hidden = true;
  copyStatus.textContent = "";
  document.querySelector("#subject").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
