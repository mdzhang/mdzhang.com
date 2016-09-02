desc 'Start a local server to build, process, and serve the site files'
task :start do
  sh 'bundle exec middleman server -e development'
end
