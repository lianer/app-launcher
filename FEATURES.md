- 流程
  - 启动 APP Launcher
  - 添加项目分组
  - 导入项目（应用程序、文件），导入文件夹（以文件夹命名创建新分组）
  - 整理项目（排序、窗口尺寸、图标大小、标题样式）
  - 删除项目
- 功能
  - 搜索
    - 搜索项目 (keys.search CMD/CTRL + F)
    - 搜索项目名称、关键词
  - 分组
    - 新建分组
    - 分组排序（拖拽排序）
    - 分组删除
    - 分组重命名
  - 项目
    - 多选项目（选框多选）
    - 删除项目（拖拽删除、右键删除）
    - 拖拽到其他分组 (默认移动，按住 CTRL 以复制)
    - 项目置顶
  - 菜单
    - 设置 (keys.settings CMD/CTRL + ,)
    - 关闭 (keys.close CMD/CTRL + W)
  - 全局
    - 快捷唤起 (keys.wakeup OPT/ALT + A)
    - 主题（内置黑/白/自动主题）
  - 任务栏
    - 任务栏图标
    - 任务栏快捷功能

数据结构设计

```ts
type DataSchema = {
  settings: {};
  keys: {};
  data: [
    {
      groupName: string;
      items: Array<FileItem | DirItem>;
    }
  ];
};

type FileItem = {
  type: 'file';
  title: string;
  keywords: string | undefined; // isDir 时为 undefined
  icon: string;
  dest: string;
  isTop: boolean;
};

type DirItem = Omit<FileItem, 'type' | 'keywords'> & {
  type: 'dir';
};
```
