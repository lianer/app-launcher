import { DataRaw } from './interface';
import { settings } from './state/Settings';

document.addEventListener('drop', (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();

  const files = e.dataTransfer?.files;

  if (files) {
    for (const file of files) {
      console.log('File(s) you dragged here: ', file.path);
    }

    const dests = Array.from(files).map((file) => file.path);
    window.electron?.postLinks(
      { activatedGroupId: settings.activatedGroup?.id ?? -1, dests },
      (data: DataRaw) => {
        console.log('callback', data);
        // const data = window.electron?.importData();
        // settings.importData(data);
      }
    );
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

export {};
