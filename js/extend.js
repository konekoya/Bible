// Authored by Joshua Lin
// Staring from 2014.11.20


function init() {
  var doc = document;
  var html = document.documentElement;
  var body = doc.body;
  var CONS = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out',
    noCursor: 'no-cursor',
    hasCover: 'has-cover',
    hasSettings: 'has-settings'
  };

  function fontSizeControl() {
    var defaultFontSize = 24,
      toolBar = doc.querySelector(".toolbar"),
      content = doc.querySelector("#nothing"),
      control = toolBar.querySelector(".font-size-control"),
      buttons = control.querySelectorAll("button"),
      buttonsLen = buttons.length,
      readOnBtn = doc.querySelector(".read-on");

    // Use local storage to set font size information
    function setItem(value) {
      window.localStorage.setItem("font-size", value);
    }

    // Set font size according to user's preference in the local storage
    function setFontSize() {
      readOnBtn.addEventListener("click", function() {
        if (window.localStorage.getItem("font-size")) {
          var fontSizeState = parseInt(localStorage.getItem("font-size"), 10);
          content.style.fontSize = fontSizeState + "px";
        } else {
          content.style.fontSize = defaultFontSize + "px";
        }
      });
    }

    // Change font size and save the current font size information into local storage
    function changeFontSize() {

      function checkFontSize() {
        if (content.style.fontSize) {
          var fontSize = parseInt(content.style.fontSize, 10);

          if (this.dataset.fontSize === "smaller") {
            content.style.fontSize = (fontSize - 2) + "px";
            setItem(fontSize - 2);
          } else if (this.dataset.fontSize === "bigger") {
            content.style.fontSize = (fontSize + 2) + "px";
            setItem(fontSize + 2);
          } else {
            content.style.fontSize = defaultFontSize + "px";
            setItem(defaultFontSize);
          }
        }
      }

      for (var i = 0; i < buttonsLen; i++) {
        buttons[i].addEventListener("click", checkFontSize);
      }
    }

    setFontSize(defaultFontSize);
    changeFontSize();
  }


  fontSizeControl();

  // jQuery-free scroll to top snippet
  function scrollTo(element, to, duration) {
    if (duration < 0) {
      return;
    }
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop == to) {
        return;
      }
      scrollTo(element, to, duration - 10);
    }, 10);
  }

  function runScroll() {
    scrollTo(doc.body, 0, 300);
  }

  var scrollme = doc.querySelector(".top");
  scrollme.addEventListener("click", runScroll, false);

  // Detect and scroll to the top when user change chapter
  function scrollTopWhenHashChange() {
    window.onhashchange = function() {
      if (scrollY !== 0) {
        runScroll();
      }
    };
  }

  scrollTopWhenHashChange();

  function toggleLight() {
    var el = doc.querySelector('.toggle-light');
    var div = doc.createElement('div');
    var coverTxt = null;
    var transitionSpeed = 7000;
    div.className = 'cover';
    div.innerHTML = '<span class="cover-txt">Press ESC key to leave</span>';

    function toggleTxt(speed) {
      //  hide cover text with css transition
      window.setTimeout(function() {
        coverTxt = doc.querySelector('.cover-txt');
        if (coverTxt) {
          coverTxt.classList.add(CONS.fadeOut);
          body.classList.add(CONS.noCursor);

          //  detect mouse movement and show the cover text again
          doc.onmousemove = function() {
            if (coverTxt.classList.contains(CONS.fadeOut)) {
              coverTxt.classList.remove(CONS.fadeOut);
              coverTxt.classList.add(CONS.fadeIn);
              body.classList.remove(CONS.noCursor);
            }
          };
        }
      }, speed);
    }

    function removeCover(coverEl) {
      body.removeChild(coverEl);
      body.classList.remove(CONS.hasCover);
    }

    function addCover(coverEl) {
      body.appendChild(coverEl);
      body.classList.add(CONS.hasCover);
    }

    if (el) {
      el.addEventListener('click', function(e) {
        addCover(div);
      }, false);

      // close / remove the cover with mouse click esc key
      div.addEventListener('click', function(e) {
        removeCover(this);
      }, false);

      doc.onkeydown = function(e) {
        if (e.keyCode === 27) {
          removeCover(div);
        }
      };

      window.setInterval(function() {
        if (!body.classList.contains(CONS.noCursor) && body.classList.contains(CONS.hasCover)) {
          toggleTxt(transitionSpeed);
        }
      }, transitionSpeed);
    }
  }

  toggleLight();

  function setSettings() {
    var btn = doc.querySelector('.setting-btn');

    if (btn) {
      btn.addEventListener('click', function() {
        body.classList.toggle(CONS.hasSettings);

      }, false);
    }
  }

  setSettings();
}


window.addEventListener('load', function() {
  init();
});
