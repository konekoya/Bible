#An offline Bible study application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

Some of the features in this application are designed specifically for our Church use.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html


#TODOs
- scrollbar improvement - will be using jQuery plugin to tackle this one or try a more difficult path, vanilla JS
- reading mode enhancement ideas
- add sourcemap, livereload(but then we cannot host this site on github...), HTTP server(using Node.js?) in gulp.js - follow along the Gulp tutorial and improve the development setup
- Google font fallback, also we need a solution for CDN resources without internet connection
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
- remember progress of last reading
- should we use JS testing tools?
- add different version of Chinese Bibles
- selection with some animation and improvement for that?
- highlight when click on text
- take a look at this nice browser support chart https://github.com/mzabriskie/axios
- keyboard shortcut for triggering major features
- go back to top button is currently not working in IEs

# Browser support
All modern browsers and IE10+
