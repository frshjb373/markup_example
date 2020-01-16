
## Initial Setup

1. Install packages
1. Run `./scripts/setup.bash` <br>
   This will create a new `package.json`
   and run `npm install ...` for all the packages.<br>
   If you have a package.json you want to use you can skip this step.


## Grunt Commands

- `grunt w`
  Produce un-minified files then watch for changes.
- `grunt dev`
  Same as watch, but also enables browserSync
- `grunt dist`
  Produce minified files.
