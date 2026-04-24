const listGroup = document.querySelectorAll(".list-group-item");

const listItemHTML = document.getElementById("subject-html");
const HTMLText = document.getElementById("subject-html-text");

const listItemCSS = document.getElementById("subject-css");
const CSSText = document.getElementById("subject-css-text");

const listItemJS = document.getElementById("subject-js");
const JSText = document.getElementById("subject-js-text");

const listItemMixed = document.getElementById("subject-mixed");
const mixedText = document.getElementById("subject-mixed-text");

let category = "";

const responseObj = await fetch("../questions.json");
const questionData = await responseObj.json();

listGroup.forEach((item) => {
  item.addEventListener("dblclick", (e) => {
    if (e.target.closest("#subject-html")) {
      listGroup.forEach((i) => {
        i.style.removeProperty("color");
      });
      listItemHTML.style.color = "green";
      category = HTMLText.textContent.trim();
      console.log(category);
      const HTMLQuestions = questionData[category];
      localStorage.setItem("HTMLQuestions", JSON.stringify(HTMLQuestions));
    }

    if (e.target.closest("#subject-css")) {
      listGroup.forEach((i) => {
        i.style.removeProperty("color");
      });
      listItemCSS.style.color = "green";
      category = CSSText.textContent.trim();
      console.log(category);
      const CSSQuestions = questionData[category];
      localStorage.setItem("CSSQuestions", JSON.stringify(CSSQuestions));
    }

    if (e.target.closest("#subject-js")) {
      listGroup.forEach((i) => {
        i.style.removeProperty("color");
      });
      listItemJS.style.color = "green";
      category = JSText.textContent.trim();
      console.log(category);
      const JSQuestions = questionData[category];
      localStorage.setItem("JSQuestions", JSON.stringify(JSQuestions));
    }

    if (e.target.closest("#subject-mixed")) {
      listGroup.forEach((i) => {
        i.style.removeProperty("color");
      });
      listItemMixed.style.color = "green";
      category = mixedText.textContent.trim();
      console.log(category);
      // Method Chaining
      const mixedQuestions = [
        ...questionData.HTML,
        ...questionData.CSS,
        ...questionData.JS,
      ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      localStorage.setItem("mixedQuestions", JSON.stringify(mixedQuestions));
    }
  });
});
