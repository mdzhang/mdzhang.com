source 'https://rubygems.org'
ruby File.read('.ruby-version').chomp if File.exist?('.ruby-version')

gem 'middleman', '>= 4.0.0'
gem 'middleman-autoprefixer'
gem 'middleman-blog'
gem 'middleman-jquery'
gem 'middleman-s3_sync'
gem 'middleman-sprockets'
gem 'mime-types'

gem 'middleman-syntax'
gem 'redcarpet'

# See http://stackoverflow.com/a/41456412/2699835
gem 'json', git: 'https://github.com/flori/json', branch: 'v1.8'

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

group :test do
  gem 'capybara'
  gem 'rspec'
end

group :test, :development do
  gem 'middleman-livereload'
  gem 'middleman-pry'
end
