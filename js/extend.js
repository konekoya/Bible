// Authored by Joshua Lin
// Staring this project from 2014.11.20

function init() {
  var doc = document;
  var html = document.documentElement;
  var body = doc.body;
  var nothing = doc.getElementById('nothing');

  var CONS = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out',
    noCursor: 'no-cursor',
    hasCover: 'has-cover',
    lowLight: 'low-light-theme',
    show: 'show',
    fontSize: 'font-size'
  };

  // jQuery-free scroll to top snippet
  function scrollTo(el, to, duration) {
    if (duration < 0) {
      return;
    }
    var difference = to - el.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      el.scrollTop = el.scrollTop + perTick;
      if (el.scrollTop == to) {
        return;
      }
      scrollTo(el, to, duration - 10);
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
      var timer = window.setTimeout(function() {
        coverTxt = doc.querySelector('.cover-txt');
        if (coverTxt) {
          coverTxt.classList.remove(CONS.fadeIn);
          coverTxt.classList.add(CONS.fadeOut);
          body.classList.add(CONS.noCursor);

          console.log('j')

          //  detect mouse movement and show the cover text again
          doc.onmousemove = function() {
            if (coverTxt.classList.contains(CONS.fadeOut)) {
              coverTxt.classList.remove(CONS.fadeOut);
              coverTxt.classList.add(CONS.fadeIn);
              body.classList.remove(CONS.noCursor);
            }
          };
        }

        clearFn(timer);

      }, speed);
    }

    var intervalTimer = window.setInterval(function() {
      console.log('g')
      if (!body.classList.contains(CONS.noCursor) && body.classList.contains(CONS.hasCover)) {
        toggleTxt(transitionSpeed);
      }
    }, transitionSpeed);

    function clearFn(timer) {
      clearTimeout(timer);
    }

    function removeCover(coverEl) {
      body.removeChild(coverEl);
      body.classList.remove(CONS.hasCover);
      body.classList.remove(CONS.noCursor);
      window.clearInterval(intervalTimer);
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
    }
  }

  toggleLight();

  // setting panel constructor
  var SettingPanel = function(options) {
    if (this === window) {
      return new SettingPanel(options);
    }
    this.range = doc.querySelector(options.els.range);
    this.rangeSize = doc.querySelector(options.els.rangeSize);
  };

  SettingPanel.prototype = {
    togglePanel: function() {
      var btn = doc.querySelector('.setting-btn');
      var panel = doc.querySelector('.setting-panel');

      if (btn && panel) {
        btn.addEventListener('click', function(e) {
          panel.classList.toggle(CONS.show);
          btn.classList.toggle(CONS.show);
          e.stopPropagation();
        }, false);

        panel.addEventListener('click', function(e) {
          e.stopPropagation();
        }, false);

        document.addEventListener('click', function(e) {
          if (panel.classList.contains(CONS.show)) {
            panel.classList.remove(CONS.show);
            btn.classList.remove(CONS.show);
          }
        }, false);
      }
    },

    setDefaultFontSize: function() {
      var storeFontSize = -1;

      if (window.localStorage.getItem(CONS.fontSize)) {
        storeFontSize = window.localStorage.getItem(CONS.fontSize);
      } else {
        storeFontSize = 24;
        window.localStorage.setItem(CONS.fontSize, 24);
      }

      nothing.style.fontSize = storeFontSize;
      this.range.value = storeFontSize;
      this.rangeSize.textContent = storeFontSize + 'px';
    },

    changeFontSize: function() {
      var that = this;

      this.range.addEventListener('change', function() {
        that.rangeSize.textContent = this.value + 'px';
        nothing.style.fontSize = this.value + 'px';
        window.localStorage.setItem(CONS.fontSize, this.value);
      }, false);
    },

    switchTheme: function() {
      var switchLink = doc.querySelector('.toggle-theme .toggle');
      var currentTheme = '';

      // set default theme
      if (window.localStorage.getItem('theme')) {
        currentTheme = window.localStorage.getItem('theme');
        if (currentTheme === 'default-theme') {
          switchLink.checked = false;
        } else {
          switchLink.checked = true;
          body.classList.add(CONS.lowLight);
        }
      } else {
        currentTheme = 'default-theme';
        window.localStorage.setItem('theme', 'default-theme');
        switchLink.checked = false;
      }

      // toggle theme
      switchLink.addEventListener('click', function() {
        if (this.checked === true) {
          body.classList.add(CONS.lowLight);
          window.localStorage.setItem('theme', 'low-light-theme');
        } else {
          body.classList.remove(CONS.lowLight);
          window.localStorage.setItem('theme', 'default-theme');
        }
      }, false);
    },

    toggleVerseNumber: function() {
      var toggleBtn = doc.querySelector('.toggle-verse-number .toggle');
      var container = doc.querySelector('#nothing');
      var currentState = '';

      if (window.localStorage.getItem('verse-number')) {
        currentState = window.localStorage.getItem('verse-number');
        if (currentState === 'on') {
          toggleBtn.checked = true;
          container.classList.remove('no-verse-number');
        } else {
          toggleBtn.checked = false;
          container.classList.add('no-verse-number');
        }
      } else {
        currentState = 'on';
        window.localStorage.setItem('verse-number', 'on');
        toggleBtn.checked = true;
      }

      toggleBtn.addEventListener('click', function(e) {
          if (this.checked === true) {
            container.classList.remove('no-verse-number');
            window.localStorage.setItem('verse-number', 'on');
          } else {
            container.classList.add('no-verse-number');
            window.localStorage.setItem('verse-number', 'off');
          }
      }, false);

    },

    initialize: function() {
      this.togglePanel();
      this.changeFontSize();
      this.setDefaultFontSize();
      this.switchTheme();
      this.toggleVerseNumber();
    }
  };


  var panel = new SettingPanel({
    els: {
      range: '.range-slide',
      rangeSize: '.range-size'
    }
  });

  panel.initialize();

}

window.addEventListener('load', function() {
  init();
});
