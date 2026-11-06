/* ==========================================
   ANNIVERSARY TEMPLATE 2
   PASSCODE SYSTEM
========================================== */


/* ==========================================
   ตั้งรหัสผ่านตรงนี้
========================================== */

const CORRECT_PASSCODE = "081025";


/* ==========================================
   ELEMENTS
========================================== */

const numberButtons =
  document.querySelectorAll(".number-btn");

const deleteBtn =
  document.getElementById("deleteBtn");

const dots =
  document.querySelectorAll(".passcode-dots span");

const errorMessage =
  document.getElementById("errorMessage");

const phone =
  document.querySelector(".phone");

const currentTime =
  document.getElementById("currentTime");


/* ==========================================
   VARIABLES
========================================== */

let enteredCode = "";


/* ==========================================
   CLOCK
========================================== */

function updateClock() {

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");

  currentTime.textContent =
    `${hours}:${minutes}`;
}

updateClock();

setInterval(updateClock, 1000);


/* ==========================================
   UPDATE PASSCODE DOTS
========================================== */

function updateDots() {

  dots.forEach((dot, index) => {

    if (index < enteredCode.length) {

      dot.classList.add("active");

    } else {

      dot.classList.remove("active");

    }

  });

}


/* ==========================================
   ADD NUMBER
========================================== */

function addNumber(number) {

  /*
   * จำกัดรหัสไว้ 6 ตัว
   */

  if (enteredCode.length >= 6) {
    return;
  }


  enteredCode += number;

  updateDots();

  errorMessage.classList.remove("show");


  /*
   * เมื่อครบ 6 ตัว
   * ตรวจรหัสอัตโนมัติ
   */

  if (enteredCode.length === 6) {

    setTimeout(() => {

      checkPasscode();

    }, 180);

  }

}


/* ==========================================
   DELETE NUMBER
========================================== */

function deleteNumber() {

  if (enteredCode.length === 0) {
    return;
  }

  enteredCode =
    enteredCode.slice(0, -1);

  updateDots();

  errorMessage.classList.remove("show");

}


/* ==========================================
   CHECK PASSCODE
========================================== */

function checkPasscode() {

  if (enteredCode === CORRECT_PASSCODE) {

    /*
     * รหัสถูก
     */

    dots.forEach(dot => {

      dot.classList.add("active");

    });


    /*
     * ไปหน้า story
     */

    setTimeout(() => {

      window.location.href =
        "story.html";

    }, 350);

  } else {

    /*
     * รหัสผิด
     */

    showWrongPassword();

  }

}


/* ==========================================
   WRONG PASSWORD
========================================== */

function showWrongPassword() {

  /*
   * รีเซ็ต animation
   */

  phone.classList.remove("shake");

  void phone.offsetWidth;

  phone.classList.add("shake");


  /*
   * แสดงข้อความ
   */

  errorMessage.classList.add("show");


  /*
   * ล้างรหัส
   */

  enteredCode = "";


  /*
   * อัปเดตจุด
   */

  setTimeout(() => {

    updateDots();

  }, 200);

}


/* ==========================================
   NUMBER BUTTONS
========================================== */

numberButtons.forEach(button => {

  button.addEventListener("click", () => {

    const number =
      button.dataset.number;

    addNumber(number);

  });

});


/* ==========================================
   DELETE BUTTON
========================================== */

deleteBtn.addEventListener(
  "click",
  deleteNumber
);


/* ==========================================
   KEYBOARD SUPPORT
========================================== */

document.addEventListener(
  "keydown",
  (event) => {

    /*
     * กดตัวเลขจากคีย์บอร์ด
     */

    if (/^[0-9]$/.test(event.key)) {

      addNumber(event.key);

    }


    /*
     * กด Backspace เพื่อลบ
     */

    if (
      event.key === "Backspace" ||
      event.key === "Delete"
    ) {

      deleteNumber();

    }

  }
);
