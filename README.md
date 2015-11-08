#An offline Bible studay application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html

#TODOs
- fullscreen mode with chrome when click on black mode, check this and see if we can implement this in major browsers http://stackoverflow.com/questions/7836204/chrome-fullscreen-api
- scrollbar improvement
- reading mode is needed
- testing on the desktop computer of Church to fix RWD and font face issues
- need to fix font awesome path problem with gulp, and move font awsome resources to production directory
- bind the toggle light event on button not on window load
- fix theme switch issue with Ordered list
- page navigation on left and right side of the browsers, this should only be showing on desktop not for mobile devices
- implement search functionality
- remove read button and change the select to activate when user finish selecting
- better UI and how to select/change between chapters
- better layout solution for mobile devices - using flex box
- provide higher resolution favicon for Apple products like iPhone and Macbooks
- chapter field(select) should reflect the current chapter even when user has changed the chapter
- Google font fallback, also we need a solution for CDN resouces witout internet connection
- refactoring the code with OOP method
- rewrite the JS core
- music option? for this, I think we can use Youtube API
- cross-browser testing, modern browses :)
- add sourcemap and livereload in gulp.js
- notification pop up
- toggle tooltip optoins?
