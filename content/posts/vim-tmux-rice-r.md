---
title: "Replacing R Studio with vim, tmux, and rice"
date: 2018-02-19T14:39:41-05:00
draft: false
category: "tech"
tags:
    - macOS
    - ubuntu
    - kubuntu
    - r
    - rice
    - vim
    - tmux
---

[See a screenshot][screenshot]

[RStudio][rstudio] is an IDE for the R programming language. I've found that, OOTB, it's missing a number of vim features I regularly rely on (keyboard shortcuts for moving between windows, [ctrlp-like fast global search][ctrlp], [nerdtree-like directory navigation][nerdtree], etc.) when developing in other languages, or at least vim keybindings for them (even with the core editor's [lightweight vim key bindings][rstudio-vim] enabled).

As a result, and particularly because I wasn't looking to introduce a new IDE/editor into my life, I wanted to recreate the parts of RStudio that I _did_ find useful as a novice R programmer, namely:

1. side-by-side shell and editor (I find that I almost always want an R shell open, moreso than any other language I've used)
2. the ability to run a specific block of code in my editor in the shell
3. syntax highlighting and code completion in the shell

(My current [vim configuration][vim-conf] using e.g. [vim-polyglot][vim-polyglot] for syntax highlighting/indentation/alignment/etc., and [completor.vim][vim-compl] for code completion had me up and running with R pretty quickly otherwise).

### tmux for splitting a terminal window

I've long been familiar with [tmux][tmux], but hadn't really used it much until I started using R and wanted a REPL in the same window, not just in another tab.

Here's a [handy cheatsheet](https://gist.github.com/michaellihs/b6d46fa460fa5e429ea7ee5ff8794b96) that covers basics like:

- Opening tmux with `tmux`
- Creating a pane in a vertical window split with `<C-b> %` aka `Ctrl` + `b` + `shift` + `5`
- Killing a pane with `<C-b> x`
- Moving between panes with `<C-b>` + one of the arrow keys

### vim on the left, rice on the right

For an R shell, I chose [rice][rice] for the autocompletion and as-you-type syntax highlighting. To colorize the output of commands, I also created an `~/.RProfile` file with:

```
library("colorout")
```

I installed `colorout` via:

```
install.packages("devtools")
devtools::install_github("jalvesaq/colorout")
```

per [this Stackoverflow answer](https://stackoverflow.com/questions/14355369/r-syntax-highlighting-in-terminal).

Then I made sure to add vi key bindings to `rice`:

```
options(
    rice.editing_mode = "vi"
)
```

(I also have an [`.inputrc`](https://www.gnu.org/software/bash/manual/html_node/Readline-Init-File.html) with `set editing-mode vi` set, which I believe also affects the library underpinning `rice`).

### piping text between vim and rice

While you can just copy from one tmux pane and paste into another (more on that later), it saves keystrokes to use something like [vim-slime][vim-slime], which lets you select text in vim and then press `<C-c> <C-c>` to send it to a "slime paste" file which e.g. tmux can read from and use to send text to a different pane.

Install `vim-slime` with [Vundle][Vundle] by adding the following to your `.vimrc`:

```
" connect to a REPL
Plugin 'jpalardy/vim-slime'
```

Let it know we're using `tmux`:

```
let g:slime_target = "tmux"
```

Just for good measure, create your slime paste file:

```
touch ~/.slime_paste
```

Sweet. Now when I'm testing a gajillion variations of a plot with `ggplot2`, I don't have to keep re-running my R file or re-typing the change into the shell and then copying it back to my source files.

### prettier, vi-friendly tmux

The default tmux color scheme and keybindings are kind of meh. I updated my [`~/.tmux.conf`][tmux-conf] to have more vi like keys by adding

```
unbind [
bind Escape copy-mode
bind P paste-buffer
```

This lets me use `<C-b> ESC` to enter copy mode and `<C-b> P` to paste what's in my tmux buffer.

Then I introduced the [tmux package manager](https://github.com/tmux-plugins/tpm) to get some extra goodies in my tmux status bar (e.g. date, host, window/pane numbers, active pane process, cpu/battery usage, etc, including [`tmux-yank`][tmux-yank] for copy pasting to/from the system clipboard, which I also do with vim.

```
set -g default-terminal "screen-256color"
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-battery'
set -g @plugin 'tmux-plugins/tmux-cpu'
set -g @plugin 'tmux-plugins/tmux-online-status'
set -g @plugin 'tmux-plugins/tmux-prefix-highlight'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-yank'
```

To get a better theme, I forked [tmux-themepack](https://github.com/jimeh/tmux-themepack) (my tmux.conf-fu is still rudimentary and I was having trouble customizing the cyan theme to take the e.g. cpu, battery indicators from the above plugins and add them to my statusbar) and set my left and right status formats:

```
set -g @plugin 'mdzhang/tmux-themepack'
set -g @themepack 'custom'

set -g status-left "#[fg=colour232,bg=colour39,bold] #S #[fg=colour39,bg=colour240,nobold]#[fg=colour233,bg=colour240] #(whoami) #[fg=colour240,bg=colour235]#[fg=colour240,bg=colour235] #I:#P #[fg=colour235,bg=colour233,nobold]#{prefix_highlight}"

set -g status-right "Online: #{online_status} #{cpu_fg_color} CPU: #{cpu_icon} #{cpu_percentage} #{battery_status_fg}Batt: #{battery_percentage} #{battery_remain}#[fg=colour235,bg=battery_status_bg]#[fg=colour240,bg=colour235] %H:%M:%S #[fg=colour240,bg=colour235]#[fg=colour233,bg=colour240] %d-%b-%y #[fg=colour245,bg=colour240]#[fg=colour232,bg=colour245,bold] #H "
```

### links

- [my vim configuration][vim-conf]
- [my tmux configuration][tmux-conf]
- [my dotfiles generally][dotfiles]
- [see a screenshot][screenshot]

[rstudio]: https://www.rstudio.com
[ctrlp]: https://github.com/kien/ctrlp.vim
[nerdtree]: https://github.com/scrooloose/nerdtree
[vim-polyglot]: https://github.com/sheerun/vim-polyglot
[vim-compl]: https://github.com/maralla/completor.vim
[rstudio-vim]: https://blog.rstudio.com/2015/02/23/rstudio-0-99-preview-vim-mode-improvements/
[tmux]: https://tmux.github.io/
[vim-slime]: https://github.com/jpalardy/vim-slime
[Vundle]: https://github.com/VundleVim/Vundle.vim
[rice]: https://github.com/randy3k/rice
[vim-conf]: https://github.com/mdzhang/dotfiles/blob/master/vim/.vimrc
[tmux-conf]: https://github.com/mdzhang/dotfiles/blob/master/tmux/.tmux.conf
[tmux-yank]: https://github.com/jimeh/tmux-themepack
[dotfiles]: https://github.com/mdzhang/dotfiles
[screenshot]: http://cdn.mdzhang.com/images/vim-tmux-r.png
