export type ElectronExpose = {
  version: string;

  readData(): Promise<DataRaw>;

  writeData(data: DataRaw): void;

  openLink(dest: string): void;

  generateLinks(
    payload: {
      activatedGroupId: number;
      dests: string[];
    },
    callback: (data: DataRaw) => void
  ): void;
};

export type DataRaw = {
  iconSize: number;
  _activatedGroupId: number;
  groups: Group[];
};

export interface SettingsPrototype {
  // Global
  importData(data: DataRaw): void;

  // Content
  setIconSize(iconSize: number): void;
  removeLinks(groupId: number, linkDests: string[]): void;

  // Group
  readonly activatedGroupId: number; // get activatedGroupId (): number
  activeGroup(id: number): void;
  addGroup(name: string): Group;
  moveGroupToIndex(id: number, index: number): Group;
  removeGroup(id: number): void;
  renameGroup(id: number, name: string): Group;
}

export type Group = {
  id: number;
  name: string;
  links: Link[];
};

export type Link = {
  name: string;
  icon: string;
  dest: string;
};
