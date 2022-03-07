import { makeObservable, observable, action, makeAutoObservable } from 'mobx';

class IconSize {
  size: number = 64;

  constructor() {
    makeAutoObservable(this);
  }

  setSize(size: number) {
    this.size = size;
  }
}

export const iconSize = new IconSize();
