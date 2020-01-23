import React from "react";
export default function drawScenario(
  json,
  deep = 0,
  activeSceneName,
  activeSlide
) {
  if (json === undefined) return "";
  return json.map((scene, i, json) =>
    scene.slides
      .map((slide, j, slides) => {
        const preffix = j === 0 ? "\n" + "`" + "----".repeat(deep) : " ";
        let tmpClassName = "slide";
        slide === activeSlide && (tmpClassName = tmpClassName + " activeSlide");

        slide === activeSlide &&
          scene.name === activeSceneName &&
          (tmpClassName = tmpClassName + " active");

        return (
          <>
            {j === 0 && (
              <span
                className={
                  "scene_name " +
                  (scene.name === activeSceneName ? "scene_name--active" : "")
                }
              >
                {"\n" + "----".repeat(deep) + scene.name}
              </span>
            )}
            <span
              className={tmpClassName}
              id={scene.name + slide}
              data-href={`${slide},${scene.name}`}
              key={scene.name + slide}
            >
              {preffix + slide}
            </span>
          </>
        );
      })
      .concat(
        drawScenario(scene.children, deep + 1, activeSceneName, activeSlide)
      )
  );
}
