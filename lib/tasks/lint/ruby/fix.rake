namespace :lint do
  namespace :ruby do
    desc 'Autocorrect Ruby syntax violations'
    task :fix do
      sh 'bundle exec rubocop --auto-correct -c config/.rubocop.yml'
    end
  end
end
