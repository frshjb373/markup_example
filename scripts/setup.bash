#!/usr/bin/env bash

install_packages() {
    if [[ -d 'node_modules' ]]; then
        rm -rf node_modules
    fi
    cat <<-EOF > package.json
	{
	  "name": "website",
	  "version": "1.0.0",
      "private": true
	}
	EOF

    # grunt-contrib-uglify \
    npm install \
        @fortawesome/fontawesome-free \
        autoprefixer-core \
        bootstrap \
        cssnano \
        grunt \
        grunt-browser-sync \
        grunt-cli \
        grunt-combine-media-queries \
        grunt-contrib-clean \
        grunt-contrib-copy \
        grunt-contrib-imagemin \
        grunt-contrib-watch \
        grunt-csscomb \
        grunt-newer \
        grunt-notify \
        grunt-pngmin \
        grunt-postcss \
        grunt-purgecss \
        grunt-sass \
        grunt-sftp-deploy \
        grunt-svg2string \
        grunt-svgmin \
        grunt-svgstore \
        grunt-terser \
        jquery \
        load-grunt-tasks \
        node-sass \
        popper.js \
        \
        grunt-babel \
        @babel/core \
        @babel/preset-env \
        babel-preset-minify
}

echo
echo "This will overwrite package.json, delete node_modules,"
echo "and install new packages in the current directory."
while true; do
    read -p "  Continue? [y/n]: " yn
    case $yn in
        [Yy]* ) install_packages; break;;
        [Nn]* ) echo 'Doing nothing, bye.'; exit;;
        * ) echo 'Please answer y or n.'; exit;;
    esac
done
