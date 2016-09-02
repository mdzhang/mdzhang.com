desc 'Build project'
task :build do
  sh 'bundle exec middleman build'
end
