import React from "react";
import test from "./test-scenario.json";
import "./App.css";
import drawScenario from "./drawScenario";
import Btns from "./components/Btns";
console.log(test);
function App() {
  const [activeSlide, setActiveSlide] = React.useState(test[0].slides[0]);
  const [activeScene, setActiveScene] = React.useState(test[0].NAME);

  function handleClick({ target: { dataset } }) {
    if (dataset.href) {
      const [slide, scene] = dataset.href.split(",");
      console.log({ slide, scene });
      setActiveSlide(slide);
      setActiveScene(scene);
    }
  }

  return (
    <div onClick={handleClick} className="App">
      <pre>{drawScenario(test, 0, activeScene, activeSlide)}</pre>
      <Btns json={test} activeScene={activeScene} />
    </div>
  );
}

export default App;
