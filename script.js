const main = document.getElementById("root");
const changeBtn = document.getElementById("btn");
const output = document.getElementById("input");
const copyBtn = document.getElementById("btn-copy");

// div er value empty ache ekhon
let div = null;

// change the hex color
changeBtn.addEventListener("click", function () {
  const bgColor = generateHEX();
  main.style.backgroundColor = bgColor;
  output.value = bgColor;
});

// copy to hex color code
copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(output.value);

  // div null and remove kora hoiche
  if (div !== null) {
    div.remove();
    div = null;
  }
  // toast message && chack color code invalide
  if (isValideHex(output.value)) {
    generateToast(`${output.value} copied`);
  } else {
    alert("Color code invalide");
  }
});

// user by keyup hex code show in bg color
output.addEventListener("keyup", function (e) {
  const color = e.target.value;
  if (color && isValideHex(color)) {
    main.style.backgroundColor = color;
  }
});

// toast div create
function generateToast(mess) {
  div = document.createElement("div");
  div.innerText = mess;
  div.className = "toast-message toast-message-slide-in";
  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");
    // toast message remove
    div.addEventListener("animationend", function () {
      div.remove();
      div = null;
    });
  });

  document.body.appendChild(div);
}
/**
 *
 * @param {string} color
 */

// hex color validation regex
function isValideHex(color) {
  if (color.length !== 7) return false;
  if (color[0] !== "#") return false;
  color = color.substring(1);
  return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// generate the hex color
function generateHEX() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}
// x = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
