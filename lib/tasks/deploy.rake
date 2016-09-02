require 'optparse'

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
