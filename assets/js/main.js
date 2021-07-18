const render = (type, config) => {
  const element = document.createElement(type);
  config.attr &&
    Object.keys(config.attr).forEach((attr) => {
      element.setAttribute(attr, config.attr[attr]);
    });
  config.style &&
    Object.keys(config.style).forEach((style) => {
      element.style[style] = config.style[style];
    });
  config.textContent && (element.textContent = config.textContent);
  config.id && (element.id = config.id);
  config.class && (element.className = config.class);
  config.handlers &&
    Object.keys(config.handlers).length &&
    Object.keys(config.handlers).forEach((key) => {
      element.addEventListener(key, config.handlers[key]);
    });
  config.appendTo && document.querySelector(config.appendTo).append(element);
  config.appendIn &&
    Object.keys(config.appendIn).forEach((appendIn) => {
      element.appendChild(config.appendIn[appendIn]);
    });
  config.prepend && document.querySelector(config.prepend).prepend(element);
  return element;
};

const QS = (elem) => {
  return typeof elem === "string" ? document.querySelector(elem) : elem;
};

const QSA = (elem) => {
  return typeof elem === "string" ? document.querySelectorAll(elem) : elem;
};

const ID = (elem) => {
  return typeof elem === "string" ? document.getElementById(elem) : elem;
};

const qr_code = render("section", {
  class: "qr_code",
  appendIn: [
    render("div", {
      id: "qr_code__image",
      class: "qr_code__image",
    }),
    render("div", {
      class: "qr_code__inliner",
      appendIn: [
        render("input", {
          id: "qr_code__input",
          class: "qr_code__input",
          attr: {
            type: "text",
            placeholder: "Введите текст",
          },
        }),
        render("button", {
          id: "qr_code__btn",
          class: "qr_code__btn",
          attr: {
            type: "button",
          },
          textContent: "GO",
        }),
      ],
    })
  ],
  appendTo: "#app"
});

const text = ID("qr_code__input");
const btn = ID("qr_code__btn");
const download_btn = ID("download");
const menu_checkbox = ID("menu_checkbox")
let lineColor = "#000000";
let backgroundColor = "#ffffff";

let qrcode = new QRCode("qr_code__image", {
  width: 1024,
  height: 1024,
  colorDark: lineColor,
  colorLight: backgroundColor,
  correctLevel: QRCode.CorrectLevel.H,
});

const random = () => {
  return 1000 + Math.floor(Math.random() * (2000 + 1 - 1000));
};

// menu_checkbox.onclick = () => {
//   if (menu_checkbox.checked) {
   
//   } else {
//     console.log("1");
//   }
// }
btn.onclick = () => {
  const img = document.querySelector("#qr_code__image img");
  if (!text.value) {
    img.style.opacity = "0.3";
    download_btn.style.opacity = "0.3";
    download_btn.setAttribute("data-on", "false");
  } else {
    img.style.opacity = "1";
    download_btn.style.opacity = "1";
    download_btn.setAttribute("data-on", "true");
  }
  qrcode.makeCode(text.value);
};

download_btn.onclick = () => {
  if (download_btn.dataset["on"] === "true") {
    window.saveAs(
      document.querySelector("#qr_code__image img").src,
      `qr_code${random()}.png`
    );
  }
};

text.onkeydown = (e) => {
  if (e.keyCode == 13) {
    btn.click();
  }
};

window.onload = () => {
  btn.click();
};
