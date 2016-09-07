namespace :lint do
  desc 'Autocorrect all syntax violations'
  task :fix do
    Rake::Task['lint:ruby:fix'].invoke
  end
end
