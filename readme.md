
## File Structure
```
/node_modules
	any packages pulled through npm.
/assets
	/css
		compiled styles.css and styles.css.map
	/js
		compiled script.js
	/images
	/src_assets
		/css
		 	/vendor
		 		vendor folders .css files (animate.css, hover.css, etc.)
		/js
			/vendor
				vendor folders that include .js files (jquery.fancybox.js, fontawesome.js, etc.)
		/scss
			/vendor
				vendor folders that include .scss files
			_custom-styles.scss (custom styles and bootstrap overrides)
			_custom-variables.scss (custom variables and bootstrap variable overrides)
			_unit.scss (calcutates pixels into rems)
			_solspace_calendar.scss (used for ExpressionEngine Calendar addon)
			_styles.scss (calls all imports)
gulpfile.js
package.json
```
 1. run `npm update` to download files from package.json
 2. install gulp
 3. run `gulp` (note: must be Gulp 4.0 or newer)


 

