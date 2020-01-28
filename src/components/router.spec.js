const Router = require('./router');
const scenario = require('../test-scenario.json');
const currPresentation = 'galvus-pres';
const window = {
  document: {
    location: ''
  },

  sessionStorage: {
    value: {},
    setItem(key, value) {
      return (this.value = { ...this.value, [key]: value });
    },
    getItem(key) {
      return this.value[key] || null;
    }
  }
};
describe('Router.findNextSlide() | .findPrevSlide() .goNext()', () => {
  test('router 1', () => {
    const router1 = new Router({
      activeScene: 'galvus_met',
      activeSlide: '2001_verify_019',
      scenario,
      window,
      currPresentation
    });

    expect(router1.findNextSlide()).toBe('2001_verify_021');
    expect(router1.findPrevSlide()).toBe('1904_012');
    router1.goNext();
    expect(router1.activeSlide).toBe('2001_verify_021');
  });
});

describe('Router.goNext() :: to other scene by rib from last slide', () => {
  test('router 2', () => {
    const router2 = new Router({
      activeScene: 'galvus_met',
      activeSlide: '2001_verify_021',
      scenario,
      window,
      currPresentation
    });
    router2.goNext();
    expect(router2.window.document.location).toBe('galvus-pres/galvus-pres_1904_010.html');
    expect(router2.activeSlide).toBe('1904_010');
    expect(router2.activeScene).toBe('pacientka_1');
  });
});
