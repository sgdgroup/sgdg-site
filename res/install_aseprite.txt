#!/usr/bin/env bash

DIR="$HOME/sgdg_aseprite"
EX_CMAKE="/Applications/CMake.app/Contents/bin/cmake"
NINJA_DIR="$DIR/ninja/build-cmake"
EX_NINJA="$DIR/ninja/build-cmake/ninja"
SKIA_DIR="$DIR/skia"
XCODE_DIR="/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs"

main () {
    show_info

    prep_dir
    check_cmake
    check_xcode
    install_ninja
    install_prebuilt_skia

    install_aseprite

    desktop_shortcut
    complete
}

complete () {
    clear
    msg "\nAseprite installation complete!\n"
    msg "A shortcut to the application has been added to your desktop."
}

desktop_shortcut () {
    ln -s "$DIR/aseprite/build/bin/aseprite" "$HOME/Desktop"
}

install_aseprite () {
     cd "$DIR"
     git clone --recursive https://github.com/aseprite/aseprite.git
     cd aseprite
     mkdir build
     cd build
     local XCODE_SDK=$(xcrun --sdk macosx --show-sdk-path)
     $EX_CMAKE -DCMAKE_BUILD_TYPE=RelWithDebInfo -DCMAKE_OSX_ARCHITECTURES=x86_64 -DCMAKE_OSX_DEPLOYMENT_TARGET=10.9 -DCMAKE_OSX_SYSROOT=$XCODE_SDK -DLAF_BACKEND=skia -DSKIA_DIR=$SKIA_DIR -DSKIA_LIBRARY_DIR=$SKIA_DIR/out/Release-x64 -DSKIA_LIBRARY=$SKIA_DIR/out/Release-x64/libskia.a -G Ninja ..
     $EX_NINJA aseprite
}

# pre built
install_prebuilt_skia () {
    cd "$DIR"
    curl -LOJ https://github.com/aseprite/skia/releases/download/m81-b607b32047/Skia-macOS-Release-x64.zip
    mkdir skia
    cd skia
    tar -xkf ../Skia-macOS-Release-x64.zip
    rm ../Skia-macOS-Release-x64.zip
}

# install it raw
install_ninja () {
    git clone git://github.com/ninja-build/ninja.git
    cd ninja
    git checkout release
    $EX_CMAKE -Bbuild-cmake -H.
    $EX_CMAKE --build build-cmake
    export PATH="$NINJA_DIR:$PATH"
}


# download yourself lol
check_xcode () {
    if [ ! -d "$XCODE_DIR" ]; then
        msg "=========="
        msg "We couldn't find Xcode on your computer. Aseprite needs the Xcode Command Line Tools to compile!"
        msg "\nVisit https://developer.apple.com/xcode/ to install Xcode."
        msg "\nOnce the app is in your /Applications folder, run this script again."
        msg "=========="
        exit 2
    fi
}

# download yourself lol
check_cmake () {
    if [ ! -f "$EX_CMAKE" ]; then
        msg "=========="
        msg "We couldn't find CMake on your computer. Aseprite needs that to compile!"
        msg "\nVisit https://cmake.org/download/ and download the DMG file under binary distributions."
        msg "\nOnce the app is in your /Applications folder, run this script again."
        msg "=========="
        exit 1
    fi
}

msg () {
    printf "$1\n"
}

prep_dir () {
    mkdir -p "$DIR"
    cd "$DIR"
}

show_info () {
    clear
    echo ""
    echo "install_aseprite.sh"
    echo "Download and compile the open-source version of Aseprite for free!"
    echo ""
    echo "For SGDG member use."
    echo "https://sgdgroup.org"
    echo ""
    echo "This might take a while, by the way."
    echo ""
    wait
}

wait () {
    read -n 1 -s -r -p "[Press any key to start]"
    echo ""
}


main