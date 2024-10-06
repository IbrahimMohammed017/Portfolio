/* *** *** *** *** *** *** */
/* **** Change Logo  ****  */
/* *** *** *** *** *** *** */
document.addEventListener("DOMContentLoaded", function () {
  let links = document.querySelectorAll(".btn-theme");
  let card = document.querySelectorAll(".img-theme");

  card.forEach((card) => {
    card.style.display = "none";
  });

  let storedLogo = localStorage.getItem("activeLogo");

  if (storedLogo) {
    document
      .querySelector(`[data-logo="${storedLogo}"]`)
      .classList.add("active");
    document.querySelectorAll(storedLogo).forEach((ca) => {
      ca.style.display = "block";
    });
  } else {
    document.querySelectorAll(".themeLogo1").forEach((ca) => {
      ca.style.display = "block";
    });
  }

  links.forEach((li) => {
    li.addEventListener("click", shuffle);
    li.addEventListener("click", removeMark);
  });

  function removeMark() {
    links.forEach((li) => {
      li.classList.remove("active");
    });
    this.classList.add("active");

    localStorage.setItem("activeLogo", this.dataset.logo);
  }

  function shuffle() {
    card.forEach((card) => {
      card.style.display = "none";
    });
    document.querySelectorAll(this.dataset.logo).forEach((ca) => {
      ca.style.display = "block";
    });
  }
});

/* *** *** *** *** *** *** */
/* *** Change Colors  ***  */
/* *** *** *** *** *** *** */
document.addEventListener("DOMContentLoaded", function () {
  var themeCSS = {
    ".theme1": {
      "--mainColor": "#c49c4dff",
    },
    ".theme2": {
      "--mainColor": "#f20231",
    },
    ".theme3": {
      "--mainColor": "#41a7f5",
    },
    ".theme4": {
      "--mainColor": "#628b35",
    },
  };

  let linksColor = document.querySelectorAll("li[data-theme]");
  let root = document.documentElement;
  let savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme && themeCSS[savedTheme]) {
    applyTheme(savedTheme);
  } else {
    applyTheme(".theme1");
  }

  linksColor.forEach((li) => {
    li.addEventListener("click", function () {
      let selectedTheme = this.getAttribute("data-theme");
      applyTheme(selectedTheme);
      localStorage.setItem("selectedTheme", selectedTheme);
    });
  });

  function applyTheme(themeClass) {
    let selectedTheme = themeCSS[themeClass];

    for (let variable in selectedTheme) {
      if (selectedTheme.hasOwnProperty(variable)) {
        root.style.setProperty(variable, selectedTheme[variable]);
      }
    }
  }
});

/* *** *** *** *** *** *** */
/* ** Navbar Background ** */
/* *** *** *** *** *** *** */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 125) {
      navbar.style.background = "var(--bgColor1)";
      navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "none";
    }
  });
});

/* *** *** *** *** *** *** */
/* *** Texts Of Slider *** */
/* *** *** *** *** *** *** */
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "تصميم موقع احترافي وجذاب",
    "تصميم الشعارات التي تظهر شخصية علامتك التجارية",
    "تصميمات مبتكرة لرمز QR لتشجيع العملاء على التفاعل",
    "تقديم خدمات احترافية لبرامج مايكروسوفت أوفيس",
    "خدمات تحليل البيانات بأفضل الوسائل المتطورة",
    "خدمات التواصل الاجتماعي لتعزيز حضورك",
  ];

  let index = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let cursorVisible = true;

  const speed = 40; // سرعة الكتابة والحذف
  const holdTime = 2000; // المدة الزمنية للاحتفاظ بالنص الكامل قبل البدء في الحذف

  const pElement = document.querySelector(".slider-text");
  const cursorElement = document.createElement("span");
  cursorElement.innerText = "|";
  cursorElement.style.display = "inline-block";
  cursorElement.style.opacity = "1";
  pElement.appendChild(cursorElement);

  function updateText() {
    if (isDeleting) {
      currentText = texts[index].substring(0, charIndex--);
    } else {
      currentText = texts[index].substring(0, charIndex++);
    }

    pElement.innerText = currentText;
    pElement.appendChild(cursorElement);

    if (!isDeleting && charIndex === texts[index].length) {
      setTimeout(() => (isDeleting = true), holdTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }

    setTimeout(updateText, speed);
  }

  function blinkCursor() {
    cursorVisible = !cursorVisible;
    cursorElement.style.opacity = cursorVisible ? "1" : "0";
    setTimeout(blinkCursor, 500);
  }

  updateText();
  blinkCursor();
});

/* *** *** *** *** *** *** */
/* *** Services Pop-Up *** */
/* *** *** *** *** *** *** */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".order").forEach((button) => {
    button.addEventListener("click", function () {
      const orderClass = this.getAttribute("data-show");
      window.location.hash = orderClass;
      const popup = document.querySelector(orderClass);
      popup.classList.add("active");
      popup.scrollIntoView({ behavior: "smooth" });
      document.addEventListener("keydown", handleKeyPress);
      window.addEventListener("popstate", handlePopState);
    });
  });

  document.querySelectorAll(".close").forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  function closePopup() {
    const activePopup = document.querySelector(".popup-item.active");
    if (activePopup) {
      activePopup.classList.remove("active");
      history.pushState("", document.title, window.location.pathname);
      document.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("popstate", handlePopState);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Escape") {
      closePopup();
    }
  }

  function handlePopState() {
    closePopup();
  }
});
