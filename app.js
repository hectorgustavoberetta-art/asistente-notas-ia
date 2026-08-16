const form = document.querySelector("#note-form");
const resultSection = document.querySelector("#result-section");
const result = document.querySelector("#result");
const copyButton = document.querySelector("#copy-button");
const clearButton = document.querySelector("#clear-button");
const copyStatus = document.querySelector("#copy-status");

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

function cleanText(value = "") {
  return value.trim().replace(/\s+/g, " ");
}

function lowerFirst(value) {
  return value.charAt(0).toLocaleLowerCase("es") + value.slice(1);
}

function upperFirst(value) {
  return value.charAt(0).toLocaleUpperCase("es") + value.slice(1);
}

function endSentence(value) {
  const text = cleanText(value);
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function replaceOpening(text, replacements) {
  const match = text.match(/^(\p{L}+)/u);

  if (!match) {
    return text;
  }

  const replacement = replacements[match[1].toLocaleLowerCase("es")];

  if (!replacement) {
    return text;
  }

  return replacement + text.slice(match[1].length);
}

function composeBackground(value) {
  const text = cleanText(value);
  const lower = text.toLocaleLowerCase("es");

  if (lower.startsWith("necesidad de ")) {
    return endSentence(`Se ha identificado la ${lowerFirst(text)}`);
  }

  if (lower.startsWith("solicitud de ")) {
    return endSentence(`Se ha recibido una ${lowerFirst(text)}`);
  }

  if (lower.startsWith("cumplimiento de ")) {
    return endSentence(`En ${lowerFirst(text)}`);
  }

  return endSentence(upperFirst(text));
}

function composeMainAction(value) {
  const text = cleanText(value);
  const replacements = {
    solicitar: "se solicita",
    informar: "se informa",
    comunicar: "se comunica",
    remitir: "se remite",
    adjuntar: "se adjunta",
    presentar: "se presenta",
    autorizar: "se solicita autorizar",
    gestionar: "se solicita gestionar",
    coordinar: "se propone coordinar",
    organizar: "se propone organizar",
    realizar: "se propone realizar",
    convocar: "se propone convocar",
    participar: "se propone participar"
  };

  const transformed = replaceOpening(text, replacements);
  const action = transformed === text ? lowerFirst(text) : transformed;

  return endSentence(`En atención a lo expuesto, ${action}`);
}

function composeAdditional(value) {
  const text = cleanText(value);

  if (!text) {
    return "";
  }

  const lower = text.toLocaleLowerCase("es");
  const connectors = [
    "asimismo",
    "además",
    "a tal efecto",
    "para ello",
    "se adjunta",
    "se deja constancia",
    "la actividad",
    "el plazo",
    "la documentación"
  ];

  if (connectors.some((connector) => lower.startsWith(connector))) {
    return endSentence(upperFirst(text));
  }

  return endSentence(`Asimismo, ${lowerFirst(text)}`);
}

function buildDraft(data) {
  const placeAndDate = `${cleanText(data.place)}, ${formatDate(data.date)}`;
  const recipient = cleanText(data.recipient);
  const subject = cleanText(data.subject);
  const background = composeBackground(data.background);
  const mainAction = composeMainAction(data.activity);
  const additional = composeAdditional(data.additional);

  const paragraphs = [
    placeAndDate,
    "",
    recipient,
    "",
    `Asunto: ${subject}`,
    "",
    "De mi consideración:",
    "",
    `Por medio de la presente, me dirijo a usted a efectos de exponer lo siguiente. ${background}`,
    "",
    mainAction
  ];

  if (additional) {
    paragraphs.push("", additional);
  }

  paragraphs.push(
    "",
    "Sin otro particular, saludo a usted atentamente.",
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
