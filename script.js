let currentIndex = 0;
const adImages = [
  "clases_manejo.jpg",
  "Espanol.jpg",
  "impresiones.jpg",
  "vehiculo_dekra.jpg",
  "anuncio_ingles.jpg",
];
let adIndex = 0;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  speechSynthesis.speak(utterance);
}

function renderCard({ letter, word }) {
  const container = document.getElementById("trainer-card");
  container.innerHTML = `
    <h2>${letter}</h2>
    <p><strong>${word}</strong></p>
    <button onclick="speak('${letter}, ${word}')">🔊 Escuchar</button>
    <button onclick="startRecognition('${word.toLowerCase()}')">🎤 Pronunciar</button>
    <p id="feedback" class="feedback"></p>
  `;
}

function nextLetter() {
  currentIndex = (currentIndex + 1) % alphabetData.length;
  renderCard(alphabetData[currentIndex]);
}

function randomLetter() {
  currentIndex = Math.floor(Math.random() * alphabetData.length);
  renderCard(alphabetData[currentIndex]);
}

function startRecognition(expectedWord) {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase().trim();
    const feedback = document.getElementById("feedback");

    if (spoken.includes(expectedWord)) {
      const message = `¡Muy bien! Pronunciaste '${expectedWord}' correctamente.`;
      feedback.textContent = "✅ " + message;
      feedback.style.color = "green";
      speak(message);
    } else {
      const message = `Escuché: "${spoken}". Inténtalo otra vez.`;
      feedback.textContent = "❌ " + message;
      feedback.style.color = "red";
      speak(message);
    }
  };

  recognition.onerror = () => {
    const errorMsg = "Hubo un error al reconocer la voz.";
    const feedback = document.getElementById("feedback");
    feedback.textContent = "⚠️ " + errorMsg;
    feedback.style.color = "orange";
    speak(errorMsg);
  };
}

function rotateAds() {
  adIndex = (adIndex + 1) % adImages.length;
  const adImg = document.getElementById("adImage");
  adImg.src = adImages[adIndex];
  adImg.alt = `Ad ${adIndex + 1}`;
}

setInterval(rotateAds, 5000);
renderCard(alphabetData[currentIndex]);
