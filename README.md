
## Overview

All vendor files are pulled from the `node_modules` dir.  In this
repo, jQuery and bootstrap are configured.

All files that you will edit are in the `src` dir *except* for the HTML
files which should go into
`public_html/library/user/templates/default_site/site.group/`.  This
is to simulate the structure of ExpressionEngine.

When grunt's tasks are run, files from `src` are processed and put in
`public_html/assets/...`.

Note that when `grunt dist` is run, **all** files in `assets` will be
deleted and then rebuilt with new files.  Any files manually put in
assets will be deleted.

### src/

##### SCSS
- `scss/main.scss` &mdash;
  imports _bootstrap.scss
- `scss/_bootstrap.scss` &mdash;
  imports bootstrap from node_modules and _bootstrap_custom.scss
- `scss/_bootstrap_custom.scss` &mdash;
  custom settings for bootstrap

##### JS
- `js/main.js` &mdash;
  MC2's js code
- `js/jquery.main.js` &mdash;
  Contractor's js code

##### Images
Images placed here will be processed by imagemin or svgmin and placed
in `public_html/images`.

### public_html/assets/

##### CSS
- `main.css`: has bootstrap imported into it.
- `main.purged.css`: an experimental purged version of main.css using
  purgecss.  Since purgecss can sometimes remove to much css it's a
  separate file.

##### JS
- `main.js`: The main JS file which concats `src/jquery.main.js` and
  `src/main.js` and uglifies it.  It will be minified if `grunt dist`
  is used.
- `jquery-?.?.?.min.js`: jQuery which is copied from node_modules to
  `assests/js`.

##### Fonts
The main.scss is configured to use fontawsome.  Fontawesome's fonts
are copied from node_modules and put into `assets/webfonts`.

### File structure
```
src
├── images
│   └── <any images...>
├── js
│   ├── jquery.main.js
│   └── main.js
└── scss
    ├── _bootstrap-custom.scss
    ├── _bootstrap.scss
    └── main.scss

public_html
├── assets
│   ├── css
│   │   ├── main.css
│   │   └── main.css.map
│   ├── js
│   │   ├── jquery.min.js
│   │   ├── main.js
│   │   └── main.js.map
│   └── webfonts
│       └── <many files...>
└── library
    └── user
        └── templates
            └── default_site
                └── site.group
                    └── index.html
```

## Setup

1. **Install packages**

   `setup.bash` in `scripts/` can be used to start a new project.  This
   will create a new `package.json` and install several packages.  This
   will give you the most recent versions.

   In the project root in a bash terminal run:
   `./scripts/setup.bash`

   Alternatively you can use an existing `package.json` and run `npm
   install` yourself.  Review `setup.bash` to ensure you have all the
   required packages.

2. **View test page**

   After the packages are installed you can run `grunt dev` to view the
   test page (`.../sites.group/index.html`).

   If you wish to view the test page via a `file://...` url, the link
   and script tags in the head need to be changed to the commented
   ones that access the assets with the long relative paths.

#### BrowserSync

BrowserSync is setup to use it's own server by default.  If you want
to use a different server, set `bsProxy` in `grunt-settings.js`.  This
will set the proxy for BrowserSync in `Gruntfile.js`.  You can then use
`grunt devp` instead of `grunt dev`.

<!--
Note: If JS looks like it isn't reloading, I've found that going to the UI
url (http://localhost:3001) and toggling some settings makes it work.
-->

## Grunt Commands

- `grunt w` &mdash;
  Produce un-minified files then watch for changes.
- `grunt dev` &mdash;
  Same as w, but also enables BrowserSync.
- `grunt devp` &mdash;
  Same as above but uses the proxy instead.
- `grunt dist` &mdash;
   Produce minified files.
