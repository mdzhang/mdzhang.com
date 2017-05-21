source 'https://rubygems.org'
ruby File.read('.ruby-version').chomp if File.exist?('.ruby-version')

# See https://github.com/middleman/middleman/issues/2087
gem 'haml', '~> 4.0'

# See http://stackoverflow.com/a/41456412/2699835
gem 'json', git: 'https://github.com/flori/json', branch: 'v1.8'

gem 'middleman', '>= 4.0.0'
gem 'middleman-autoprefixer'
gem 'middleman-blog'
gem 'middleman-jquery'
gem 'middleman-s3_sync'
gem 'middleman-sprockets'
gem 'middleman-syntax'
gem 'mime-types'

gem 'redcarpet'

group :build do
  gem 'middleman-minify-html'
end

group :build, :config do
  gem 'middleman-compass', '>= 4.0.0'
end

group :development do
  gem 'haml_lint', require: false
  gem 'overcommit', require: false
  gem 'rubocop', require: false
  gem 'scss_lint', require: false
end

group :test, :development do
  gem 'capybara'
  gem 'middleman-livereload'
  gem 'middleman-pry'
  gem 'rspec'
end
