# UPCY_Mobile

## Before running the project

### MAC Settings - [Source](https://blog.naver.com/dongwook443/223384937148)

1. Install homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Ruby

```bash
brew install rbenv

rbenv install 2.7.5 # use rbenv v2.7.5

rben global 2.7.5 # set rbenv v2.7.5 as default
rbenv rehash

gem install bundler -v 2.4.22
```

3. Install React Native

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

. ~/.nvm/nvm.sh # activate nvm

nvm install 20.16.0 # we use v20.16.0
```

4. Install Watchman

```bash
brew install watchman
```

5. Install React Native CLI

```bash
npm install -g react-native-cli
npm install -g react-native
```

6. Install XCode

7. Install Cocoapods

```bash
brew install cocoapods
```

### How to run this project

- `/.env`, `/ios/Info.plist` files are required

### How to run this project via Ios simulator in Mac

- At root directory `/` run

```bash
yarn install
```

- Go to `/ios` and run

```bash
pod install
```

- Come back to root directory `/` and run

```bash
yarn start
```

By this, you can start the dev project via Ios simulator

### How to run this project via Android simulator in Mac
- Java 17 is required to run this project via Android simulator.
- To install Java 17, run

```bash
brew install openjdk@17
```

- Change the `~/.zshrc` file by running
```bash
vim ~/.zshrc
```

- Add the following lines at `~/.zshrc`
```markdown
# Android SDK Settings
export ANDROID_HOME=/your/path/to/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin

# Java Settings
export JAVA_HOME="$(brew --prefix openjdk@17)"
export PATH="JAVA_HOME/bin:$PATH"
```

- Run the following code at bash to apply
```bash
source ~/.zshrc
```

- Go to the root directory `/` and run
```bash
yarn install
yarn start
```

By this, you can start the dev project via Android simulator