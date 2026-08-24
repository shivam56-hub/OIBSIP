// const input = document.getElementById("input");
// console.log(input);
// let buttons = document.querySelectorAll("button");

// let result = "";
// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     let value = e.target.innerHTML;
//     if (value === "=") {
//       result = eval(result);
//       input.value = result;
//       return;
//     }
// if (value === "AC") {
//   result = "";
//   input.value = result;
//   return;
// }
// if (value === "DE") {
//   result = result.slice(0, -1);
//   input.value = result;
//   return;
// }
// result += value;
// input.value = result;
//   });
// });

// document.addEventListener("keydown", (e) => {
//   let key = e.key;

//   if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
//     result += key;
//     input.value = result;
//   } else if (key === "Enter") {
//     try {
//       result = eval(result);
//       input.value = result;
//     } catch {
//       input.value = "Error";
//       result = "";
//     }
//   } else if (key === "Escape") {
//     result = "";
//     input.value = "";
//   } else if (key === "Backspace") {
//     result = result.slice(0, -1);
//     input.value = result;
//   }
// });

// This is the approach where combine this in one and create clean and easy

const input = document.getElementById("input");
let buttons = document.querySelectorAll("button");

let result = "";

function updateDisplay() {
  input.value = result;
}

function calculate() {
  if (value === "=") return;
  try {
    result = String(eval(result));
    updateDisplay();
  } catch {
    input.value = "Error";
    result = "";
  }
}

function handleInput() {
  if (value === "=") {
    calculate();
    return;
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
    result += key;
    handleInput(key);
  } 
  else if (key === "Enter") {
    handleInput("=")
    
  } else if (key === "Escape") {
    handleInput("AC")
  } else if (key === "Backspace") {
    handleInput("DE")
  }
});
