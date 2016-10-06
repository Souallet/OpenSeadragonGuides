import {$, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL} from './globals';
import session from './session';

export class Guide {

  constructor(viewer, direction = DIRECTION_HORIZONTAL, id, x, y) {
    this.viewer = viewer;
    this.direction = direction;
    this.id = id ? id : Date.now();

    // Center guide by default
    this.point = this.viewer.viewport.getCenter();
    this.point.x = x ? x : this.point.x;
    this.point.y = y ? y : this.point.y;

    this.elem = createElem(this.direction, this.id);
    this.overlay = new $.Overlay(this.elem, this.point);
    this.draw();

    // Store guide in session
    this.saveInStorage();

    this.addHandlers();
  }

  addHandlers() {
    // Listen for mouse events on the guide
    this.tracker = new $.MouseTracker({
      element: this.elem,
      clickTimeThreshold: this.viewer.clickTimeThreshold,
      clickDistThreshold: this.viewer.clickDistThreshold,
      dragHandler: this.dragHandler.bind(this),
      dragEndHandler: this.dragEndHandler.bind(this),
      dblClickHandler: this.remove.bind(this)
    });

    // Redraw guide when viewer changes
    this.viewer.addHandler('open', this.draw.bind(this));
    this.viewer.addHandler('animation', this.draw.bind(this));
    this.viewer.addHandler('resize', this.draw.bind(this));
    this.viewer.addHandler('rotate', this.draw.bind(this));
  }

  dragHandler(event) {
    const delta = this.viewer.viewport.deltaPointsFromPixels(event.delta, true);

    switch (this.direction) {
      case DIRECTION_HORIZONTAL:
        this.point.y += delta.y;
        break;
      case DIRECTION_VERTICAL:
        this.point.x += delta.x;
        break;
    }

    this.elem.classList.add('osd-guide-drag');
    this.draw();
  }

  dragEndHandler() {
    this.elem.classList.remove('osd-guide-drag');
    this.saveInStorage();
  }

  draw() {
    if (this.point) {
      this.overlay.update(this.point);
      this.overlay.drawHTML(this.viewer.drawer.container, this.viewer.viewport);
    }

    return this;
  }

  remove() {
    this.viewer.removeHandler('open', this.draw.bind(this));
    this.viewer.removeHandler('animation', this.draw.bind(this));
    this.viewer.removeHandler('resize', this.draw.bind(this));
    this.viewer.removeHandler('rotate', this.draw.bind(this));

    this.overlay.destroy();
    this.point = null;

    session.deleteGuide(this.id);

    return this;
  }

  saveInStorage() {
    if (session.useStorage) {
      session.addGuide(this.id, this.point.x, this.point.y, this.direction);
    }
  }
}

function createElem(direction, id) {
  const elem = document.createElement('div');

  elem.id = `osd-guide-${id}`;
  elem.classList.add('osd-guide');

  switch (direction) {
    case DIRECTION_HORIZONTAL:
      elem.classList.add('osd-guide-horizontal');
      break;
    case DIRECTION_VERTICAL:
      elem.classList.add('osd-guide-vertical');
      break;
    default:
      throw new Error('Invalid guide direction');
  }

  return elem;
}
