type filterKeysByValueType<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
}[keyof T];

declare global {
  interface Window {
    electron?: {
      version: string;
      openLink(dest: string): void;
      removeLink(
        payload: {
          groupId: number;
          dest: string;
        },
        callback: (success: boolean) => void
      ): void;
      postLinks(
        payload: {
          activatedGroupId: number;
          dests: string[];
        },
        callback: (data: DataRaw) => void
      ): void;
      getData(): DataRaw;
    };
  }

  interface File {
    readonly path: string;
  }
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
};

export type DataRaw = Partial<
  Omit<SettingsConstuctor, filterKeysByValueType<SettingsConstuctor, Function>>
>;

// export type DataRaw = Partial<SettingsConstuctor>;
