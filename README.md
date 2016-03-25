#An offline Bible study application

This is an application that you can use even when you don't have the Internet connection, for now, we only provide Chinese version. Maybe we will add more languages support down the road.

The original Bible content and codes are from http://springbible.fhl.net/OfflineBible/offline.html

#TODOs
- Only activate the perfect scrollbar when running on PCs
- Reading mode enhancement ideas -- We should work on cancel button(x), it's kind of a distraction when reading mode is on.
- Problem with verse list item, try a different approach to display the verse number. 
- Should have default chapter when opening the app
- Change directories structure, I think we should have a src dir?
- Add sourcemap and JS linting in gulp.js - follow along the Gulp tutorial and improve the development setup
- Google font fallback if there's no Internet connection
- Fix theme switch issue with Ordered list
- Implement search functionality -- We should come up with something better like built in search feature in browsers
- Remove read button and change the select to activate when user finish selecting
- Better UI and how to select/change between chapters
- Provide higher resolution favicon for Apple products like iPhone and MacBooks
- Chapter field(select) should reflect the current chapter even when user has changed the chapter
- Refactoring the code with OOP manner, and remove inline event binding in index.html
- Rewrite the JS core and remove legacy code which is using old-fashion DOM event binding
- Cross-browser testing, only targeting modern browsers :^)
- Remember progress of last reading
- Should we use JS testing tools?
- Add different version of Chinese Bibles
- Selection with some animation and improvement for that?
- Highlight when click on text -- We can do this like a block or paragraph.. when users click on the paragraph.
- Take a look at this nice browser support chart https://github.com/mzabriskie/axios
- Keyboard shortcut for triggering major features, then we should have a shortcut list or doc for user
- Go back to top button doesn't in IEs...?
- Think about SMACSS and implement it in the current CSS structure

# Browser support
All modern browsers and IE10+
