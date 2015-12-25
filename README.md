#An offline Bible study application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

Some of the features in this application are designed specifically for our Church use.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html


#TODOs
- scrollbar improvement - make one with vanilla JavaScript, or using plugins for now
- flexbox for the entire layout
- enhancements for reading mode
- Google font fallback, also we need a solution for CDN resources without internet connection
- testing on the desktop computer of Church to fix RWD and font face issues
- need to fix font awesome path problem with gulp, and move font awesome resources to production directory
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
- add different version of Chinese Bibles
- Selection with some animation and improvement for that?
- Remove the link of chapter title, unnecessary
- highlight when click on text
- take a look at this nice browser support chart https://github.com/mzabriskie/axios

# Browser support
All modern browsers and IE10+
