require 'rubygems'
require 'bundler'

Bundler.require(:default, :test)

require 'capybara/rspec'

RSpec.configure do |config|
  config.include Capybara::DSL
end

middleman_app = ::Middleman::Application.new

Capybara.app = ::Middleman::Rack.new(middleman_app).to_app do
  set :root, File.expand_path(File.join(File.dirname(__FILE__), '..'))
  # TODO: this doesn't affect environment in config.rb
  set :environment, :development
  set :show_exceptions, false
end
