const input = document.getElementById("input");
let buttons = document.querySelectorAll("button");

let result = "";

function updateDisplay() {
  input.value = result;
}

function calculate() {
  try {
    result = String(eval(result));
    updateDisplay();
  } catch {
    input.value = "Error";
    result = "";
  }
}

function handleInput(value) {
  if (value === "=") {
    if (result !== "") {
      calculate();
      return;
    }
  }
  if (value === "AC") {
    result = "";
    updateDisplay();
    return;
  }
  if (value === "DE") {
    result = result.slice(0, -1);
    updateDisplay();
    return;
  }
  result += value;
  input.value = result;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.innerText);
  });
});

document.addEventListener("keydown", (e) => {
  let key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    handleInput("=");
  } else if (key === "Escape") {
    handleInput("AC");
  } else if (key === "Backspace") {
    handleInput("DE");
  }
});
