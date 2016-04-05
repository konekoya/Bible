#An offline Bible study application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html

#TODOs
- Reading mode enhancement ideas -- We should work on cancel button(x), it's kind of a distraction when reading mode is on.
- Problem with verse list item, try a different approach to display the verse number. 
- Should have default chapter when opening the app
- Change directories structure, I think we should have a src dir?
- Add sourcemap and JS linting in gulp.js - follow along the Gulp tutorial and improve the development setup
- There are problems that sometimes occur when running Gulp
- Google font fallback if there's no Internet connection
- Fix theme switch issue with Ordered list
- Implement search functionality -- We should come up with something better like built in search feature in browsers
- Remove read button and change the select to activate when user finish selecting
- Better UI and how to select/change between chapters
- Provide higher resolution favicon for Apple products like iPhone and MacBooks
- Chapter field(select) should reflect the current chapter even when user has changed the chapter
- Refactoring the code with OOP manner, and remove inline event binding in index.html
- Rewrite the JS core and remove legacy code which is using old-fashion DOM event binding
- Cross-browser testing, only targeting modern browsers
- Remember progress of the last reading
- Should we use JS testing tools?
- Take a look at this nice browser support chart https://github.com/mzabriskie/axios
- Go back to top button doesn't in IEs...?
- Think about SMACSS and implement it in the current CSS structure

# Browser support
All modern browsers and IE10+
