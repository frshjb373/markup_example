/* global module require */


module.exports = function(grunt) {
  const config = require('./grunt-settings.js')
  const sass = require('node-sass')
  var err = function(msg){
    grunt.fail.fatal(msg)
  }

  require('load-grunt-tasks')(grunt)
  grunt.loadNpmTasks('grunt-purgecss')

  // tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,

    //clean files
    clean: {
      options: {
        // 'no-write': true,
      },
      assets: {
        src: [
          (config.cssDir) ? config.cssDir : err('cssDir not set'),
          (config.jsMainFileDir) ? config.jsMainFileDir : err('jsMainFileDir not set'),
          (config.imgDir) ? config.imgDir : err('imgDir not set'),
          (config.fontDest) ? config.fontDest : err('fontDest not set'),
        ],
      }
    },

    postcss: {
      dev: {
        options: {
          map: true,
          processors: [
            require('autoprefixer-core')({browsers: ['last 4 version', 'Android 4']})
          ]
        },
        src: [
          '<%= config.cssDir %>*.css',
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
          '<%= config.cssDir %>bootstrap.css',
          '<%= config.cssDir %>bootstrap.min.css',
          '<%= config.cssDir %>ie.css',
          '<%= config.cssDir %>ie8.css',
        ]
      },
      dist: {
        options: {
          map: false,
          processors: [
            require('autoprefixer-core')({browsers: ['last 4 version', 'Android 4']}),
            require('cssnano')(),
          ]
        },
        src: [
          '<%= config.cssDir %>*.css',
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
          '<%= config.cssDir %>bootstrap.css',
          '<%= config.cssDir %>bootstrap.min.css',
          '<%= config.cssDir %>ie.css',
          '<%= config.cssDir %>ie8.css',
        ]
      }
    },

    //sass
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
        includePaths: '<%= config.sassLoadPath %>',
      },
      dev: {
        options: {
          sourceMap: true,
          style: 'nested',
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: [
              '**/*.scss',
              '!<%= config.sassMainFileName %>.scss'
            ],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
          },
        ]
      },
      dist: {
        options: {
          sourceMap: false,
          style: 'compressed',
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: [
              '**/*.scss',
              '!<%= config.sassMainFileName %>.scss'
            ],
            dest: '<%= config.cssDir %>',
            ext: '.css'
          },
          {
            src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss',
            dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
          }
        ]
      },
      min: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.sassDir %>',
            src: [
              '**/*.scss',
              '!<%= config.sassMainFileName %>.scss'
            ],
            dest: '<%= config.cssDir %>',
            ext: '.min.css',
          },
          // {src: '<%= config.sassDir %><%= config.sassMainFileName %>.scss', dest: '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.min.css'}
        ]
      }
    },

    // Version of uglify that supports ES6
    terser: {
      dev: {
        options: {
          toplevel: true,
          mangle: false,
          compress: false,
          output: {
            comments: true,
          },
          sourceMap: {
            includeSources: true
          },
        },
        files: {
          '<%= config.jsMainFileDir %>/<%= config.jsMainFileName %>.js': config.jsFiles,
        },
      },
      dist: {
        options: {
          toplevel: true,
          mangle: false,
          compress: true,
          sourceMap: {
            includeSources: true
          },
        },
        files: {
          '<%= config.jsMainFileDir %>/<%= config.jsMainFileName %>.js': config.jsFiles,
        },
      },
    },

    babel: {
      options: {
      },
      dev: {
        options: {
          sourceMap: true,
          presets: ['@babel/preset-env'],
        },
        files: {
          // 'destination': 'source',
          '<%= config.jsMainFileDir %>/<%= config.jsMainFileName %>.js': '<%= config.jsMainFileDir %>/<%= config.jsMainFileName %>.js',
        }
      },
      dist: {
        options: {
          sourceMap: false,
          presets: ['@babel/preset-env', 'minify'],
        },
        files: {
          // 'destination': 'source',
          '<%= config.jsMainFileDir %>/<%= config.jsMainFileName %>.js': '<%= config.jsMainFileDir %>/<%= config.jsMainFileName %>.js',
        }
      }
    },

    //watcher project
    watch: {
      options: {
        debounceDelay: 1,
        // livereload: true,
      },
      images: {
        files: ['<%= config.imgSourceDir %>**/*.*'],
        tasks: [/*'img:jpg', 'newer:pngmin:all', 'newer:svgmin'*/ 'newer:copy:images'],
        options: {
          spawn: false
        }
      },
      // svgSprites: {
      //   files: ['<%= config.imgSourceDir %>svg-icons/*.*'],
      //   tasks: ['svgstore', 'svg2string'],
      //   options: {
      //     spawn: false
      //   }
      // },
      css: {
        files: ['<%= config.sassDir %>**/*.scss'],
        tasks: ['sass:dev', 'postcss:dev'],
        options: {
          spawn: false,
        }
      },
      jsTerser: {
        files: ['<%= config.jsDir %>**/*.js'],
        tasks: ['terser:dev'],
        options: {
          spawn: false,
        }
      },
      jsBabel: {
        files: ['<%= config.jsMainFileDir %>**/*.js'],
        tasks: ['babel:dev'],
        options: {
          spawn: false,
        }
      },
      bootstrap: {
        files: ['<%= config.nodeModulesBootstrapDist %>'],
        tasks: ['copy:bootstrap'],
        options: {
          spawn: false,
        }
      },
      vendorJs: {
        files: config.jsVendorFiles,
        tasks: ['copy:js'],
        options: {
          spawn: false,
        }
      },
    },

    copy: {
      images: {
        expand: true,
        cwd: '<%= config.imgSourceDir %>',
        src: '**',
        dest: '<%= config.imgDir %>',
        //flatten: true,
        filter: 'isFile',
      },
      bootstrap: {
        expand: true,
        cwd: '<%= config.nodeModulesBootstrapDist %>css/bootstrap.css',
        src: '**',
        dest: '<%= config.cssDir %>',
        //flatten: true,
        filter: 'isFile',
      },
      js: {
        nonull: true,
        src: config.jsVendorFiles,
        dest: config.jsMainFileDir,
        flatten: true,
        expand: true,
      },
      fonts:{
        nonull: true,
        src: config.fontSource,
        dest: config.fontDest,
        flatten: true,
        expand: true,
      },
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= config.imgSourceDir %>',
          src: ['**/*.{jpg,gif}'],
          dest: '<%= config.imgDir %>'
        }]
      }
    },

    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['**/*.svg'],
            cwd: '<%= config.imgSourceDir %>',
            dest: '<%= config.imgDir %>'
          }
        ]
      }
    },

    // svgstore: {
    //   options: {
    //     prefix : 'icon-', // This will prefix each ID
    //     svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
    //       viewBox : '0 0 100 100',
    //       xmlns: 'http://www.w3.org/2000/svg'
    //     },
    //     cleanup: ['fill']
    //   },
    //   your_target: {
    //     files: {
    //       '<%= config.imgDir %>svg-sprites/sprite.svg': ['<%= config.imgDir %>svg-icons/*.svg'],
    //     },
    //   },
    // },

    // svg2string: {
    //   elements: {
    //     options: {
    //       template: '(window.SVG_SPRITES = window.SVG_SPRITES || {})["[%= filename %]"] = [%= content %];',
    //       wrapLines: false
    //     },
    //     files: {
    //       '<%= config.jsDir %>svg-sprites.js': [
    //         // '<%= config.imgDir %>sprite.svg',
    //         '<%= config.imgDir %>svg-sprites/sprite.svg'
    //       ]
    //     }
    //   }
    // },

    // lossy image optimizing (compress png images with pngquant)
    pngmin: {
      all: {
        options: {
          ext: '.png',
          force: true
        },
        files: [
          {
            expand: true,
            src: ['**/*.png'],
            cwd: '<%= config.imgSourceDir %>',
            dest: '<%= config.imgDir %>'
          }
        ]
      },
    },

    //Keep multiple browsers & devices in sync when building websites.
    browserSync: {
      file_based: {
        bsFiles: {
          src : [
            '*.html',
            '<%= config.cssDir %>*.css',
            '*.css',
            '<%= config.jsMainFileDir %>*.js',
            '<%= config.templatesDir %>**/**/*.*',
            '<%= config.templatesDir %>*.*',
            '<%= config.fontDest %>/*',
          ],
        },
        options: {
          server: {
            baseDir: config.templatesDir,
            routes: {
              // url : file path relative to Gruntfile.js
              '/assets': 'public_html/assets/',
            },
          },
          watchTask: true,
        }
      },
      server_based:{
        bsFiles: {
          src : [
            '*.html',
            '<%= config.cssDir %>*.css',
            '*.css',
            '<%= config.jsMainFileDir %>*.js',
            '<%= config.templatesDir %>**/**/*.*',
            '<%= config.templatesDir %>*.*',
            '<%= config.fontDest %>/*',
          ],
        },
        options: {
          proxy: config.bsProxy,
          watchTask: true,
        }
      },
    },

    notify: {
      options: {
        enabled: true,
        max_js_hint_notifications: 5,
        title: "WP project"
      },
      watch: {
        options: {
          title: 'Task Complete',  // optional
          message: 'SASS finished running', //required
        }
      },
    },

    csscomb: {
      all: {
        expand: true,
        src: ['<%= config.cssDir %>*.css',
              '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
              '<%= config.cssDir %>bootstrap.css',
              '<%= config.cssDir %>ie.css',
              '<%= config.cssDir %>ie8.css'
             ],
        ext: '.css'
      },
      dist: {
        expand: true,
        files: {
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css' : '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css',
          '<%= config.cssDir %>bootstrap.css' : '<%= config.cssDir %>bootstrap.css',
          '<%= config.cssDir %>bootstrap-extended.css' : '<%= config.cssDir %>bootstrap-extended.css'
        },
      }
    },

    cmq: {
      options: {
        log: false
      },
      all: {
        files: [
          {
            expand: true,
            src: [
              '**/*.css',
              '!bootstrap.css'
            ],
            cwd: '<%= config.cssDir %>',
            dest: '<%= config.cssDir %>'
          }
        ]
      },
      dist: {
        files: {
          '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css' : '<%= config.cssMainFileDir %><%= config.cssMainFileName %>.css'
        },
      }
    },

    purgecss: {
      dist: {
        options: {
          whitelistPatterns: [/some.*thing/], // regex array
          whitelist: [],
          content: [
            '<%= config.templatesDir %>/**/*.html',
          ]
          .concat(config.jsFiles)
          .concat(config.jsVendorFiles),
        },
        files: {
          // 'destination css': 'source css'
          '<%= config.cssDir %><%= config.cssMainFileName %>.purged.css':
            '<%= config.cssDir %><%= config.cssMainFileName %>.css'
        },
      },
    },
  });


  // watch
  grunt.registerTask(
    'w',
    'Watch src for changes',
    ['sass:dev', 'terser:dev', 'newer:copy:js', 'newer:copy:fonts', 'watch']
  );
  // watch with babel
  grunt.registerTask(
    'wb',
    'Watch src for changes and use Babel instead of Terser',
    ['sass:dev', 'newer:copy:js', 'terser:dev', 'babel:dev', 'newer:copy:fonts', 'watch']
  );

  // browser sync
  grunt.registerTask(
    'bs',
    'BrowserSink not using a proxy',
    ['browserSync:file_based', 'watch']
  );
  grunt.registerTask(
    'bsp',
    'BrowserSync using a proxy',
    ['browserSync:server_based', 'watch']
  );

  // browsersync + watch
  grunt.registerTask(
    'dev',
    'Non minified files with BrowserSync and watch',
    ['sass:dev', 'terser:dev', 'newer:copy:js', 'newer:copy:images', 'newer:copy:fonts', 'bs']
  );
  grunt.registerTask(
    'devp',
    'Same as dev but BrowserSync uses a proxy',
    ['sass:dev', 'terser:dev', 'newer:copy:js', 'newer:copy:images', 'newer:copy:fonts', 'bsp']
  );

  //create svg sprite
  // grunt.registerTask('svgsprite', ['svgmin', 'svgstore', 'svg2string']);

  grunt.registerTask('default', ['dev']);


  //css beautiful
  grunt.registerTask('cssbeauty', ['sass:dist', 'cmq:dist', 'postcss:dist', 'csscomb:dist']);
  //img minify
  grunt.registerTask('imgmin', ['imagemin', 'pngmin:all', 'svgmin']);
  // purge css
  grunt.registerTask('purge', ['purgecss:dist']);

  //final build
  grunt.registerTask(
    'dist',
    'Clean dist dir and minify src files',
    ['clean:assets', 'sass:min', 'terser:dist', 'newer:copy:js', 'newer:copy:fonts', 'imgmin', 'cssbeauty', 'purgecss:dist']
  );
};
