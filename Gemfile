source 'https://rubygems.org'
ruby File.read('.ruby-version').chomp if File.exist?('.ruby-version')

gem 'middleman', '>= 4.0.0'
gem 'middleman-autoprefixer'
gem 'middleman-jquery'
gem 'middleman-sprockets'

gem 'middleman-s3_sync'
gem 'mime-types'

group :build do
  gem 'middleman-minify-html'
end

group :build, :config do
  gem 'middleman-compass', '>= 4.0.0'
end

group :development do
  gem 'haml_lint'
  gem 'overcommit'
  gem 'rubocop'
  gem 'scss_lint'
end

group :test do
  gem 'capybara'
  gem 'rspec'
end

group :test, :development do
  gem 'middleman-livereload'
  gem 'middleman-pry'
end
