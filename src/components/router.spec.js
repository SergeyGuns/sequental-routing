const Router = require("./router");
const scenario = require("../test-scenario.json");

const activeScene = "galvus_met";
const activeSlide = "2001_verify_019";

const router = new Router({ activeScene, activeSlide, scenario });

console.log(router);
console.log(router.getActiveSlideScene());
console.log(
  "router.findNextSlide() => ",
  router.findNextSlide(),
  "=== 2001_verify_021",
  router.findNextSlide() === "2001_verify_021" ? "OK" : "ERR"
);
console.log(
  "router.findPrevSlide() => ",
  router.findPrevSlide(),
  "=== 1904_012",
  router.findPrevSlide() === "1904_012" ? "OK" : "ERR"
);
