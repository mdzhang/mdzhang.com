require 'optparse'
require 'yaml'

desc 'Build project'
task :build do
  sh 'bundle exec middleman build'
end

desc 'Clean project'
task :clean do
  sh 'rm -rf ./build'
end

desc 'Deploy project'
task :deploy do
  options = {}

  o = OptionParser.new

  o.banner = 'Usage: rake deploy [options]'

  o.on('-e ENV', '--environment ENV', 'Environment to deploy to') do |env|
    options[:env] = env
  end

  o.on('-b', '--build', 'Build code before deploy') do |_env|
    options[:build] = '--build'
  end

  o.on('-l', '--lint', 'Lint code before deploy') do |_env|
    Rake::Task['lint:run'].invoke
  end

  o.on('-d', '--dry-run', 'Dry run deploy') do |_env|
    options[:dry] = '--dry_run'
  end

  o.on('-t', '--test', 'Test before deploy') do |_env|
    Rake::Task['test'].invoke
  end

  o.on('-h', '--help', 'Print help screen') do |_v|
    puts o
    exit
  end

  args = o.order!(ARGV) {}

  o.parse!(args)

  abort 'Must specify an environment' unless options.key?(:env)

  sh "bundle exec middleman s3_sync --build #{options[:dry]} -e #{options[:env]}"
  exit
end

desc 'Lint project code'
namespace :lint do
  def lint(cmd)
    sh "bundle exec overcommit --#{cmd}"
  end

  task :install do
    lint :install
  end

  task :run do
    lint :run
  end

  task :sign do
    lint :sign
  end

  task :uninstall do
    lint :uninstall
  end

  task :fix do
    sh 'bundle exec rubocop --auto-correct -c config/.rubocop.yml'
  end
end

desc 'Start a local server to build, process, and serve the site files'
task :start do
  sh 'bundle exec middleman server -e development'
end

desc 'Test project'
task :test do
  sh 'bundle exec rspec'
end
