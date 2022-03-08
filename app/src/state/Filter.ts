import { makeAutoObservable } from 'mobx';

class Filter {
  keywords: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setKeywords(keywords: string) {
    this.keywords = keywords;
  }
}

export const filter = new Filter();
