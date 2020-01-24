import React from "react";
export default function Scenario(json, deep = 0, activeSceneName, activeSlide) {
  if (json === undefined) return "";
  return json.map(scene =>
    scene.slides
      .map((slide, j) => {
        const preffix = j === 0 ? "\n" + "    ".repeat(deep) + "`" : " - ";
        let tmpClassName = "slide";
        slide === activeSlide && (tmpClassName = tmpClassName + " activeSlide");

        slide === activeSlide &&
          scene.NAME === activeSceneName &&
          (tmpClassName = tmpClassName + " active");

        return (
          <>
            {j === 0 && (
              <span
                key={scene.NAME + slide + deep}
                className={
                  "scene_name " +
                  (scene.NAME === activeSceneName ? "scene_name--active" : "")
                }
              >
                {"\n" + "        ".repeat(deep) + scene.NAME}
              </span>
            )}
            <span
              className={tmpClassName}
              id={scene.NAME + slide}
              data-href={`${slide},${scene.NAME}`}
              key={scene.NAME + slide}
            >
              {preffix + slide}
            </span>
          </>
        );
      })
      .concat(Scenario(scene.children, deep + 1, activeSceneName, activeSlide))
  );
}
