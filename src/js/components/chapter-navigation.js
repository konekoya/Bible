import $ from 'jquery';

function readchapter(opstr, bnum, cnum) {
  var out2 = null;
  var out3 = null;
  var k = -1;
  var operand = '';

  debugger;
  while (opstr.charAt(opstr.length - 1) == ' ') //清掉結尾的空格
    opstr = opstr.substring(0, opstr.length - 1);

  if (opstr.length > 0)
    operand = opstr.split(' ');


  if ((bnum - 0 < 0) || (bnum - 0 >= 66))
    bnum = 0;
  if ((bnum - 0 <= 0) && (cnum - 0 < 0))
    cnum = 0;
  if ((bnum - 0 >= 65) && (cnum - 0 >= 22))
    cnum = 21;
  if (cnum - 0 < 0) {
    bnum--;
    cnum = book_chapters[bnum + 1] - book_chapters[bnum] - 1;
  }
  if (cnum - 0 >= book_chapters[bnum + 1] - book_chapters[bnum]) {
    bnum++;
    cnum = 0;
  }
  var line1 = chapter_lines[book_chapters[bnum] + cnum];
  var line2 = chapter_lines[book_chapters[bnum] + cnum + 1];
  var tempNode1, tempNode2;
  var value1 = 1;


  const content = doc.getElementById("content");
  if (books[bnum] != "詩篇") {
    out1.innerHTML = '<h2 class="chapter-title">' + books[bnum] + '第' + numbers[cnum] + '章</h2>';
    doc.title = 'Manna - ' + books[bnum] + '第' + numbers[cnum] + '章';
  } else {
    out1.innerHTML = '<h2 class="chapter-title">' + books[bnum] + '第' + numbers[cnum] + '篇</h2>';
    doc.title = 'Manna - ' + books[bnum] + '第' + numbers[cnum] + '篇';
  }
  out2 = doc.createElement('div');
  out2.className += 'verse-container';
  out1.appendChild(out2);
  for (var i = line1; i < line2; i++) {
    var oneline = profiles[i].substring(profiles[i].indexOf(" "));
    out3 = doc.createElement('ol');
    out2.appendChild(out3);
    tempNode1 = doc.createElement('li');
    k = 0;
    while (k < operand.length && opstr.length > 0) {
      var temp = "";
      var compareString = operand[k];
      while (oneline.indexOf(compareString) != -1) {
        temp += oneline.substring(0, oneline.indexOf(compareString)) + compareString.fontcolor('red');
        oneline = oneline.substring(oneline.indexOf(compareString) + compareString.length);
      }
      temp += oneline;
      oneline = temp;
      k++;
    }
    tempNode1.innerHTML = oneline;
    out3.appendChild(tempNode1);
    tempNode1.setAttribute('value', value1++);
  }
  temp1 = '<a href="" class="prev-btn  btn  btn-primary  btn-large" onClick="readchapter(\'' + opstr + '\', nowbook,--nowchapter); return false;">上一章</a>\n';
  temp2 = '<a href="" class="next-btn  btn  btn-primary  btn-large" onClick="readchapter(\'' + opstr + '\', nowbook,++nowchapter); return false;">下一章</a>\n';

  nowbook = bnum;
  nowchapter = cnum;

  var ua = navigator.userAgent.toLowerCase();

  tempNode1 = doc.getElementById("link2");
  tempNode1.innerHTML = "";
  tempNode1.innerHTML += temp1;
  tempNode1.innerHTML += temp2;
  location.hash = '#top';
  location = location;

  location.hash = '#' + bnum + '_' + cnum;

}

$('.read-on').on('click', (e) => {
  e.preventDefault();

  console.log('oh, clicked!');

  readchapter();
  console.log('log something out!');
});
