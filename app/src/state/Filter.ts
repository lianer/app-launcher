import { observable } from 'mobx';

// 使用 makeAutoObservable observable observer 都可以定义响应式 mobx 对象
export const filter = observable({
  keywords: '',
  setKeywords(keywords: string) {
    this.keywords = keywords;
  },
});
