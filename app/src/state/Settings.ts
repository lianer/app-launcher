import _ from 'lodash';
import { makeAutoObservable, reaction } from 'mobx';
import { Group, DataRaw, SettingsPrototype } from '../interface';

class Settings implements DataRaw, SettingsPrototype {
  constructor() {
    makeAutoObservable(this);
  }

  /* Global */

  importData(data: DataRaw): void {
    this.iconSize = data.iconSize ?? 128;
    this.groups = data.groups ?? [];
    this._activatedGroupId = data._activatedGroupId ?? -1;
  }

  /* Content */

  iconSize: number = 64;
  setIconSize(iconSize: number) {
    this.iconSize = iconSize;
  }

  removeLinks(groupId: number, linkDests: string[]) {
    const group = _.find(this.groups, { id: groupId });
    if (group) {
      group.links = group.links.filter(
        (link) => !linkDests.includes(link.dest)
      );
    }
  }

  /* Group */

  _activatedGroupId: number = -1;
  groups: Group[] = [];

  get activatedGroupId(): number {
    const group = _.find(this.groups, { id: this._activatedGroupId });
    if (group) {
      return this._activatedGroupId;
    } else if (this.groups.length > 0) {
      return this.groups[0].id;
    } else {
      return -1;
    }
  }

  activeGroup(id: number) {
    this._activatedGroupId = id;
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
    if (this.activatedGroupId === id) {
      this._activatedGroupId =
        this.groups[index - 1]?.id ?? this.groups[index]?.id ?? -1;
    }
  }

  renameGroup(id: number, name: string) {
    const group = _.find(this.groups, { id })!;
    group.name = name;
    return group;
  }
}

export const settings = new Settings();

// 监听变化，同步写入文件
reaction(
  () => {
    return {
      iconSize: settings.iconSize,
      _activatedGroupId: settings.activatedGroupId,
      groups: settings.groups,
      // links: settings.groups[0]?.links,
    };
  },
  (data) => {
    console.log('The data has changed', data);
  }
);

// debug
(window as any).settings = settings;
