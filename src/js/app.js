import EXTEND from './extend';
import readChapter from './components/read-chapter';
import './components/chapter-navigator';

require('./components/read-chapter');
require('./core');
require('../scss/style.scss');

console.log('App is loaded!!');


document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.read-on').addEventListener('click', (e) => {
    e.preventDefault();
    readChapter(' ', document.Reading.na.selectedIndex, document.Reading.chap.selectedIndex);
  });
});