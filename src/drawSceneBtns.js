export default function drawSceneBtns(json, activeScene) {
  let result = findHrefBySceneName(json[0], activeScene);
  Array.isArray(result) && (result = result.flat(Infinity).filter(el => el));
  return JSON.stringify(result, null, "  ");
}

function findHrefBySceneName(scene, activeScene) {
  console.log({ scene, activeScene });
  return scene.name === activeScene
    ? scene?.hrefs
    : scene?.children?.map(scene => findHrefBySceneName(scene, activeScene));
}
