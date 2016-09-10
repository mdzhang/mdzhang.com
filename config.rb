require 'rubygems'
require 'bundler'

Bundler.require(:default, config[:environment], config[:mode])

# Add project top-level directory to load path
$LOAD_PATH << File.expand_path('../', __FILE__)
require 'lib/helpers'

###
# Global Configuration
###

# Add all Helper module submodules as helpers
# both throughout app and in this config file
Helpers.constants(false)
       .map    { |c| Helpers.const_get(c) }
       .select { |c| c.is_a? Module }
       .each do |c|
  helpers c
  include c
end

# Do not render with layout
page '/*.txt', layout: false
page '/*.xml', layout: false

# Asset pipeline
activate :sprockets
sprockets.append_path File.join(root, 'source')

# CSS vendor prefixes
activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
  config.remove   = false
  config.cascade  = false
  config.inline   = true
end

activate :syntax
set :markdown_engine, :redcarpet
set :markdown, smartypants: true,
               fenced_code_blocks: true

activate :directory_indexes
page(/(error|[A-z]+\d+).*\.html/, directory_index: false)

activate :blog do |blog|
  blog.prefix = 'blog'
  blog.sources = '{category}/{year}-{month}-{day}-{title}.html'
  blog.permalink = '{category}/{year}/{month}/{day}/{title}.html'
  blog.layout = 'blog'
end

###
# Configuration by environment
###

config[:host] = app.data[:hosts][config[:environment]]
config_s3 host: config[:host]

configure :development do
  # reload the browser automatically whenever files change
  activate :livereload
end

###
# Configuration by mode
# mdzhang: You would think there would be a :deploy mode
###

configure :build do
  activate :gzip
  activate :minify_css
  activate :minify_html
  activate :minify_javascript, inline: true

  compass_config do |config|
    config.output_style = :compressed
  end
end
