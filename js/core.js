// Define global variables
var SEARCHANY = 1;
var SEARCHALL = 2;
var SEARCHURL = 4;
var searchType = '';
var showMatches = 2000;
var currentMatch = 0;
var copyArray = [];
var nowbook = 39;
var nowchapter = 0;
var findbook = [];
var findchapter = [];
var operators = new Array("#", "*", "&", "|", "+", "!", "-", "(", ")");
var icp = new Array(3, 2, 2, 2, 2, 1, 1, 0, 3);
var isp = new Array(3, 2, 2, 2, 2, 1, 1, 3, 3);
var doc = document;

function readchapter(opstr, bnum, cnum) {
  var out1 = null;
  var out2 = null;
  var out3 = null;
  var k = -1;
  var operand = '';

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


  out1 = doc.getElementById("content");
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
  temp1 = '<a href="" class="prev-btn  btn  btn-genernal  btn-large" onClick="readchapter(\'' + opstr + '\', nowbook,--nowchapter); return false;">上一章</a>\n';
  temp2 = '<a href="" class="next-btn  btn  btn-genernal  btn-large" onClick="readchapter(\'' + opstr + '\', nowbook,++nowchapter); return false;">下一章</a>\n';

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


//將運算子 ch 的兩旁加上空格
function replacing(s1, ch) {
  var ss = s1;
  while (ss.indexOf(ch) != -1)
    ss = ss.replace(ch, " § ");
  while (ss.indexOf("§") != -1)
    ss = ss.replace(/§/, ch);
  return ss;
}

// Determine the type of search, and make
// sure the user has entered something
function validate(entry, begin1, end1) {
  var i;

  for (i = 1; i < 9; i++) //將每個運算子兩旁都加上空格
    entry = replacing(entry, operators[i]);

  while (entry.indexOf("  ") != -1) //這裡是要清掉多餘的空格 2007/11/8
    entry = entry.replace(/  /, " ");

  if (entry.charAt(0) == "+") {
    entry = entry.substring(1, entry.length);
    searchType = SEARCHALL;
  } else if (entry.substring(0, 4) == "url:") {
    entry = entry.substring(5, entry.length);
    searchType = SEARCHURL;
  } else {
    searchType = SEARCHANY;
  }

  while (entry.charAt(0) == ' ') { //清掉開頭的空格
    entry = entry.substring(1, entry.length);
    doc.search.query.value = entry;
  }
  while (entry.charAt(entry.length - 1) == ' ') { //清掉結尾的空格
    entry = entry.substring(0, entry.length - 1);
    doc.search.query.value = entry;
  }

  convertString(entry, begin1, end1);
}

// 將搜尋字串切割成合適的 tokens
function convertString(reentry, begin1, end1) {
  var searchArray = reentry.split(" ");
  allowAny(searchArray, begin1, end1);
}

//計算 postfix 運算式 convert 的值
function evaluate(convert) {
  var stack = new Array(0);
  var top = -1;

  for (i = 0; i < convert.length; i++) {
    if ((convert[i] === false) || (convert[i] === true))
      stack[++top] = convert[i];
    else
    if ((convert[i].charAt(0) == "!") || (convert[i].charAt(0) == "-")) {
      if (stack[top]) stack[top] = false;
      else stack[top] = true;
    } else if (((convert[i].charAt(0) == "*") || (convert[i].charAt(0) == "&")) && (top >= 1)) {
      if (stack[top - 1] && stack[top]) stack[top - 1] = true;
      else stack[top - 1] = false;
      top--;
    } else if (((convert[i].charAt(0) == "+") || (convert[i].charAt(0) == "|")) && (top >= 1)) {
      if (stack[top - 1] || stack[top]) stack[top - 1] = true;
      else stack[top - 1] = false;
      top--;
    }
  }
  for (i = top; i > 0; i--)
    if (stack[i - 1] && stack[i]) stack[i - 1] = true;
    else stack[i - 1] = false;

  return stack[0];
}

//將 infix 型式的運算式 t 轉成 postfix 型式的運算式
function postfix(t) {
  var stack = [];
  var top = -1;
  var i = 0,
    j, k = 0;
  var pp = [];

  stack[++top] = 0;
  while (i < t.length) {
    for (j = 0; j < 9; j++)
      if (t[i] == operators[j])
        break;
    if (j == 9) pp[k++] = t[i];
    else if (j == 8) {
      while ((top > 0) && (stack[top] != 7))
        pp[k++] = operators[stack[top--]];
      if (stack[top] == 7) top--;
    } else {
      while (isp[stack[top]] <= icp[j])
        pp[k++] = operators[stack[top--]];
      stack[++top] = j;
    }
    i++;
  }
  while (top > 0) pp[k++] = operators[stack[top--]];
  return pp;
}

// Define a function to perform a search that requires
// a match of any of the terms the user provided
function allowAny(t, begin1, end1) {
  var findings = new Array(0);
  var operand = new Array(0);
  var operandpoint = new Array(0);
  var convert = new Array(0);
  var power2 = 1;
  var value = new Array(0);
  var i, j, k;


  t = postfix(t);
  opnum = 0;
  for (j = 0; j < t.length; j++) {
    if ((t[j].charAt(0) == "*") || (t[j].charAt(0) == "+") || (t[j].charAt(0) == "!") || (t[j].charAt(0) == "&") || (t[j].charAt(0) == "|") || (t[j].charAt(0) == "-"))
      convert[j] = t[j];
    else {
      convert[j] = true;
      operandpoint[opnum] = j;
      operand[opnum++] = t[j];
    }
  }

  for (i = 0; i < opnum; i++)
    power2 *= 2;

  for (i = 0; i < power2; i++) {
    k = i;
    for (j = 0; j < opnum; j++) {
      if (k % 2 === 0)
        convert[operandpoint[j]] = false;
      else
        convert[operandpoint[j]] = true;
      k = k >> 1;
    }
    if (evaluate(convert)) value[i] = true;
    else value[i] = false;
  }


  nowbook = 0;
  nowchapter = 0;
  for (i = chapter_lines[book_chapters[begin1]]; i < chapter_lines[book_chapters[end1 + 1]]; i++) {
    var oneline = profiles[i];
    var ok = true;
    var compareElement = profiles[i].toUpperCase();
    var refineElement;

    if (searchType == SEARCHANY) {
      refineElement = compareElement.substring(0, compareElement.indexOf('|HTTP'));
    } else {
      refineElement = compareElement.substring(compareElement.indexOf('|HTTP'), compareElement.length);
    }

    var index1 = 0;
    compareElement = compareElement.substring(compareElement.indexOf(" ") + 1, compareElement.length);
    for (j = opnum - 1; j >= 0; j--) {
      if (compareElement.indexOf(operand[j]) == -1)
        index1 += 0;
      else
        index1 += 1;
      index1 *= 2;
    }
    index1 /= 2;
    if (!value[index1]) continue;

    for (j = 0; j < operand.length; j++) {
      var compareString = operand[j];
      var temp = "";

      if (compareElement.indexOf(compareString) != -1) {
        while (chapter_lines[book_chapters[nowbook] + nowchapter + 1] <= i) {
          nowchapter++;
          if (nowchapter + book_chapters[nowbook] > book_chapters[nowbook + 1]) {
            nowchapter = 0;
            nowbook++;
          }
        }
        findbook[findings.length] = nowbook;
        findchapter[findings.length] = nowchapter;

        temp = oneline.substring(0, oneline.indexOf(" ") + 1);
        oneline = oneline.substring(oneline.indexOf(" ") + 1);
        while (oneline.indexOf(compareString) != -1) {
          temp += oneline.substring(0, oneline.indexOf(compareString)) + compareString.fontcolor("red");
          oneline = oneline.substring(oneline.indexOf(compareString) + compareString.length);
        }
        temp += oneline;
        oneline = temp;
      }
    }
    findings[findings.length] = oneline;
  }
  verifyManage(operand, findings);
}

// Determine whether the search was successful
// If so print the results; if not, indicate that, too
function verifyManage(operand, resultSet) {
  if (resultSet.length === 0) {
    noMatch();
  } else {
    copyArray = resultSet;
    formatResults(operand, copyArray, currentMatch, showMatches);
  }
}

// Define a function that indicates that the returned no results
function noMatch() {
  var out, out2, out3;

  out3 = doc.getElementById("content");
  out3.innerHTML = '<HR NOSHADE WIDTH=100%>"' + doc.search.query.value +
    '" returned no results.<HR NOSHADE WIDTH=100%></TD></TR></TABLE>';
}

// Define a function to print the results of a successful search
function formatResults(operand, results, reference, offset) {
  var currentRecord = (results.length < reference + offset ? results.length : reference + offset);
  var out, out1, out2, out3, tempNode1, tempoperand;

  doc.title = '搜尋經文─' + doc.search.query.value;
  tempoperand = "";
  for (var j = 0; j < operand.length; j++)
    tempoperand += operand[j] + ' ';

  out = doc.getElementById("content");
  out.innerHTML = 'Search Query: <i>' + doc.search.query.value + '</i><br>\n';
  out.innerHTML += 'Search Results: <i>' + (reference + 1) + ' - ' +
    currentRecord + ' of ' + results.length + '</i><br>' +
    '\n\n<!-- Begin result set //-->\n\n\t';
  out2 = doc.createElement("OL");
  out.appendChild(out2);

  var value1 = 1;
  if (searchType == SEARCHURL) {
    for (var i = reference; i < currentRecord; i++) {
      tempNode1 = doc.createElement("LI");
      tempNode1.innerHTML = results[i];
      out2.appendChild(tempNode1);
      tempNode1.setAttribute("value", value1++);
    }
  } else {
    for (var k = reference; k < currentRecord; k++) {
      var oneline = results[k].substring(results[k].indexOf(" "), results[k].length);
      var temp = results[k].substring(0, results[k].indexOf(" "));
      //	out3 = doc.createElement("OL");
      //	out2.appendChild(out3);
      tempNode1 = doc.createElement("LI");
      tempNode1.innerHTML = '<a href="" onClick="readchapter(\'' + tempoperand + '\', ' + findbook[k] + ', ' + findchapter[k] + '); return false;">' + temp + '</a> ' + oneline + '\n';
      //	out3.appendChild(tempNode1);
      out2.appendChild(tempNode1);
      tempNode1.setAttribute("value", value1++);
    }
  }
}

function setachap() {
  var bnum = '';
  var cnum = '';
  var hash = '';

  setchap(doc.Reading, doc.Reading.na.selectedIndex, doc.Reading.chap.selectedIndex);

  hash = window.location.hash;
  if (location.hash.length > 1) {
    bnum = hash.substring(1, hash.indexOf('_'));
    cnum = hash;
    while (cnum.indexOf('_') != -1)
      cnum = cnum.substring(cnum.indexOf('_') + 1);
    readchapter(' ', bnum, cnum);
  }
}


function setchap(f, index, s1) {
  var i;
  var j;
  var k;
  var txt;
  var cnum = new Array(50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150, 31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16, 24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1, 22);
  i = cnum[index];
  var currentchapters = f.chap.options.length;

  if ((i == 150) && (currentchapters < 150))
    for (j = 1; j <= 150; j++) {
      txt = "第 " + j + " 篇";
      f.chap.options[j - 1] = new Option(txt, j);
    } else if ((i < 150) && (currentchapters == 150)) {
      for (j = 1; j <= i; j++) {
        txt = "第 " + j + " 章";
        f.chap.options[j - 1] = new Option(txt, j);
      }
      for (j = 150; j > i; j--)
        f.chap.options[j - 1] = null;
    } else if (i > currentchapters)
    for (j = currentchapters; j <= i; j++) {
      txt = "第 " + j + " 章";
      f.chap.options[j - 1] = new Option(txt, j);
    } else if (i < currentchapters)
      for (j = currentchapters; j > i; j--)
        f.chap.options[j - 1] = null;

  f.chap.options[0].selected = s1;
}
