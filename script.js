```javascript
const CORRECT_PASSCODE = "081025";

let enteredCode = "";

const numberButtons =
  document.querySelectorAll("[data-number]");

const dots =
  document.querySelectorAll(".pin-dots span");

const deleteBtn =
  document.getElementById("deleteBtn");

const clearBtn =
  document.getElementById("clearBtn");

const errorMessage =
  document.getElementById("errorMessage");

const pinCard =
  document.querySelector(".pin-card");


/* =========================
   UPDATE PIN DISPLAY
========================= */

function updateDots() {

  dots.forEach((dot, index) => {

    if (index < enteredCode.length) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }

  });
}


/* =========================
   ADD NUMBER
========================= */

function addNumber(number) {

  if (enteredCode.length >= 6) {
    return;
  }

  enteredCode += number;

  errorMessage.textContent = "";

  updateDots();

  if (enteredCode.length === 6) {
    checkPasscode();
  }
}


/* =========================
   DELETE ONE
========================= */

function deleteNumber() {

  enteredCode =
    enteredCode.slice(0, -1);

  errorMessage.textContent = "";

  updateDots();
}


/* =========================
   CLEAR ALL
========================= */

function clearCode() {

  enteredCode = "";

  errorMessage.textContent = "";

  updateDots();
}


/* =========================
   CHECK PASSWORD
========================= */

function checkPasscode() {

  if (enteredCode === CORRECT_PASSCODE) {

    errorMessage.textContent =
      "♡ welcome back ♡";

    setTimeout(() => {
      window.location.href = "story.html";
    }, 500);

  } else {

    errorMessage.textContent =
      "รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง ♡";

    pinCard.classList.remove("shake");

    void pinCard.offsetWidth;

    pinCard.classList.add("shake");

    setTimeout(() => {

      enteredCode = "";

      updateDots();

      pinCard.classList.remove("shake");

    }, 650);
  }
}


/* =========================
   NUMBER BUTTON EVENTS
========================= */

numberButtons.forEach(button => {

  button.addEventListener("click", () => {

    const number =
      button.dataset.number;

    addNumber(number);

  });

});


/* =========================
   DELETE
========================= */

deleteBtn.addEventListener(
  "click",
  deleteNumber
);


/* =========================
   CLEAR
========================= */

clearBtn.addEventListener(
  "click",
  clearCode
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (/^[0-9]$/.test(event.key)) {

      addNumber(event.key);

    }

    if (
      event.key === "Backspace" ||
      event.key === "Delete"
    ) {

      deleteNumber();

    }

    if (event.key === "Escape") {

      clearCode();

    }

  }
);


/* =========================
   INITIAL
========================= */

updateDots();
```
