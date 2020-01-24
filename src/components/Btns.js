import React from "react";
import "./Btns.css";
export default function Btns({ json, activeScene }) {
  let result = findHrefBySceneName(json[0], activeScene);
  console.log({ result });
  Array.isArray(result) && (result = result.flat(Infinity).filter(el => el));
  console.log({ result });
  return result.length ? (
    <div className="btns">
      {result.map((href, index) =>
        index % 2 === 0 ? (
          <>
            <button
              data-href={result[index + 1]}
              key={href + result[index + 1]}
            >
              <b>{href}</b> -:- <i>{result[index + 1]}</i>
            </button>
            <hr />
          </>
        ) : null
      )}
    </div>
  ) : null;
}

function findHrefBySceneName(scene, activeScene) {
  console.log({ scene, activeScene });
  return scene.NAME === activeScene
    ? scene?.hrefs
    : scene?.children?.map(scene => findHrefBySceneName(scene, activeScene));
}
