import { fuzzySearch } from './fuzzy-search';

test('fuzzySearch', () => {
  expect(fuzzySearch('Google Chrome', '')).toBe(true);
  expect(fuzzySearch('Google Chrome', 'G')).toBe(true);
  expect(fuzzySearch('Google Chrome', 'GC')).toBe(true);
  expect(fuzzySearch('Google Chrome', 'GCC')).toBe(false);
  expect(fuzzySearch('Google Chrome', 'gcc')).toBe(false);
  expect(fuzzySearch('Google Chrome', 'Chrome')).toBe(true);
  expect(fuzzySearch('Google Chrome', 'Google Chrome')).toBe(true);
  expect(fuzzySearch('Google Chrome', 'Google Chrome ')).toBe(true);
  expect(fuzzySearch('Google Chrome', 'Google Chrome a')).toBe(false);
  expect(fuzzySearch('腾讯QQ', '腾讯QQ')).toBe(true);
  expect(fuzzySearch('腾讯QQ', '腾讯qq')).toBe(true);
});
