#An offline Bible study application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html

#TODOs
- Scrollbar improvement on Reading mode - jQuery plugin, vanilla JS
- Reading mode enhancement ideas
- Change directories structure, I think we should have a src dir?
- Add sourcemap, livereload(or browserSync) HTTP server(using Node.js?) and JS linting in gulp.js - follow along the Gulp tutorial and improve the development setup
- Google font fallback if there's no Internet connection
- Need to fix font awesome path problem with gulp, and move font awesome resources to production directory
- Fix theme switch issue with Ordered list
- Implement search functionality
- Remove read button and change the select to activate when user finish selecting
- Better UI and how to select/change between chapters
- Provide higher resolution favicon for Apple products like iPhone and MacBooks
- Chapter field(select) should reflect the current chapter even when user has changed the chapter
- Refactoring the code with OOP manner, and remove inline event binding in index.html
- Rewrite the JS core and remove legacy code which is using old fashion DOM event binding
- Cross-browser testing, only targeting modern browsers :^)
- Remember progress of last reading
- Should we use JS testing tools?
- Add different version of Chinese Bibles
- Selection with some animation and improvement for that?
- Highlight when click on text
- Take a look at this nice browser support chart https://github.com/mzabriskie/axios
- Keyboard shortcut for triggering major features, then we should have a shortcut list or doc for user
- Go back to top button is currently not working in IEs... but does it matter?
- Should we replace SASS with PostCSS(preCSS plugin)?

# Browser support
All modern browsers and IE10+
