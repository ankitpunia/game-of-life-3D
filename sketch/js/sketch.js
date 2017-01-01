// In order to suppress the ESLint errors (Should only be used in the main sketch.js file)
/* eslint new-cap: ["error", { "newIsCapExceptions": ["p5"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

// Import modules
import p5 from 'p5';
import Sculpture from './sculpture';

export default new p5((sketch) => {
  let sculpture;

  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth, window.innerHeight, sketch.WEBGL);
    sketch.frameRate(10);
    sculpture = new Sculpture();
  };

  sketch.draw = () => {
    sculpture.addLayer();

    sketch.push();
    sketch.translate(0, sketch.height / 2, -1000);
    sketch.rotateY(0.01 * sketch.frameCount);

    sketch.push();
    sketch.fill(128, 0, 0, 255);
    sketch.translate(0, 1, 0);
    sketch.rotateX(Math.PI / 2);
    sketch.box(1500, 1500, 1);
    sketch.pop();

    sketch.fill(0, 0, 0, 32);
    //    sketch.translate(-500, 0, -1000);
    sculpture.draw();
    sketch.pop();
  };

  sketch.mouseDragged = () => {};

  sketch.keyPressed = () => {};
});
