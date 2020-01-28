class Router {
  /**
   *
   * @param {object} params
   * @param {string} params.currPresentation
   * @param {string} params.activeScene активная ветка сценария
   * @param {string} params.activeSlide активный слайд
   * @param {object} params.scenario объект сценария
   * @param {string} params.fullPath полный путь до активного сценария
   * @param {object} params.window
   */
  constructor(params) {
    for (const key in params) {
      this[key] = params[key];
    }
    this.window = params.window || window;
    this.currPresentation = params.currPresentation || window.CURRENT_PRESENTATION;
    this.findNextSlide();
    this.findPrevSlide();
  }
  getActiveSlideScene() {
    return this.findSlideScene(this.scenario, this.activeScene, this.activeSlide);
  }
  findNextSlide() {
    const { slides, slideIndex } = this.getActiveSlideScene();
    return (this.nextSlide = slides[slideIndex + 1] || null);
  }
  findPrevSlide() {
    const { slides, slideIndex } = this.getActiveSlideScene();
    return (this.prevSlide = slides[slideIndex - 1] || null);
  }
  goTo(path) {
    path = path.split(',');
    if (path.length === 1) {
      const [slide] = path;
      this.activeSlide = slide;
      this.window.document.location =
        this.currPresentation + '/' + this.currPresentation + '_' + slide + '.html';
    }
    if (path.length === 2) {
      const [slide, scene] = path;
      this.activeScene = scene;
      this.activeSlide = slide;
      this.window.sessionStorage.setItem(path[2] + '_activeScene', scene);
      this.window.document.location = `${this.currPresentation}/${this.currPresentation}_${slide}.html`;
    }
    if (path.length === 3) {
      const [slide, scene, presentation] = path;
      this.activeScene = scene;
      this.activeSlide = slide;
      window.sessionStorage.setItem(path[2] + '_activeScene', scene);
      document.location = `${presentation}/${presentation}_${slide}.html`;
    }
  }
  goNext() {
    this.goTo(this.nextSlide);
  }
  goPrev() {}
  findActiveSceneSlides() {}
  findSlideScene(scenario, sceneName, slide) {
    let result = null;
    scenario.forEach(scene => {
      if (result !== null) return;
      if (scene.NAME !== sceneName) {
        if (scene.children !== undefined) {
          return (result = this.findSlideScene(scene.children, sceneName, slide));
        }
      }
      const index = scene.slides.indexOf(slide);
      if (index === -1) {
        throw `В сцене ${sceneName} нету слайда ${slide}`;
      }
      if (result !== null) {
        throw 'Есть две или более сцены с одним названием';
      }
      result = {
        ...scene,
        slideIndex: index
      };
    });
    return result;
  }
}
module.exports = Router;
