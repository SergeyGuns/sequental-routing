const Router = require("./router");
const scenario = require("../test-scenario.json");
const window = {
  document: {
    location: ""
  },

  sessionStorage: {
    value: {},
    setItem: (key, value) => (this.value = { ...this.value, [key]: value }),
    getItem: key => this.value[key] || null
  }
};
const activeScene = "galvus_met";
const activeSlide = "2001_verify_019";
const currPresentation = "galvus-pres";

const router1 = new Router({
  activeScene,
  activeSlide,
  scenario,
  window,
  currPresentation
});

console.log(router1);
console.log(router1.getActiveSlideScene());
console.log(
  "router.findNextSlide() => ",
  router1.findNextSlide(),
  "=== 2001_verify_021",
  router1.findNextSlide() === "2001_verify_021" ? "OK" : "ERR"
);
console.log(
  "router.findPrevSlide() => ",
  router1.findPrevSlide(),
  "=== 1904_012",
  router1.findPrevSlide() === "1904_012" ? "OK" : "ERR"
);
const router2 = new Router({
  activeScene: "galvus_met",
  activeSlide: "2001_verify_021",
  scenario,
  window,
  currPresentation
});

console.log(router2);
router2.goNext();
console.log(router2);
