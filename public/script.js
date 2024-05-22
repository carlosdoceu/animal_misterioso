var text = "";

document.getElementById('click_to_convert').addEventListener('click', function () {
  const speech = true;
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener('result', (e) => {
    let transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
    document.getElementById('convert_text').value = transcript;
    text = transcript;
    console.log(transcript);
  });

  if (speech) {
    recognition.start();
  }

  setTimeout(() => {
    fetch(`/api/animals?name=${text}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, 3000);
});
