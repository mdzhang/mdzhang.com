---
title: "Migrate from Middleman to Gatsby"
cover: "https://cdn-images-1.medium.com/max/1262/1*qkfh8Ya9io6F4joucU0eqg.png"
date: "12/10/2017"
category: "tech"
tags:
    - programming
    - javascript
    - gatsby
---

How I migrated my personal site, <http://mdzhang.com> from[Middleman][middleman] to [GatsbyJS][gatsby]

[See the source][source]

## Table of Contents

* [Intro](#intro)
* [Initial Exploration](#initial-exploration)
* [Initial Scaffolding](#initial-scaffolding)
* [Customizing the UI](#customizing-the-ui)
* [Code Customizations](#code-customizations)
* [Deploying it](#deploying-it)
* [Final Thoughts](#final-thoughts)

## Intro

I came across [GatsbyJS][gatsy] when perusing my Github ["Discover Repositories" feed](https://github.com/dashboard/discover) on a lark. It didn't take much link surfing to soon find myself reading about the [JAMStack][jamstack], and not much more time after that to be convinced enough that I was ready to move my personal site off [Middleman][middleman].

I should caveat that my personal site has never been that big - it was just a few static pages - and I wasn't tied to the visual design of my old site, which made the switch much simpler than if e.g. I was trying to recreate my original site exactly or if I was trying to recreate an enterprise site.

At any rate, I had originally switched to Middleman since it was Ruby based and because I've always tended to use tools for my personal site that align with the tools I'm using at work (at the time, I had been working at [Blue Apron](https://www.blueapron.com/), a Rails shop).

But after a little over a year with it, my main gripes with Middleman and how I was using it were that:

1. I've never liked mixing Ruby and NodeJS for static websites, or websites with no backend. Ruby has some more sane language constructs and standard libraries, for sure, but it feels to me like it's meant for devs that want the right tool _in Ruby_ for the job rather than the right tool for the job _period_.
1. Using `.haml` templates felt outdated and constrictive, but adding React seemed like a pain. I've used React for my last two jobs as well as a couple side projects - the issue wasn't React and it's ecosystem (at least not for me), but figuring out how to tie it into a framework (i.e. Middleman) I didn't really feel it needed to be tied into given the problem at hand.

All in all, I was more than happy to move over to a pure JS solution, especially if I could leverage a library that would make the process easy.

## Initial exploration

First, I tried out the tutorial, or at least enough of it that I would get a feel for the toolchain and the project organization. Which boiled down to first setting up my environment:

1. Ensure I had (the latest) [Homebrew][brew] installed
  ```sh
  curl -fsS 'https://raw.githubusercontent.com/Homebrew/install/master/install' | ruby
  brew update
  brew cleanup
  ```

1. Grab [nodenv](https://github.com/nodenv/nodenv) for managing different node versions
  ```sh
  brew install nodenv
  ```

1. Grab the latest `8.x` version of node (Initially I went for the latest version of node, but [`node-sass`](https://github.com/sass/node-sass/releases/tag/v4.5.3) wasn't having it):
  ```sh
  nodenv install $(nodenv install --list | grep -P '^\s+8\.\d\.\d$' | tail -1)
  nodenv global $(nodenv install --list | grep -P '^\s+8\.\d\.\d$' | tail -1)
  node --version
  ```

1. Install `yarn` and `gatsby-cli`
  ```sh
  npm install -g yarn gatsby-cli
  nodenv rehash
  ```

And then following the actual docs:

1. Initialize a new project
  ```sh
  gatsby new mdzhang.com
  cd mdzhang.com
  ```

1. Start a dev server
  ```sh
  gatsby develop
  ```

And then I poked around the UI and the code, mostly to make sure that:

1. Everything Just Worked ™ (which, for the most part, it did!)
1. The starter code itself and project organization was sane

When everything checked out, I wanted to try looking at some of the other [starters](https://www.gatsbyjs.org/docs/gatsby-starters/) they had mentioned on that same tutorial page. The demos they link out to helped speed up the process of evaluating the UIs, and I ended up settling on the [`gatsby-material-starter`](https://github.com/Vagr9K/gatsby-material-starter) which covered a lot of the SEO concerns I had already built into my personal site, <http://mdzhang.com>.

## Initial scaffolding

So I went ahead and:

1. Generated the site
  ```sh
  gatsby new mdzhang.com https://github.com/Vagr9K/gatsby-material-starter
  ```

1. Setup version control
  ```sh
  # init generated project as a git repo
  git init
  # check in all files not ignored by Gatsby's default .gitignore
  git add .
  git commit -m "Use gatsby"
  # switch from default `master` branch to `gatsby` branch
  git checkout -b gatsby
  # add the origin remote as my existing project repo
  git remote add origin https://github.com/mdzhang/mdzhang.com.git
  # rebase on master, but prefer current `gatsby` branch changes
  git rebase -s recursive -X theirs master
  # force push since we rebased
  git push -f origin gatsby
  ```

1. Hand edited the `data/SiteConfig.js` with content from my Middleman `data/*yml` files
1. Opted _not_ to move over my 1 blog post from my Middleman `source/blog` dir into `content/posts`
1. Updated `package.json` with project specific info i.e.
  ```json
    "name": "mdzhang.com",
    "description": "Michelle D Zhang Personal Site.",
    "version": "1.0.0",
    "author": "Michelle D Zhang <zhang.michelle.d@gmail.com>",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/mdzhang/mdzhang.com"
    }
  ```
1. Updated the dependencies to their latest versions (I _really_ recommend this, as I ran into markdown rendering issues with remark that were fixed in later versions)
  ```sh
  yarn upgrade --latest
  ```
1. Reverted to my original `README.md`, instead of the Gatsby provided one
1. Re-added some old static files I kept around e.g.
    - A `keybase.txt` verification file
    - A `mywot*.txt` verification file
    - A `google*.txt` webmaster verification file

And I was off! Now for some UI customization and deployment infrastructure.

## Customizing the UI

This boiled down to customizing [react-md](https://react-md.mlaursen.com/), which ended up taking way more perusing of the source `.scss` files than I would've liked. The good news is that everything I wanted to customize, I could customize. The bad news was that:

1. As I mentioned, I had to dig into the source, because things you'd expect, like `$md-dark-theme-app-bar-color` defaulting to `$md-primary-color` or `$md-dark-theme-background-color` when `$md-light-theme: false` is set don't actually happen
2. The default `scss` organization for the starter I used didn't actually let you override the theme i.e. in `src/layouts/index.jscss`:
   ```sh
  @import '~react-md/src/scss/react-md';
  @import 'theme.scss';
  @include react-md-everything;
  ```

    needed to be changed to

    ```sh
    @import 'theme.scss'; // <- where I overwrote $md-* variables
    @import '~react-md/src/scss/react-md';
    @include react-md-everything;
    ```

    otherwise all the defaults in `react-md`'s `scss` file are used to set variables, instead of the overrides I added in `theme.scss`

I would also point out that some aspects of the UI (specifically `gatsby-material-starter`'s usage of CSS flexbox) was a little off - but that's more bug-fixing than it is theming.

On a sidenote, I ended up opting for a color palette like the one used by [`vim-hybrid`](https://github.com/w0ng/vim-hybrid) and used <https://terminal.sexy> to pull the hex codes.

## Code customizations

These are probably too specific to my project/starter to be worth going into much detail, but I would throw out that I:

1. Added a [`404.jsx` page](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/src/pages/404.jsx) so my S3 bucket could use `404.html` as its error page
1. Added a [placeholder card](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/src/components/PostListing/PostListing.jsx#L23) to show when there were no blog posts since I wasn't adding any during that first iteration
1. Edited how posts were rendered when they didn't have preceding or ensuing posts (the default behavior was to have the next and previous post default to the current post, which was odd)

## Deploying it

I had previously already configured my site to deploy to an S3 bucket (more on that [here](https://github.com/mdzhang/mdzhang.com/tree/2.4.0#deployment-setup)), so instead of using Middleman to do the build and S3 upload, I moved to having Gatsby do the build and Grunt do the upload.

Specifically to do the build into a `public` directory:
  ```sh
  gatsby build
  ```

And, given [this Gruntfile.js](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/Gruntfile.js) which registers a `deploy` task leveraging [`grunt-aws-s3`](https://github.com/MathieuLoutre/grunt-aws-s3):
  ```sh
  grunt deploy
  ```

(I had the AWS environment variables needed in my Grunt task set locally using [`direnv`](https://direnv.net/)).

### Continuously deploying it

TL;DR I used this [circle.yml](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/circle.yml).

I tinkered with updating to Circle 2.0, and while it is _way_ faster than it's 1.0 counterpart, I found myself running into issue after issue including:

* having to `yarn install global node-gyp` to get `yarn` commands to work
* being forced to use CircleCI's docker images (which have no clear source code) because CircleCI couldn't pull a simple `node:8.9.3` docker image
* it not being clear via the documentation how to set environment variables based on workflow filters e.g. `NODE_ENV=staging` when on the `development` branch
* etc.

So once my patience ran out I just re-used my old CircleCI config, with a couple of changes to account for deploying via grunt instead of Middleman (made easy by using make-like build utilities for different languages whenever possible e.g. `rake`, `npm`, etc).

A somewhat tangential thought - after revisiting CircleCI 1.0, trying out CircleCI 2.0, and then briefly considering using Travis, I am especially appreciative of being able to use [GitLab CI](https://about.gitlab.com/features/gitlab-ci-cd/) at work.

## Final Thoughts

Transitioning to use GatsbyJS was relatively seamless, with only a few small oddities that were either (1) due to the underlying starter or (2) easily googled and fixed. I find using all the latest tooling refreshing, and could certainly imagine myself using Gatsby in a work setting, and having the static files routed to via Nginx.

[See the source][source]

[gatsby]: https://www.gatsbyjs.org/
[jamstack]: https://jamstack.org
[middleman]: https://middlemanapp.com/
[brew]: https://brew.sh/
[source]: https://github.com/mdzhang/mdzhang.com/blob/2.4.0
