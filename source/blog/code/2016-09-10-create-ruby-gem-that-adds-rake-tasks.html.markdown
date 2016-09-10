---
title: How to create a Ruby gem that adds Rake tasks
date: 2016-09-10 16:11 UTC
tags: ruby, gem, rake
category: code
---

## Create a gem

One way to do this is to use `bundler` to scaffold your gem:

```
bundler gem my_gem
```

## Add rake tasks to our gem

I prefer to put tasks meant to manage the gem itself in `lib/tasks`, and tasks the gem is meant to provide to gem users in `lib/my_gem/tasks`.

I also follow the following rules when writing Rake tasks:

1. One task per file
2. File name should match the task name exactly and have a `.rake` extension
3. Tasks should be namespaced
4. Files should be in a directory whose name matches the task namespace

So, say our gem is called `my_gem` and adds the tasks `foo:a`, `foo:b`, and `bar:c`. Our directory structure would look something like this:

```
my_gem
 └── bin
 └── ...
 └── lib
      └── my_gem
           └── tasks
                └── foo
                     ├── a.rake
                     ├── b.rake
                └── bar
                     ├── c.rake
           ├── Rakefile
           ├── railtie.rb
           ├── helper.rb
           ├── ...
      ├── my_gem.rb
  └── ...
```

## Integrate our gem with Rails apps

Use [Rails::Railtie](http://api.rubyonrails.org/classes/Rails/Railtie.html) to have all rake tasks automatically loaded when this gem is required in a Rails app.

`railtie.rb` (seen in directory structure above), at a minimum, would look something like this:

```ruby
# lib/railtie.rb
require 'my_gem'
require 'rails'

module MyGem
  class Railtie < Rails::Railtie
    railtie_name :my_gem

    rake_tasks do
      path = File.expand_path(__dir__)
      Dir.glob("#{path}/tasks/**/*.rake").each { |f| load f }
    end
  end
end
```

Then, in `my_gem.rb` aka the file loaded when our gem is required, we'd want something like:

```ruby
# lib/my_gem.rb
module MyGem
  require 'my_gem/railtie' if defined?(Rails)
end
```

## Integrate our gem with plain old Ruby projects

Provide a `Rakefile` that gem users can load into their Rakefiles.

```ruby
# lib/Rakefile
require 'my_gem'

path = File.expand_path(__dir__)
Dir.glob("#{path}/tasks/**/*.rake").each { |f| import f }
```

## Use our gem's rake tasks in another project

### Rails

In the project `Rakefile`, at some point before `Rails.application.load_tasks` is run, be sure to require `my_gem`, whether that be through `Bundler.require(*Rails.groups)`, `require 'my_gem'`, or whatever.

Make sure that the new code is actually being run e.g. restart [spring](https://github.com/rails/spring) if that's been running.

### Plain Old Ruby

In the project `Rakefile`, load `my_gem`'s `Rakefile`:

```ruby
require 'my_gem'

spec = Gem::Specification.find_by_name 'my_gem'
rakefile = "#{spec.gem_dir}/lib/my_gem/Rakefile"
load rakefile
```

## Extra: View Rake tasks

### From command line

```
rake -T -A
```

### Programmatically inside Ruby script

```
Rake.application.tasks.map(&:to_s)
```
