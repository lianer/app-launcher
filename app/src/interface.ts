type filterKeysByValueType<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

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

export type SettingsConstuctor = {
  importData(data: DataRaw): void;

  iconSize: number;
  setIconSize(iconSize: number): void;

  groups: Group[];
  _activatedGroupId: number;
  get activatedGroupId(): number;
  activeGroup(id: number): void;
  addGroup(name: string): Group;
  moveGroupToIndex(id: number, index: number): Group;
  removeGroup(id: number): void;
  renameGroup(id: number, name: string): Group;

  removeLinks(groupId: number, linkDests: string[]): void;
};

export type DataRaw = Partial<
  Omit<SettingsConstuctor, filterKeysByValueType<SettingsConstuctor, Function>>
>;
