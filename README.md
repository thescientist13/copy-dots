# copy-dots
[![GitHub release](https://img.shields.io/github/tag/thescientist13/copy-dots.svg)](https://github.com/thescientist13/copy-dots/tags)
![GitHub Actions status](https://github.com/thescientist13/copy-dots/workflows/Master%20Integration/badge.svg)
[![GitHub issues](https://img.shields.io/github/issues-pr-raw/thescientist13/copy-dots.svg)](https://github.com/thescientist13/copy-dots/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/thescientist13/copy-dots/master/LICENSE.md)

## Overview

Quickly copy dot files (and more!) from one project into another project with a single command.  Great for scaffolding or initializing a new project!  🚀

![copy-dots](./.github/assets/dots.jpg)

## Demo

![copy-dots-demo](./.github/assets/copy-dots-demo.gif)

> _**Note**: by default **copy-dots** will ignore any filename with that contains `"git"` in it to avoid clobbering your local directory by accident.  Fear not!  You can enable support for this using our options (below 👇)!_

## Setup
Make sure to have [latest NodeJS LTS](https://nodejs.org/) installed.

## Usage

**copy-dots** has one required paramater, which is a path.  Additional options available to include other file types / patterns.

### Path (required)

**copy-dots** at least needs to know what path to copy your files from.

```sh
$ npx copy-dots ../../my-project
```

### Options (Coming Soon!)

**copy-dots** also support the following options to copy additional files.

- -l (License), 
- -g (git)
- -r (readme), 
- -w (all the flags)
- -c (config files)