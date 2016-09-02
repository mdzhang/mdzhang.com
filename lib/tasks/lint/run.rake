namespace :lint do
  desc 'Run pre-commit lint hooks'
  task :run do
    sh 'bundle exec overcommit --run'
  end
end
