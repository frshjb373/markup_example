
## Overview

All vendor files are pulled from the `node_modules` dir.  In this
repo, jquery and bootstrap are configured.

All source files are in `src` except for the html files which should
go into`public_html/library/user/templates/default_site/site.group/`.
This is to simulate the structure of ExpressionEngine.

When grunt's tasks are run, the generated files are put in
`public_html/assets/...`.  The following files are put into `assets/...`.

### CSS
- `main.css`: has bootstrap imported into it.
- `main.purged.css`: an experimental purged version of main.css using
  purgecss.  Since purgecss can sometimes remove to much css its a
  seperate file.

### JS
- `main.js`: The main js file which concats `src/jquery.main.js` and
  `src/main.js` and uglifies it.  It will be minified if `grunt dist`
  is used.
- `jquery-?.?.?.min.js`: Jquery which is copied from node_modules to
  `assests/js`.

### Fonts
The main.scss is configured to use fontawsome.  Fontawesome's fonts
are copied from node_modules and put into `assets/webfonts`.


## Initial Setup

`setup.bash` in `scripts/` can be used to start a new project.  This
will create a new `package.json` and install several packages.  This
will give you the most recent versions.

In the project root in a bash terminal run:
`./scripts/setup.bash`

Alternatively you can use an existing `package.json` and run `npm
install` yourself.  Review `setup.bash` to ensure you have all the
requried packages.

If you wish to view the `.../sites.group/index.html` via a
`file://...` url, the link and script tags in the head need to be
changed to the commented ones that access the assets with the long
relative paths.


## BrowserSync

BrowserSync is setup to use it's own server by default.  Setting
`bsProxy` in `grunt-settings.js` will set the proxy for BrowserSync in
the gruntfile.  You can then use `grunt bsp`.


## Grunt Commands

- `grunt w`<br>
..Produce un-minified files then watch for changes.
- `grunt bs`<br>
..BrowserSync with watch.
- `grunt bsp`<br>
..Same as above but uses the proxy instead.
- `grunt dev`<br>
..Same as w, but also enables browserSync.
- `grunt dist`<br>
.. Produce minified files.
