const controls = document.querySelectorAll("button");
const input = document.getElementById("result");
const clearButton = document.getElementById("clearButton");
const deleteButton = document.getElementById("deleteButton");
expression = "";
controls.forEach((control) =>
  control.addEventListener("click", (event) => {
    if (event.target.id != "deleteButton" && event.target.id != "clearButton") {
      if (event.target.id == "=" && expression.length == 0) {
        input.placeholder = "Please enter a value";
        return;
      }
      expression += event.target.id;
      input.value = expression;
      if (event.target.id == "=") {
        operate();
      }
      if (
        (expression.includes("+") &&
          expression.indexOf("+") != expression.lastIndexOf("+")) ||
        expression[expression.length - 1] == "-" ||
        expression[expression.length - 1] == "/" ||
        expression[expression.length - 1] == "*"
      ) {
        operate();
        expression += event.target.id;
        input.value += event.target.id;
      }
    }
  })
);

function operate() {
  if (expression.includes("+")) {
    expression = splitExpression(expression.slice(0, -1), "+");
    input.value = expression;
  } else if (expression.includes("-")) {
    expression = splitExpression(expression.slice(0, -1), "-");
    input.value = expression;
  } else if (expression.includes("*")) {
    expression = splitExpression(expression.slice(0, -1), "*");
    input.value = expression;
  } else if (expression.includes("/")) {
    expression = splitExpression(expression.slice(0, -1), "/");
    input.value = expression;
  }
}

function splitExpression(exp, symbol) {
  values = [];
  values.push(exp.slice(0, exp.indexOf(symbol)));
  values.push(exp.slice(exp.indexOf(symbol) + 1, exp.length));
  if (symbol == "+") {
    if (expression.includes(".")) {
      return (Number(values[0]) + Number(values[1])).toFixed(2);
    }
    return Number(values[0]) + Number(values[1]);
  } else if (symbol == "-") {
    if (expression.includes(".")) {
      return (Number(values[0]) - Number(values[1])).toFixed(2);
    }
    return Number(values[0]) - Number(values[1]);
  } else if (symbol == "*") {
    if (expression.includes(".")) {
      return (Number(values[0]) * Number(values[1])).toFixed(2);
    }
    return Number(values[0]) * Number(values[1]);
  } else if (symbol == "/") {
    if (expression.includes(".")) {
      return (Number(values[0]) / Number(values[1])).toFixed(2);
    }
    return Number(values[0]) / Number(values[1]);
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
