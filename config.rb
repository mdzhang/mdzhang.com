###
# Configure Middleman
###

# Asset pipeline
activate :sprockets
sprockets.append_path File.join(root, 'source')

# Asset directories
set :css_dir, "assets/stylesheets"
set :js_dir, "assets/javascripts"
set :fonts_dir, "assets/fonts"
set :images_dir, "assets/images"

# CSS
activate :autoprefixer do |config|
  config.browsers = ["last 2 versions", "Explorer >= 9"]
  config.remove   = false
  config.cascade  = false
  config.inline   = true
end

# Do not render with layout
# TODO: pdf render
page '/*.txt', layout: false
page '/*.xml', layout: false

# Helpers
require 'helpers/google_helpers'
require 'helpers/gravatar_helpers'

helpers GoogleHelpers
helpers GravatarHelpers

# General configuration

# TODO: version route

configure :development do
  # Reload the browser automatically whenever files change
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