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
    lowLight: 'low-light-theme',
    show: 'show'
  };

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

  // setting panel constructor
  var SettingPanel = function(options) {
    if (this === window) {
      return new SettingPanel(options);
    }
  };

  SettingPanel.prototype = {
    togglePanel: function() {
      var btn = doc.querySelector('.setting-btn');
      var panel = doc.querySelector('.setting-panel');
      if (btn && panel) {
        btn.addEventListener('click', function(e) {
          panel.classList.toggle(CONS.show);
          e.stopPropagation();
        }, false);

        panel.addEventListener('click', function(e) {
          e.stopPropagation();
        });

        document.addEventListener('click', function(e) {
          if (panel.classList.contains(CONS.show)) {
              panel.classList.remove(CONS.show);
          }
        });
      }
    },

    setDefaultFontSize: function() {
      var storeFontSize = window.localStorage.getItem('font-size');
      var nothing = doc.getElementById('nothing');
      var range = doc.querySelector('.range-slide');
      var rangeSize = doc.querySelector('.range-size');

      nothing.style.fontSize = storeFontSize;
      range.value = storeFontSize;
      rangeSize.textContent = storeFontSize + 'px';
    },

    changeFontSize: function() {
      var nothing = doc.getElementById('nothing');
      var range = doc.querySelector('.range-slide');
      var rangeSize = doc.querySelector('.range-size');

      range.addEventListener('change', function() {
        rangeSize.textContent = this.value + 'px';
        nothing.style.fontSize = this.value + 'px';
        window.localStorage.setItem('font-size', this.value);
      }, false);
    },

    switchTheme: function() {
      var switchLink = doc.querySelector('.setting-low-light');
      if (switchLink) {
        if (!body.classList.contains(CONS.lowLight)) {
          body.classList.add(CONS.lowLight);
        }
      }
    },

    initialize: function() {
      this.togglePanel();
      this.changeFontSize();
      this.setDefaultFontSize();
      this.switchTheme();
    }
  };


  var panel = new SettingPanel();
  panel.initialize();

}


window.addEventListener('load', function() {
  init();
});
