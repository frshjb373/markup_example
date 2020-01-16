#!/usr/bin/env bash

install_packages() {
    cat <<-EOF > package.json
	{
	  "name": "website",
	  "version": "1.0.0"
	}
	EOF

    npm install \
        @fortawesome/fontawesome-free \
        autoprefixer-core \
        bootstrap \
        cssnano \
        grunt \
        grunt-browser-sync \
        # grunt-babel @babel/core @babel/preset-env \
        grunt-cli \
        grunt-combine-media-queries \
        grunt-contrib-clean \
        grunt-contrib-copy \
        grunt-contrib-imagemin \
        grunt-contrib-uglify \
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
        jquery \
        load-grunt-tasks \
        node-sass \
        popper.js
}

# {
#   "Name": "website",
#   "version": "1.0.0",
#   "dependencies": {
#     "@fortawesome/fontawesome-free": "^5.12.0",
#     "autoprefixer": "^9.7.3",
#     "autoprefixer-core": "^6.0.1",
#     "bootstrap": "^4.4.1",
#     "grunt": "^1.0.4",
#     "grunt-browser-sync": "^2.2.0",
#     "grunt-cli": "^1.3.2",
#     "grunt-combine-media-queries": "^1.0.20",
#     "grunt-contrib-clean": "^2.0.0",
#     "grunt-contrib-copy": "^1.0.0",
#     "grunt-contrib-imagemin": "^3.1.0",
#     "grunt-contrib-uglify": "^4.0.1",
#     "grunt-contrib-watch": "^1.1.0",
#     "grunt-csscomb": "^4.0.0",
#     "grunt-dart-sass": "^1.1.3",
#     "grunt-newer": "^1.3.0",
#     "grunt-notify": "^0.4.5",
#     "grunt-pngmin": "^1.3.0",
#     "grunt-postcss": "^0.9.0",
#     "grunt-purgecss": "^1.0.0",
#     "grunt-sass": "^3.1.0",
#     "grunt-sftp-deploy": "^0.2.5",
#     "grunt-svg2string": "^0.2.1",
#     "grunt-svgmin": "^6.0.0",
#     "grunt-svgstore": "^2.0.0",
#     "jquery": "^3.4.1",
#     "load-grunt-tasks": "^5.1.0",
#     "node-sass": "^4.13.0",
#     "popper.js": "^1.16.0"
#   }
# }

echo
echo "This will overwrite package.json and install npm packages in the current directory."
while true; do
    read -p "  Continue? [y/n]: " yn
    case $yn in
        [Yy]* ) install_packages; break;;
        [Nn]* ) echo 'Doing nothing, bye.'; exit;;
        * ) echo "Please answer y or n.";;
    esac
done

