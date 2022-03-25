const equalIgnoreCase = (a: string, b: string) => {
  return a.toLowerCase() === b.toLowerCase();
};

// 双指针 搜索方案
export const fuzzySearch = function (str: string, word: string) {
  let i = 0,
    j = 0;

  word = word.trim();

  while (i < str.length && j < word.length) {
    if (word[j] === ' ') {
      j++;
      continue;
    }

    if (equalIgnoreCase(str[i], word[j])) {
      i++;
      j++;
    } else {
      i++;
    }
  }

  return j === word.length;
};

// import _ from 'lodash';

// // indexOf 搜索方案
// export const fuzzySearch = function (str: string, word: string) {
//   let lastIndex = -1;

//   for (let ch of word) {
//     if (ch === ' ') {
//       continue;
//     }

//     // 字母不区分大小写
//     if (_.inRange(ch.charCodeAt(0), 96, 123)) {
//       let tempIndex = str.indexOf(ch.toLowerCase(), lastIndex + 1);
//       if (tempIndex === -1) {
//         tempIndex = str.indexOf(ch.toUpperCase(), lastIndex + 1);
//       }
//       lastIndex = tempIndex;
//     } else {
//       lastIndex = str.indexOf(ch, lastIndex + 1);
//     }

//     if (lastIndex === -1) {
//       return false;
//     }
//   }

//   return true;
// };
