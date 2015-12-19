#An offline Bible studay application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

Some of the features in this application are designed specifically for our Church use.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html


#TODOs
- fullscreen mode with chrome when click on black mode, check this and see if we can implement this in major browsers - need to think about the mechanism and UX
- scrollbar improvement - make one with vanilla JavaScript, or using plugins for now
- flexbox for the entire layout
- reading mode is needed
- fix black mode issue... the interval function shouldn't fire
- Google font fallback, also we need a solution for CDN resources without internet connection
- testing on the desktop computer of Church to fix RWD and font face issues
- need to fix font awesome path problem with gulp, and move font awesome resources to production directory
- bind the toggle light event on button not on window load
- fix theme switch issue with Ordered list
- implement search functionality
- remove read button and change the select to activate when user finish selecting
- better UI and how to select/change between chapters
- provide higher resolution favicon for Apple products like iPhone and MacBooks
- chapter field(select) should reflect the current chapter even when user has changed the chapter
- refactoring the code with OOP manner
- rewrite the JS core
- cross-browser testing, modern browses :)
- add sourcemap, livereload, HTTP server(using Node.js?) in gulp.js - follow along the Gulp tutorial and improve the development setup
- notification pop up
- toggle tooltip optoins?
- can we use testling? that way we will get a browser testing pass image and then we can put that in the README.md
- remember progress of last reading
- should we use JS testing tools?
- CSS linting is causing a lot of troubles ... maybe we should look for some other options available in Gulp?
- add different version of Chinese Bibles
- We need a better UI theme
- Selection with some animation and improvement for that?
- Remove the link of chapter title, unnecessary

# Browser support
All modern browsers and IE10+
