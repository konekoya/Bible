#An offline Bible studay application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html


#TODOs
- fullscreen mode with chrome when click on black mode, check this and see if we can implement this in major browsers - need to think about the mechanism and UX
https://developer.mozilla.org/zh-TW/docs/Web/API/Element/requestFullScreen
- scrollbar improvement - make one with vanilla JavaScript, or using plugins for now
- reading mode is needed
- fix black mode issue... the interval function shouldn't fire
- Google font fallback, also we need a solution for CDN resources without internet connection
- testing on the desktop computer of Church to fix RWD and font face issues
- need to fix font awesome path problem with gulp, and move font awesome resources to production directory
- bind the toggle light event on button not on window load
- fix theme switch issue with Ordered list
- page navigation on left and right side of the browsers, this should only be showing on desktop not for mobile devices
- implement search functionality
- remove read button and change the select to activate when user finish selecting
- better UI and how to select/change between chapters
- better layout solution for mobile devices - using flex box
- provide higher resolution favicon for Apple products like iPhone and MacBooks
- chapter field(select) should reflect the current chapter even when user has changed the chapter
- refactoring the code with OOP manner
- rewrite the JS core
- music option? for this, I think we can use Youtube API
- cross-browser testing, modern browses :)
- add sourcemap, livereload, HTTP server, autoprefix in gulp.js
- make sure all of the plugin that we are using in NPM is listing in package.json
- notification pop up
- toggle tooltip optoins?
- can we use testling? that way we will get a browser testing pass image and then we can put that in the README.md
- remember progress of last reading
- should we use JS testing tools?
- should we offer another language option for the interface?
- CSS linting is causing a lot of troubles ... maybe we should look for some other options available in Gulp?
- add different version of Chinese Bibles
- We need a better UI theme
- Build a simple web base notepad
- Reading mode...
- Selection with some animation and improvement for that?
- Search
- Remove the link of chapter title, unnecessary

# Browser support
All modern browsers and IE10+
