document.addEventListener("DOMContentLoaded", (event) => {
  const encryptBtn = document.querySelector("#encrypt-btn");
  const decryptBtn = document.querySelector("#decrypt-btn");
  const copyBtn = document.querySelector("#copy-btn");
  const inputTextArea = document.querySelector("#texto-entrada");
  const outputTextArea = document.querySelector(
    "#conteudo__resultado__texto-saida"
  );

  const encryptionKeys = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  const decryptionKeys = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function validateInput(text) {
    const lowerCaseText = text.toLowerCase();
    const cleanText = removeAccents(lowerCaseText);
    if (cleanText !== text || /[^a-z\s]/.test(cleanText)) {
      return false;
    }
    return true;
  }

  function encryptText(text) {
    return text.replace(/[eioua]/g, (match) => encryptionKeys[match]);
  }

  function decryptText(text) {
    return text.replace(
      /enter|imes|ai|ober|ufat/g,
      (match) => decryptionKeys[match]
    );
  }

  inputTextArea.addEventListener("input", () => {
    const start = inputTextArea.selectionStart;
    const end = inputTextArea.selectionEnd;
    const cleanText = removeAccents(inputTextArea.value.toLowerCase());
    inputTextArea.value = cleanText;
    inputTextArea.setSelectionRange(start, end);
  });

  encryptBtn.addEventListener("click", () => {
    const inputText = inputTextArea.value;
    if (inputText.trim() === "") {
      alert("Por favor, insira um texto para criptografar.");
      return;
    }
    const encryptedText = encryptText(inputText);
    outputTextArea.value = encryptedText;
    inputTextArea.value = "";
  });

  decryptBtn.addEventListener("click", () => {
    const inputText = inputTextArea.value;
    if (inputText.trim() === "") {
      alert("Por favor, insira um texto para descriptografar.");
      return;
    }
    const decryptedText = decryptText(inputText);
    outputTextArea.value = decryptedText;
    inputTextArea.value = "";
  });

  copyBtn.addEventListener("click", () => {
    outputTextArea.select();
    document.execCommand("copy");
    alert("Texto copiado para a área de transferência.");
    inputTextArea.value = "";
    outputTextArea.value = "";
  });
});
