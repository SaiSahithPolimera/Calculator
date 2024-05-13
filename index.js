const controls = document.querySelectorAll("button");
const input = document.getElementById("result");
const clearButton = document.getElementById("clearButton");
const deleteButton = document.getElementById("deleteButton");
let expression = "";
controls.forEach((control) =>
  control.addEventListener("click", (event) => {
    if (
      event.target.id !== "deleteButton" &&
      event.target.id !== "clearButton" &&
      event.target.id !== "="
    ) {
      if (
        (event.target.id === "+" ||
          event.target.id === "-" ||
          event.target.id === "*" ||
          event.target.id === "/") &&
        (expression.includes("+") ||
          expression.includes("-") ||
          expression.includes("*") ||
          expression.includes("/"))
      ) {
        operate();
      }
      expression += event.target.id;
      input.value = expression;
    } else if (event.target.id === "=") {
      operate();
    }
  })
);

function operate() {
  let result;
  if (expression.includes("+")) {
    result = splitExpression(expression, "+");
  } else if (expression.includes("-")) {
    result = splitExpression(expression, "-");
  } else if (expression.includes("*")) {
    result = splitExpression(expression, "*");
  } else if (expression.includes("/")) {
    result = splitExpression(expression, "/");
  }

  if (!isNaN(result)) {
    expression = "∞";
    input.value = "∞";
  }
}

function splitExpression(exp, symbol) {
  let values = exp.split(symbol);
  let num1 = Number(values[0]);
  let num2 = Number(values[1]);

  switch (symbol) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

clearButton.addEventListener("click", () => {
  expression = "";
  input.value = expression;
});

deleteButton.addEventListener("click", () => {
  expression = expression.toString().slice(0, -1);
  input.value = expression;
});
