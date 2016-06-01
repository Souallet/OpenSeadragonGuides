export class Guide {
  constructor(viewer, direction, id) {
    this.viewer = viewer;
    this.direction = direction;
    this.id = id;

    this.createOverlay();
  }

  createOverlay() {
    this.viewer.addOverlay({
      // Temporary using date as unique identifier
      id: this.id,
      className: 'guide guide-horizontal',
      x: this.viewer.viewport._oldCenterX,
      y: this.viewer.viewport._oldCenterY,
      width: 1,
      height: 0
    });

  }
}