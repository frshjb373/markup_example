/* global module */

let jsSrcDir = 'src/js/'

module.exports = {
  /*
   * SASS
   * ----
   * Sass files are compiled and put in the `cssDir` location.
   *
   * sassDir
   *   Source dir for the sass file.
   *
   * sassMainFileName
   *   Main working sass file, base name, no extention.
   *
   * sassLoadPath (array)
   *   An array of paths that sass imports will load from.  For
   *   example, `@import "bootstrap"` in main.scss will be imported
   *   from one of these paths.
   */
  sassDir:          'src/scss/',
  sassMainFileName: 'main',
  sassLoadPath:     ['node_modules/bootstrap/scss/',
                     'node_modules/@fortawesome/fontawesome-free/scss'],

  /*
   * CSS
   * ---
   * cssDir / cssMainFileDir
   *   Destination dir for generated css.
   *
   * cssMainFileName
   *   The base name of the main css file.  This will be used when
   *   creating the file from sass.  `.css` or `.min.css` will be
   *   appended to it.
   */
  // cssDir:           'public_html/assets/css/',
  cssMainFileDir:   'public_html/assets/css/',
  cssMainFileName:  'main',

  /*
   * JS
   * --
   * jsDir
   *   Source dir for all js files?
   *
   * jsMainFileDir
   *   Destination js dir.
   *
   * jsFiles (array)
   *   These are processed by Terser and concated togeather in the
   *   order they are in the array.  The created file is named main.js
   *   and placed in `jsMainFileDir`.
   *
   * jsVendorFiles (array)
   *   Any files in this array are just copied directly to
   *   `jsMainFileDir` without any processing.
   */
  jsDir:            jsSrcDir, // js src dir
  jsMainFileDir:    'public_html/assets/js/',
  jsMainFileName:   'main',
  jsFiles: [
    `${jsSrcDir}/jquery.main.js`, // Markup's js file
    `${jsSrcDir}/main.js`,        // MC2's js file
  ],
  jsVendorFiles: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
  ],

  /*
   * Fonts
   * -----
   * fontDest: destination dir for the fonts
   * fontSource: dir with the downloaded webfonts
   *
   * Copy the contents of fontSource to fontDest
   *
   * Note that the fontawesome sass load dir is set in `sassLoadPath`
   */
  fontSource: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
  fontDest: 'public_html/assets/webfonts',

  /*
   * BrowserSync
   * -----------
   * bsProxy: set the url for when not using browsersync's server
   */
  bsProxy: 'http://www.example.com',

  /*
   * Images
   * ------
   * Images in imgSourceDir are processed by svgmin and pngmin
   */
  imgSourceDir:     'src/images/',
  imgDir:           'public_html/assets/images/',

  // location of dir to server files from when using browserSync when
  // not using a server.
  templatesDir:     'public_html/library/user/templates/default_site/site.group/',

  nodeModulesBootstrapDist: 'node_modules/bootstrap/dist/',
}
