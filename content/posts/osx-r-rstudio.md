---
title: "Setting up R and R Studio on OS X using Homebrew"
date: 2018-01-27T14:39:41-05:00
draft: false
category: "tech"
tags:
    - macOS
    - r
---

If you use [Homebrew Bundle](https://github.com/Homebrew/homebrew-bundle), then you'll want to add the following lines:

```rb
cask 'rstudio'
cask 'r-app'
cask 'xquartz'
```

where

- [`rstudio`](https://www.rstudio.com) is the IDE
- [`xquartz`](https://en.wikipedia.org/wiki/XQuartz) is macOS' X11 alternative for creating GUIs e.g. R visualizations like histograms
- [`r-app`](https://github.com/caskroom/homebrew-cask/blob/master/Casks/r-app.rb) is the core language
  - *N.B* Don't use brew's [`r`](https://github.com/Homebrew/homebrew-core/blob/master/Formula/r.rb) formula unless you want package installs to be insanely slow as you wait for them to compile from source
