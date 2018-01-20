---
title: "Writing my first Golang package to help move from 1Password to KeePassXC"
cover: "https://blog.newrelic.com/wp-content/uploads/golang-gopher.jpg"
date: "1/20/2018"
category: "tech"
tags:
    - programming
    - golang
    - "password managers"
---

Motivations for switching password managers and reflecting on pushing out my first Golang package.

[See the source][source]

## Table of Contents

* [Intro](#intro)
* [Reflections on Go](#reflections-on-go)
* [Recommended Tooling](#recommended-tooling)

## Intro

I recently became interested in switching from [1Password][onepassword] to [KeePassXC][keepassxc] as my primary password manager. While 1Password's desktop application's UI is by far the best I've seen among password managers, and while it's browser extensions are similarly slick, I wanted something

* with better cross-platform support (1Password doesn't have a dedicated Linux download, but you can hack it with [Wine][wine])
* that was open source (I expensed my 1Password license when I worked at [Abacus][abacus] and expensing was easy, but didn't feel like having to justify any new software at my current company)

I needed to be able to bulk export my 1Password data so that I could import it into KeePassXC. 1Password supports exporting to 1Password Interchange Format (1pif) files, and KeePassXC has a primitive CSV import as of 2.2.0.

Implementing a conversion script in Python probably would have been the fastest path for me, but I've wanted to learn more [Go][golang], and figured that building a full-on package would be a good opportunity to learn more about the language as well as the [metalanguage](https://medium.com/@frantic/understanding-taming-the-meta-language-df38d2dcae18).

## Reflections on Go

> It's a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language
> - golang.org/doc

I spend most of my time working with dynamically typed, interpreted languages like Javascript, Ruby, and Python, so the switch to something statically typed and compiled was a definite change from my status quo. While Go certainly doesn't feel as cumbersome as Java, it does feel noticeably stricter than the above three. It doesn't allow for cowboy coding, tacking on state to objects at the last minute, confusion arounding what data different branches of code pass around, etc. which are, of course, all welcome aspects of a programming langauge. One downside is the overhead in lines of code written, but that seems like an inconsequential tradeoff for exactitude.

Further, Go's ability to surface errors at compile time spared me much headache and gave me much higher confidence in my code.

> Writing and running tests was easy and didn't require looking into an elaborate testing framework or toolchain

Tests were again more verbose than I'm accustomed to but, again, very exact. I found [this article's][go-test-tips] recommendations around the use of _golden_ files (kind of like Jest snapshots in JS, or Ruby VCR cassettes), helper functions, and test data to be useful. I _did_ disregard one recommendation around not using a test framework and used [st](https://github.com/nbio/st) for it's expect/assert/reject additions.

One frustration around testing was that, since I used subfolders instead of purely top level `*.go` files, my make target for running tests started to look like:

```sh
go test -v -race opass/*
go test -v -race kpxc/*
...
```

Once this also started applying to my `lint` and `vet` targets, I decided it was time to bring in a cleaner solution:

```make
SRC = ". ./cli/ ./logger/ ./version/ ./kpxc/ ./opass/ ./secret/"

test:
	@echo ${SRC} | xargs -n1 go test -race
```

> Get used to releasing a binary, not a package

As mentioned above, I spend most of my time working with languages like Javascript, Ruby, and Python, where releasing a package means pushing it to NPM, RubyGems, or PyPi (or an on-premises equivalent), and using it in the context of a e.g. Python installation.

For Go, I needed to learn how to, as part of CI, build and publish a binary. Between the packages mentioned in [GoLang Weekly][go-weekly] and that appear in GitHub's [golang topic list](https://github.com/topics/golang), I quickly stumbled across [github-release][gh-release] and [equinox][equinox]. I use the former to get release tarballs into GitHub, and am planning to update my project to also release using equinox (so that e.g. kpxcconvert can be installed via [Homebrew](https://equinox.io/docs#brew)).

And yeah, being able to release an executable instead of a package that needs a language installation is _so_ much nicer.

## Recommended Tooling

- [vim-go](https://github.com/fatih/vim-go) for Vim users
- [glide](https://github.com/Masterminds/glide) for package management
- [golint](https://github.com/golang/lint/golint) for linting
- [gox](https://github.com/mitchellh/gox) for building binaries for different platforms
- [github-release](https://github.com/c4milo/github-release) for pushing binaries to GitHub

[golang]: https://golang.org
[go-test-tips]: https://medium.com/@povilasve/go-advanced-tips-tricks-a872503ac859
[go-weekly]: https://golangweekly.com/
[abacus]: https://www.abacus.com/
[onepassword]: https://1password.com
[keepassxc]: https://keepassxc.org/
[source]: https://github.com/keepassxreboot/keepassxc
[wine]: https://www.winehq.org/
[gh-release]: https://github.com/c4milo/github-release
[equinox]: https://equinox.io/
