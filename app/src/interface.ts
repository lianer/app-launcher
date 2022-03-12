import { Mutable, Simplify } from 'type-fest';

type FilterKeysByValueType<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

// prettier-ignore
type IfEquals<X, Y, A = X, B = never> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? A : B;

type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
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

export type DataRaw = {
  iconSize: number;
  groups: Group[];
  _activatedGroupId: number;
};

export type SettingsPrototype = {
  // Global
  importData(data: DataRaw): void;

  // Content
  setIconSize(iconSize: number): void;
  removeLinks(groupId: number, linkDests: string[]): void;

  // Group
  get activatedGroupId(): number;
  activeGroup(id: number): void;
  addGroup(name: string): Group;
  moveGroupToIndex(id: number, index: number): Group;
  removeGroup(id: number): void;
  renameGroup(id: number, name: string): Group;
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
