---
title: "Migrate from Middleman to Gatsby"
cover: "https://cdn-images-1.medium.com/max/1262/1*qkfh8Ya9io6F4joucU0eqg.png"
date: "10/12/2017"
category: "tech"
tags:
    - programming
    - javascript
    - gatsby
---

How I migrated my personal site, <http://mdzhang.com> from using [Middleman][middleman] to [GatsbyJS][gatsby]

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

I should caveat that my personal site has never been that big - doing more tech blogging has been more of an aspiration than a reality, so really I only use the site for establishing an online presence and linking out to my other social media accounts. I also wasn't tied to the visual design and was ready to try and create something new based on wherever Gatsby dropped me off, rather than try and recreate the original site exactly.

I've always tended to use tools for my personal site that align with the tools I'm using at work - I originally switched to Middleman when I had been working at [Blue Apron](https://www.blueapron.com/), a Rails shop. After switching, my main gripes with Middleman were that:

1. I've never liked mixing Ruby and NodeJS for a purely frontend website. Ruby has some more sane language constructs and standard libraries, for sure, but it feels to me like it's meant for devs that want the right tool _in Ruby_ for the job rather than the right tool for the job _period_.
1. Using `.haml` templates felt outdated and constrictive, but adding React seemed like a pain. I've used React for my last two jobs as well as a couple side projects - the issue wasn't React and it's ecosystem (at least not for me), but figuring out how to tie it into a framework (i.e. Middleman) I didn't really feel it needed to be tied into given the problem at hand.

All in all, I was more than happy to move over to a pure JS solution, especially if I could leverage a mature library that would make the process easy.

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

  And then I poked around the UI and the code. When everything, as far as I was concerned, checked out (e.g. things worked as promised, the code and organization were sane, etc.), I wanted to try looking at some of the other [starters](https://www.gatsbyjs.org/docs/gatsby-starters/) they had mentioned on that same tutorial page. The demos they link out to helped speed up the process of evaluating the UIs, and I ended up settling on the [`gatsby-material-starter`](https://github.com/Vagr9K/gatsby-material-starter) which covered a lot of the SEO concerns I had already built into my personal site, <http://mdzhang.com>.

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

On a sidenote, I ended up opting for a color palette like the one used by [`vim-hybrid`](https://github.com/w0ng/vim-hybrid) and used <https://terminal.sexy> to pull the hex codes.

## Code customizations

These are probably too specific to my project to be worth really going into, but I would throw out that I:

1. Added a [`404.jsx` page](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/src/pages/404.jsx) so my S3 bucket could use `404.html` as its error page
1. Added a [placeholder card](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/src/components/PostListing/PostListing.jsx#L23) to show when there were no blog posts since I wasn't adding any during that first iteration

## Deploying it

I already had my site configured to deploy to an S3 bucket beforehand, and since `gatsby build` was already outputting a `public` directory I could upload directly, I went ahead and threw in a quick [Grunt task](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/Gruntfile.js), updated my project dependencies, [aliased `gatsby build && grunt deploy` to `npm run deploy`](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/package.json#L69), and called it a day.

(I had the AWS environment variables I used to deploy from my host set using [`direnv`](https://direnv.net/)).

### Continuously deploying it

I tinkered with updating to Circle 2.0, and while it is _way_ faster than it's 1.0 counterpart, I found myself running into issue after issue, many of which were known bugs with hacky solutions (like having to `yarn install global node-gyp` to get `yarn` commands to work), or counterintuitive behaviors (like not being able to pull a `node:8.9.3` docker image ).

So once my patience ran out I just re-used my old CircleCI config, with a [couple of changes](https://github.com/mdzhang/mdzhang.com/blob/2.4.0/circle.yml) to account for deploying via grunt instead of Middleman.

A somewhat tangential thought - after revisiting CircleCI 1.0, trying out CircleCI 2.0, and then briefly considering using Travis, I am especially appreciative of being able to use [GitLab CI](https://about.gitlab.com/features/gitlab-ci-cd/) at work.

## Final Thoughts

Transitioning to use GatsbyJS was seamless, and I find being able to use all the latest tooling (though some of it happens under the covers) refreshing. I'd like to dig into how Gatsby leverages [GraphQL](http://graphql.org/) a bit more, but the nice thing is that because everything Just Worked ™, I didn't _have_ to in order to get this project out. And the same way I believe in iterative software development, I believe in iteratively working through your toolchain and all the blackboxes therein and continually more fully understanding it.

[See the source][source]


[gatsby]: https://www.gatsbyjs.org/
[jamstack]: https://jamstack.org
[middleman]: https://middlemanapp.com/
[brew]: https://brew.sh/
[source]: https://github.com/mdzhang/mdzhang.com/blob/2.4.0
