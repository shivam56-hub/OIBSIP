const input = document.getElementById("input");
console.log(input);
let buttons = document.querySelectorAll("button");

let result = "";
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    if (value === "=") {
      result = eval(result);
      input.value = result;
      return;
    }
    if (value === "AC") {
      result = "";
      input.value = result;
      return;
    }
    if (value === "DE") {
      result = result.slice(0, -1);
      input.value = result;
      return;
    }
    result += value;
    input.value = result;
  });
});
