---
title: "Setting up R and R Studio on Kubuntu 17.10"
date: 2018-02-11T14:39:41-05:00
draft: false
category: "tech"
tags:
    - ubuntu
    - kubuntu
    - r
---

## Overview

This boiled down into 3 steps for me:

1. Add a new package source
2. Grab `r-base` and `r-base-dev`
3. Install `RStudio` directly from the `.deb` file hosted by the official website

## Adding a package source

Specifically I added `"ppa:marutter/rrutter"`

I use [Ansible][ansible] to manage package installs so I can reproduce them when I setup a new machine, using the code:

```
- name: "Add repository"
  apt_repository:
    repo: "{{ item }}"
    state: present
  with_items:
    - "ppa:marutter/rrutter"
```

See my full Ansible playbook [here](http://github.com/mdzhang/laptop).

Which is roughly equivalent to:

```sh
sudo add-apt-repository "ppa:marutter/rrutter"
sudo apt-get update
```

## Install packages from new source

Again, using [Ansible][ansible]:

```
- name: "Install package"
  apt:
    name: "{{ item }}"
    state: present
  with_items:
    - r-base
    - r-base-dev
```

Which is roughly equivalent to:

```sh
sudo apt-get install r-base
sudo apt-get install r-base-dev
```

Now we can run `R` from the command line, but it doesn't give us RStudio, the IDE

## Install RStudio directly from hosted package

Again, using [Ansible][ansible]:

```
- name: "Install remote package"
  apt:
    deb: "{{ item }}"
  with_items:
    - "https://download1.rstudio.org/rstudio-xenial-1.1.423-amd64.deb"
```

Which is roughly equivalent to:

```sh
wget https://download1.rstudio.org/rstudio-1.0.44-amd64.deb
sudo apt-get install gdebi
sudo gdebi rstudio-1.0.44-amd64.deb
rm rstudio-1.0.44-amd64.deb
```

`gdebi` being a library that handles installing dependencies of the `deb` file

[ansible]: https://www.ansible.com/
