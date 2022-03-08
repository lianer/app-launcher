import { makeAutoObservable } from 'mobx';
import { DataRaw, Group, SettingsConstuctor } from '../interface';

class Settings implements SettingsConstuctor {
  iconSize: number = 64;
  groups: Group[] = [];
  activatedGroup: Group | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  importData(data: DataRaw): void {
    this.iconSize = data.iconSize ?? 128;
    this.groups = data.groups ?? [];
    this.activatedGroup = this.activatedGroup ?? this.groups?.[0] ?? null;
  }

  setIconSize(iconSize: number) {
    this.iconSize = iconSize;
  }

  activeGroup(id: number) {
    this.activatedGroup = this.groups.find((group) => group.id === id)!;
    return this.activatedGroup;
  }

  addGroup(name: string) {
    const group: Group = { id: Date.now(), name, links: [] };
    this.groups.push(group);
    return group;
  }

  moveGroupToIndex(id: number, index: number) {
    const group = this.groups.find((group) => group.id === id)!;
    this.groups.splice(index, 0, group);
    return group;
  }

  removeGroup(id: number) {
    this.groups = this.groups.filter((group) => group.id !== id);
  }

  renameGroup(id: number, name: string) {
    const group = this.groups.find((group) => group.id === id)!;
    group.name = name;
    return group;
  }
}

export const settings = new Settings();
