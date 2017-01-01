import sketch from './sketch';
import Layer from './layer';

export default class Sculpture {
  constructor() {
    this.layers = [];
    this.layers[0] = new Layer();
  }

  addLayer() {
    const nextLayer = this.layers[this.layers.length - 1].nextLayer();
    this.layers.push(nextLayer);
  }

  draw() {
    sketch.push();
    sketch.translate(-(this.layers[0].numCells * this.layers[0].cellSize) / 2,
      0, -(this.layers[0].numCells * this.layers[0].cellSize) / 2);
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].draw();
      sketch.translate(0, -10, 0);
    }
    //    this.layers[this.layers.length - 1].draw();
    sketch.pop();
  }
}
