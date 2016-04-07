// Authored by Joshua Lin
// Staring this project from 2014.11.20

function init() {
  var doc = document;
  var html = document.documentElement;
  var body = doc.body;
  var content = doc.getElementById('content');

  var CONS = {
    fadeIn: 'fade-in',
    fadeOut: 'fade-out',
    noCursor: 'js-no-cursor',
    hasCover: 'js-has-cover',
    reading: 'reading-mode',
    themeLowLight: 'theme--low-light',
    themeDefault: 'theme--default',
    show: 'show',
    fontSize: 'font-size',
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
    var toggleLightBtn = doc.querySelector('.toggle-light');
    var div = doc.createElement('div');
    var coverTxt = null;
    var timer = null;
    div.className = 'cover';
    div.innerHTML = '<span class="cover-txt">Press ESC key to leave</span>';

    function toggleCoverTxt() {
      coverTxt = doc.querySelector('.cover-txt');

      console.log('mouse is moving!');
      if (coverTxt.classList.contains(CONS.fadeOut)) {
        coverTxt.classList.remove(CONS.fadeOut);
        coverTxt.classList.add(CONS.fadeIn);
        body.classList.remove(CONS.noCursor);
      }

      clearTimeout(timer);

      timer = window.setTimeout(function() {
        if (coverTxt) {
          coverTxt.classList.remove(CONS.fadeIn);
          coverTxt.classList.add(CONS.fadeOut);
          body.classList.add(CONS.noCursor);
        }
      }, 7000);

    }

    function removeCover(coverEl) {
      body.removeChild(coverEl);
      body.classList.remove(CONS.hasCover);
      body.classList.remove(CONS.noCursor);
      doc.removeEventListener('mousemove', toggleCoverTxt, false);
    }

    function addCover(coverEl) {
      body.appendChild(coverEl);
      body.classList.add(CONS.hasCover);
      doc.addEventListener('mousemove', toggleCoverTxt, false);
    }

    if (toggleLightBtn) {
      toggleLightBtn.addEventListener('click', function(e) {
        addCover(div);
      }, false);

      // close / remove the cover with mouse click esc key
      div.addEventListener('click', function(e) {
        removeCover(this);
      }, false);

      doc.addEventListener('keydown', function(e) {
        if (e.keyCode === 27 && body.classList.contains(CONS.hasCover)) {
          removeCover(div);
        }
      }, false);
    }
  }

  toggleLight();


  function detectOSName() {
    var OSName = '';

    if (navigator.appVersion.indexOf('Win') != -1) {
      OSName = 'js-windows';
    }

    if (navigator.appVersion.indexOf('Mac') != -1) {
      OSName = 'js-mac';
    }

    body.classList.add(OSName);
  }

  detectOSName();

  // Setting panel constructor
  var SettingPanel = function(config) {
    if (this === window) {
      return new SettingPanel(config);
    }
    this.range = doc.querySelector(config.els.range);
    this.rangeSize = doc.querySelector(config.els.rangeSize);
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

        doc.addEventListener('click', function(e) {
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

      content.style.fontSize = storeFontSize + 'px';
      this.range.value = storeFontSize;
      this.rangeSize.textContent = storeFontSize + 'px';
    },

    changeFontSize: function() {
      var that = this;
      this.range.addEventListener('change', function() {
        that.rangeSize.textContent = this.value + 'px';
        content.style.fontSize = this.value + 'px';
        window.localStorage.setItem(CONS.fontSize, this.value);
      }, false);
    },

    switchTheme: function() {
      var switchLink = doc.querySelector('.toggle-theme .toggle');
      var currentTheme = '';

      // set default theme
      if (window.localStorage.getItem('theme')) {
        currentTheme = window.localStorage.getItem('theme');
        if (currentTheme === CONS.themeDefault) {
          switchLink.checked = false;
        } else {
          switchLink.checked = true;
          body.classList.add(CONS.themeLowLight);
        }
      } else {
        currentTheme = CONS.themeDefault;
        window.localStorage.setItem('theme', CONS.themeDefault);
        switchLink.checked = false;
      }

      // toggle theme
      switchLink.addEventListener('click', function() {
        if (this.checked === true) {
          body.classList.add(CONS.themeLowLight);
          window.localStorage.setItem('theme', CONS.themeLowLight);
          console.log(CONS.themeLowLight);
        } else {
          body.classList.remove(CONS.themeLowLight);
          window.localStorage.setItem('theme', CONS.themeDefault);
        }
      }, false);
    },

    toggleVerseNumber: function() {
      var toggleBtn = doc.querySelector('.toggle-verse-number .toggle');
      var container = doc.querySelector('#content');
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

  // Reading mode constructor
  var ReadingMode = function(options) {
    if (this === window) {
      return new ReadingMode(options);
    }
    this.toggle = doc.querySelector(options.els.toggle);
    this.controls = doc.querySelector(options.els.controls);
    this.content = doc.querySelector(options.els.content);
  };

  ReadingMode.prototype = {
    setReadingMode: function() {
      var that = this;
      
      var activate = function() {
        body.classList.add(CONS.reading);
        if (!body.classList.contains(CONS.mac)) {
          $(that.content).perfectScrollbar();
        }
      };

      var destroy = function() {
        body.classList.remove(CONS.reading);
        $(that.content).perfectScrollbar('destroy');
      };

      if (that.toggle) {
        that.toggle.addEventListener('click', function() {
          activate();
        }, false);
      }

      doc.addEventListener('keydown', function(e) {
        if (e.keyCode === 27 && body.classList.contains(CONS.reading)) {
          destroy();
        }
      }, false);

      doc.addEventListener('keydown', function(e) {
        if(e.ctrlKey && e.altKey && e.keyCode === 82) {
          if (body.classList.contains(CONS.reading)) {
            destroy();
          } else {
            activate();
          }
        }
      }, false);

      if (this.controls) {
        this.controls.addEventListener('click', function(e) {
          destroy();
        }, false);
      }

    },

    initialize: function() {
      this.setReadingMode();
    }
  };

  // chapter navigation through keyboard
  doc.addEventListener('keydown', function(e) {
    if (e.keyCode === 37) {
      readchapter('', nowbook, --nowchapter);
    } else if (e.keyCode === 39) {
      readchapter('', nowbook, ++nowchapter);
    }

    function parseURL(url) {
      if (url) {
        url = url.split('_')[1];
        url = String(url++); // we need the length property from String object not Number

console.log('url: ' + url);
console.log(typeof url);

        if (url === 0) {
          return;
        }

        if (url.length === 1 ) {
          url = '00' + url;
        } else if (url.length === 2 ) {
          url = '0' + url;
        }
        doc.querySelector('.chapter-selector [value="' + url + '"]').selected = true;
console.log(url);
      }
    }

    // parseURL(window.location.hash);

  }, false);

  var panel = new SettingPanel({
    els: {
      range: '.range-slide',
      rangeSize: '.range-size'
    }
  });

  panel.initialize();

  var readingMode = new ReadingMode({
    els: {
      toggle: '.toggle-reading-mode',
      controls: '.reading-mode-controls',
      content: '.content-wrap'
    }
  });

  readingMode.initialize();
}

window.addEventListener('load', function() {
  init();
}, false);
