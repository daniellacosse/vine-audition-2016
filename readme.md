# vine audition 2016

### Project scoping

Realistically, as I’ll be limiting myself to the weekend, I’ll be lucky to hit a couple of the features beyond the mvp phase.

### MVP

* ~~fork my custom alt-slug repo to start~~
* ~~generate issue entity~~
* ~~write issue-store, issue-action tests~~
* ~~actions.fetchIssuePage~~
* ~~store.fetchIssuePage~~


* ~~~write issue entity~~~

* ~~~write tests for ajax-helper~~~

* ~~issues.jsx~~
  * ~~(issue for issue in issue store)~~
  * gonna have to roll my own scroller, the ones I'm finding are p. dumb
  * tests

* need to go back and make action/store tests pass.

### Style
  * font, background
  * ~~basic layout~~
    * mobile
    * cross-browser (modern, gdiaf IE)
  * refactor and fuss over css for way too long
  * some text processing stuff
    * markdown parsing
    * detect users w/ @
    * detect links (starting with http://)
    * 140 characters minus word partial
    * embolden asker's name in the comments
    * remind who's asking the question in the detail
    * time stamps
  * assets
    * open/closed icons
  * loader
  * jump to top
  * ~~css animations? (& gpu enhancement)~~

### rain-catcher api (won’t be tdd if I get to this -- kind of failed at that with the self-imposed weekend deadline anyway)

throw together a quick rails api that logs you in w/ github.

it remembers what issues you’ve ”rained on” and will return that list in priority order

### finally, wayne.ui

really unlikely I’ll get to this as it’s really not ready yet but ”wayne ui” aspires through react to create a number of core cross-platform ui components. If you use wayne-ui you can write an app that compiles to ios/android/web/desktop (theoretically)

<hr>

# powered by "alt slug"

my own personal recipe for spinning up an [alt](http://alt.js.org) app

* <code>npm run g {entity}</code> to generate an entity
* <code>npm run d {entity}</code> to blow up an entity (be careful now)
* <code>npm run t</code> to test
* <code>npm run s</code> to launch
* <code>npm run r</code> to push to heroku (untested)
