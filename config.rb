require 'rubygems'
require 'bundler'

Bundler.require(:default, config[:environment], config[:mode])

config[:host] = ENV['HOST']

###
# Configure Middleman
###

# Asset pipeline
activate :sprockets
sprockets.append_path File.join(root, 'source')

# Asset directories
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :fonts_dir, 'assets/fonts'
set :images_dir, 'assets/images'

# CSS
activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
  config.remove   = false
  config.cascade  = false
  config.inline   = true
end

# Do not render with layout
page '/*.txt', layout: false
page '/*.xml', layout: false

# Helpers
require 'helpers/google_helpers'
require 'helpers/gravatar_helpers'
require 'helpers/resume_helpers'

helpers GoogleHelpers
helpers GravatarHelpers
helpers ResumeHelpers

# Deploy configuration

# TODO: shouldn't have to run this all the time
# also reads from .s3_sync
activate :s3_sync do |s3_sync|
  s3_sync.prefer_gzip                = true
  s3_sync.index_document             = 'index.html'
  s3_sync.error_document             = 'error.html'
end

# General configuration

configure :development do
  # reload the browser automatically whenever files change
  activate :livereload
end

configure :build do
  activate :gzip
  activate :minify_css
  activate :minify_html
  activate :minify_javascript

  compass_config do |config|
    config.output_style = :compressed
  end
end
