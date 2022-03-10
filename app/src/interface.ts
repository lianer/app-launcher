import { Mutable, Simplify } from 'type-fest';

type filterKeysByValueType<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? A
  : B;

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
  // Global
  importData(data: DataRaw): void;

  // Content
  iconSize: number;
  setIconSize(iconSize: number): void;
  removeLinks(groupId: number, linkDests: string[]): void;

  // Group
  groups: Group[];
  _activatedGroupId: number;
  get activatedGroupId(): number;
  activeGroup(id: number): void;
  addGroup(name: string): Group;
  moveGroupToIndex(id: number, index: number): Group;
  removeGroup(id: number): void;
  renameGroup(id: number, name: string): Group;
};

// type R1 = ReadonlyKeys<SettingsConstuctor>;
// type R2 = filterKeysByValueType<SettingsConstuctor, Function>;
// type R3 = Simplify<R1 | R2>;

// type R1 = WritableKeys<SettingsConstuctor>;

// export type DataRaw = Partial<Omit<SettingsConstuctor, R3>>;

// type FilterSettings<T> = Pick<
//   T,
//   // WritableKeys<Partial<Omit<T, filterKeysByValueType<T, Function>>>>
//   R1
// >;

// export type DataRaw = FilterSettings<SettingsConstuctor>;

export type DataRaw = Partial<
  Omit<SettingsConstuctor, filterKeysByValueType<SettingsConstuctor, Function>>
>;
