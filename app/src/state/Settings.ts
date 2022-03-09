import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { DataRaw, Group, SettingsConstuctor } from '../interface';

class Settings implements SettingsConstuctor {
  iconSize: number = 64;
  groups: Group[] = [];

  // activatedGroup 有记录在
  _activatedGroup: Group | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  importData(data: DataRaw): void {
    this.iconSize = data.iconSize ?? 128;
    this.groups = data.groups ?? [];
    this._activatedGroup = this.activatedGroup ?? null;
  }

  setIconSize(iconSize: number) {
    this.iconSize = iconSize;
  }

  get activatedGroup(): Group | null {
    const exists = _.find(this.groups, { id: this._activatedGroup?.id });
    if (exists) {
      return this._activatedGroup;
    } else if (this.groups.length > 0) {
      return this.groups[0];
    } else {
      return null;
    }
  }

  activeGroup(id: number) {
    this._activatedGroup = _.find(this.groups, { id })!;
    return this.activatedGroup!;
  }

  addGroup(name: string) {
    const group: Group = { id: Date.now(), name, links: [] };
    this.groups.push(group);
    return group;
  }

  moveGroupToIndex(id: number, index: number) {
    const mIndex = _.findIndex(this.groups, { id })!;
    const mGroup = this.groups[mIndex];
    this.groups[mIndex] = this.groups[index];
    this.groups[index] = mGroup;
    return mGroup;
  }

  removeGroup(id: number) {
    const index = _.findIndex(this.groups, { id });
    if (index === -1) {
      console.log('Invalid group id');
      return;
    }
    this.groups.splice(index, 1);

    // 如果删除的是当前分组，则激活左边的组或右边的组
    if (this.activatedGroup?.id === id) {
      this._activatedGroup =
        this.groups[index - 1] || this.groups[index] || null;
    }
  }

  renameGroup(id: number, name: string) {
    const group = _.find(this.groups, { id })!;
    group.name = name;
    return group;
  }
}

export const settings = new Settings();

(window as any).settings = settings;
