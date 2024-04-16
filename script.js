var text = "";

click_to_convert.addEventListener("click", function () {
  const speech = true;
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  recognition.interimResults = true;
  //   recognition.lang = "pt-BR";

  recognition.addEventListener("result", (e) => {
    let transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    convert_text.innerHTML = transcript;
    text = transcript;
    console.log(transcript);
  });

  if (speech == true) {
    recognition.start();
  }

  setTimeout(() => {
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/animals?name=" + text,
      headers: { "X-Api-Key": "DpXkoY4fzZLscUMKNPeveA==HJncKZISoxTTYEKQ" },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }, 3000);
});
