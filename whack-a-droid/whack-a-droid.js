document.addEventListener("DOMContentLoaded", async function () {
  let whackADroidAudio;

  const whackADroidSoundFiles = {
    droidBleep: "r2d2-sound.mp3",
    jawaAngry: "jawa-angry.mp3",
  };

  whackADroidAudio = await loadAudio(
    whackADroidAudio,
    whackADroidSoundFiles,
    "assets/sounds/"
  );

  // audioObject.r2d2Scream.play();

  // audioObject.r2d2Scream.play();
  // whackADroidAudio.jawaAngry.play();
});
