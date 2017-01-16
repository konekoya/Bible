import { books, book_chapters, numbers, chapter_lines } from '../scripture/helpers';
import { profiles } from '../scripture/contents';

import chapterNavigator from './chapter-navigator';

export default function readChapter(opstr, bookNumber, chapterNumber) {
  //清掉結尾的空格
  while (opstr.charAt(opstr.length - 1) == ' ') {
    opstr = opstr.substring(0, opstr.length - 1);
  }

  let operand = '';
  if (opstr.length > 0) {
    operand = opstr.split(' ');
  }

  if ((bookNumber - 0 < 0) || (bookNumber - 0 >= 66)) {
    bookNumber = 0;
  }

  if ((bookNumber - 0 <= 0) && (chapterNumber - 0 < 0)) {
    chapterNumber = 0;
  }

  if ((bookNumber - 0 >= 65) && (chapterNumber - 0 >= 22)) {
    chapterNumber = 21;
  }

  if (chapterNumber - 0 < 0) {
    bookNumber--;
    chapterNumber = book_chapters[bookNumber + 1] - book_chapters[bookNumber] - 1;
  }

  if (chapterNumber - 0 >= book_chapters[bookNumber + 1] - book_chapters[bookNumber]) {
    bookNumber++;
    chapterNumber = 0;
  }

  const line1 = chapter_lines[book_chapters[bookNumber] + chapterNumber];
  const line2 = chapter_lines[book_chapters[bookNumber] + chapterNumber + 1];
  const content = document.getElementById('content');
  let value1 = 1;

  if (books[bookNumber] != '詩篇') {
    content.innerHTML = '<h2 class="chapter-title">' + books[bookNumber] + '第' + numbers[chapterNumber] + '章</h2>';
    document.title = 'Manna - ' + books[bookNumber] + '第' + numbers[chapterNumber] + '章';
  } else {
    content.innerHTML = '<h2 class="chapter-title">' + books[bookNumber] + '第' + numbers[chapterNumber] + '篇</h2>';
    document.title = 'Manna - ' + books[bookNumber] + '第' + numbers[chapterNumber] + '篇';
  }

  const verseContainer = document.createElement('div');
  let tempNode1 = null;
  verseContainer.classList.add('verse-container');
  content.appendChild(verseContainer);

  for (let i = line1; i < line2; i++) {
    let oneline = profiles[i].substring(profiles[i].indexOf(" "));
    const verses = document.createElement('ol');
    verseContainer.appendChild(verses);
    tempNode1 = document.createElement('li');
    let k = 0;
    while (k < operand.length && opstr.length > 0) {
      let temp = "";
      let compareString = operand[k];
      while (oneline.indexOf(compareString) != -1) {
        temp += oneline.substring(0, oneline.indexOf(compareString)) + compareString.fontcolor('red');
        oneline = oneline.substring(oneline.indexOf(compareString) + compareString.length);
      }
      temp += oneline;
      oneline = temp;
      k++;
    }
    tempNode1.innerHTML = oneline;
    verses.appendChild(tempNode1);
    tempNode1.setAttribute('value', value1++);
  }


  // const temp1 = '<a href="" class="prev-btn  btn  btn-primary  btn-large" onClick="readchapter(\'' + opstr + '\', currentBook,--currentChapter); return false;">上一章</a>';
  // const temp2 = '<a href="" class="next-btn  btn  btn-primary  btn-large" onClick="readchapter(\'' + opstr + '\', currentBook,++currentChapter); return false;">下一章</a>';

  chapterNavigator(opstr, bookNumber, chapterNumber);

  const ua = navigator.userAgent.toLowerCase();

  // tempNode1 = document.getElementById('link2');
  // tempNode1.innerHTML = '';
  // tempNode1.innerHTML += temp1;
  // tempNode1.innerHTML += temp2;
  window.location.hash = '#top';
  window.location = location;
  window.location.hash = '#' + bookNumber + '_' + chapterNumber;
}
