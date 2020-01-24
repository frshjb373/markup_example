#!/usr/bin/env bash

# copy files from this grunt boilerplate to another dir such as the EE
# boilerplate.  This is so that these two projects can stay seperate.

usage="Usage: $(basename $0) DESTINATION-DIR"
if [[ ! $1 ]]; then
    echo
    echo 'Error: A destination dir is required.'
    echo $usage
    exit
fi
if [[ ! -d $1 ]]; then
    echo
    echo 'Error: The destination does not exist or is not a dir.'
    echo $usage
    exit
fi
if [[ ! -e Gruntfile.js ]]; then
    echo
    echo 'This script can only be run from the root'
    echo 'of this project (where Gruntfile.js is).'
    exit
fi

copy_files=(
    scripts/setup.bash
    src
    Gruntfile.js
    grunt-settings.js
)
delete_files=(
    # package.json
    # package-lock.json
)

echo
echo "This will update another dir with files from this project."
echo
echo "These files will be deleted from the destination:"
# printf '  * %s\n' "${delete_files[@]}"
printf '  * %s\n' "${copy_files[@]}"
echo
echo "These will be copied to the boilerplate:"
printf '  * %s\n' "${copy_files[@]}"
echo

while true; do
    read -p "Continue? [y/n]: " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) echo 'Doing nothing, bye.'; exit;;
        * ) echo 'Please answer y or n.'; exit;;
    esac
done

dest=$1
start=$(pwd)

delete() {
    full=$(realpath -m $1)
    flags=''
    if [[ -d $full ]]; then
        flags='-rf'
    fi
    cmd="rm $flags $full"
    echo $cmd
    $cmd
}

copy() {
    full_start=$(realpath $1)
    full_end=$(realpath -m $2)

    if [[ ! -e $full_start ]]; then
        echo "File does not exist: $full_start"
        exit 1
    fi
    flags=''
    if [[ -d $full_start ]]; then
        flags='-r'
    fi
    cmd="cp $flags $full_start $full_end"
    echo $cmd
    $cmd
}

# delete files
all=("${delete_files[@]}" "${copy_files[@]}")
for f in "${all[@]}"; do
    delete $dest/$f || exit
done

# copy files
for f in "${copy_files[@]}"; do
    copy $start/$f $dest/$f || exit
done

