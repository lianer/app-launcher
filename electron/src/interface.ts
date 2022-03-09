type filterKeysByValueType<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

export type Link = {
  name: string;
  icon: string;
  dest: string;
};

export type Group = {
  id: number;
  name: string;
  links: Link[];
};

export type SettingsConstuctor = {
  importData(data: DataRaw): void;

  iconSize: number;
  setIconSize(iconSize: number): void;

  groups: Group[];
  activatedGroup: Group | null;
  activeGroup(id: number): Group;
  addGroup(name: string): Group;
  moveGroupToIndex(id: number, index: number): Group;
  removeGroup(id: number): void;
  renameGroup(id: number, name: string): Group;
};

export type DataRaw = Omit<
  SettingsConstuctor,
  filterKeysByValueType<SettingsConstuctor, Function>
>;
