# vine audition 2016


(Summary && how to run will go here)



### Project log

Realistically, as I’ll be limiting myself to the weekend, I’ll be lucky to hit a couple of the features beyond the mvp phase.

### Day 1:
MVP mostly complete, minimal test coverage *(alt 18 threw me a curveball, to be frank)*

### Day 2:
realized I should build my own parsing and loading components.
so revised my high level list of things to tackle
(may need to spend another afternoon)

### Day 3 (evening):
just a few non test-related details left:
  * ~~emphasized user doesn't have link~~
  * ~~403 && 404 pages~~ redirect on 403
  * ~~deployment~~
  * ~~better open/close icon~~

### Day 4 (evening):
  * **tests!!!** -- so much for that. Clearly I need to do a deep dive on testing for node and flux. Ruby makes it so easy!!!
  * ~~horizon: load on scroll pause?~~
  * ~~redirect on 403~~
  * TODO joke

#### Old:

> * ~~parser component~~
>     * emphasized user doesn't have link
>     * ~~emphasize poster's comments~~
>   * ~~additional css work, then refactoring~~
>     * ~~spacing, alignment~~
>     * ~~gradient on last word~~
>     * ~~colors~~
>     * ~~left align on comments~~
>     * ~~loading and back icons~~
>
> * ~~custom dynamic loading component~~
>   * ~~then style labels (finally)~~
>   * ~~more sophisticated back logic & UI~~
>     * ~~hide back on scroll up~~
>     * ~~option to go to page or all the way to top~~
>     * ~~25 at a time, not 30~~
>
> * error handling
>   * ~~mainly, run out of requests state~~
>     * ~~should refactor into index~~ w/ issue & error pages
> * component tests
>   * any needed refactoring
> * try alt 18 tests once more (will probably post issue on the alt repo today)
>   * any needed refactoring (also update alt-slug)
> * misc
>   * livereload
>
> * confirm deployment!

> ### MVP
>
> * ~~fork my custom alt-slug repo to start~~
> * ~~generate issue entity~~
> * ~~write issue-store, issue-action tests~~
> * ~~actions.fetchIssuePage~~
> * ~~store.fetchIssuePage~~
>
>
> * ~~~write issue entity~~~
>
> * ~~~write tests for ajax-helper~~~
>
> * ~~issues.jsx~~
>   * ~~(issue for issue in issue store)~~
>   * gonna have to roll my own scroller/loader, the ones I'm finding are p. dumb
>   * jump to top
>   * tests
>
> * need to go back and make action/store tests pass.
>
> ### Style
>   * ~~font, background~~
>   * ~~basic layout~~
>     * mobile
>     * cross-browser (modern, gdiaf IE)
>   * refactor and fuss over css for way too long
>   * some text processing stuff
>     * ~~markdown parsing~~
>     * detect users w/ @
>     * detect links (starting with http://)
>     * 140 characters minus word partial
>     * embolden asker's name in the comments
>     * remind who's asking the question in the detail
>     * time stamps
>   * assets
>     * open/closed icons
>   * ~~css animations? (& gpu enhancement)~~
>
> ### rain-catcher api (won’t be tdd if I get to this -- kind of failed at that  with the self-imposed weekend deadline anyway)
>
> throw together a quick rails api that logs you in w/ github.
>
> it remembers what issues you’ve ”rained on” and will return that list in > priority order
>
> ### finally, wayne.ui
>
> really unlikely I’ll get to this as it’s really not ready yet but ”wayne ui” aspires through react to create a number of core cross-platform ui components. If you use wayne-ui you can write an app that compiles to ios/android/web/desktop (theoretically)

<hr>

# powered by "alt slug"

my own personal recipe for spinning up an [alt](http://alt.js.org) app

* <code>npm run g {entity}</code> to generate an entity
* <code>npm run d {entity}</code> to blow up an entity (be careful now)
* <code>npm run t</code> to test
* <code>npm run s</code> to launch
* <code>npm run r</code> to push to heroku (untested)
