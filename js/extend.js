// Authored by Joshua Lin
// Staring from 2014.11.20


function init() {
    var doc = document,
        html = document.documentElement,
        body = doc.body;


     function fontSizeControl () {
       var defaultFontSize = 24,
           toolBar = doc.querySelector( ".toolbar" ),
           content = doc.querySelector( "#nothing" ),
           control = toolBar.querySelector( ".font-size-control" ),
           buttons = control.querySelectorAll( "button" ),
           buttonsLen = buttons.length,
           readOnBtn = doc.querySelector( ".read-on" );

       // Use local storage to set font size information
       function setItem ( value ) {
           window.localStorage.setItem( "font-size", value );
       }

       // Set font size according to user's preference in the local storage
       function setFontSize () {
           readOnBtn.addEventListener( "click", function(){
             if( window.localStorage.getItem( "font-size" ) ) {
                 var fontSizeState = parseInt( localStorage.getItem( "font-size" ), 10 );
                 content.style.fontSize = fontSizeState + "px";
             } else {
                 content.style.fontSize = defaultFontSize + "px";
             }
           });
       }

       // Change font size and save the current font size information into local storage
       function changeFontSize () {

         function checkFontSize() {
           if( content.style.fontSize ) {
               var fontSize = parseInt( content.style.fontSize, 10);

               if( this.dataset.fontSize === "smaller") {
                   content.style.fontSize = ( fontSize - 2 ) + "px";
                   setItem( fontSize - 2 );
               } else if ( this.dataset.fontSize === "bigger" ) {
                 content.style.fontSize = ( fontSize + 2 ) + "px";
                 setItem( fontSize + 2 );
               } else {
                 content.style.fontSize = defaultFontSize + "px";
                 setItem( defaultFontSize );
               }
           }
         }

         for( var i = 0; i < buttonsLen; i++ ) {
             buttons[ i ].addEventListener( "click", checkFontSize );
         }
       }

       setFontSize( defaultFontSize );
       changeFontSize();
     }


     fontSizeControl();

     // jQuery-free scroll to top snippet
     function scrollTo ( element, to, duration ) {
         if ( duration < 0 ) {
             return;
         }
         var difference = to - element.scrollTop;
         var perTick = difference / duration * 10;

         setTimeout( function() {
           element.scrollTop = element.scrollTop + perTick;
           if ( element.scrollTop == to ) {
                return;
           }
           scrollTo( element, to, duration - 10 );
         }, 10 );
     }

     function runScroll() {
       scrollTo( doc.body, 0, 300 );
     }

     var scrollme = doc.querySelector( ".top" );
     scrollme.addEventListener( "click", runScroll, false );
    //  window.addEventListener( "scroll", fadeEffect, false);

    // Detect and scroll to the top when user change chapter
     function scrollTopWhenHashChange() {
       window.onhashchange = function() {
         if( scrollY !== 0 ) {
             runScroll();
         }
       };
     }

     scrollTopWhenHashChange();
}


window.addEventListener('load', function() {
    init();
});
