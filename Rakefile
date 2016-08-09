require 'yaml'

desc 'Build project'
namespace :build do
  def build(clean = true)
    sh "bundle exec middleman build #{clean ? '--clean' : ''}"
  end

  task :clean do
    build
  end

  task :delta do
    build false
  end
end

desc 'Clean project'
task :clean do
  sh 'rm -rf ./build'
end

desc 'Deploy project'
namespace :deploy do
  def host_for_environment(env)
    hosts = YAML.load(File.read('data/hosts.yml'))
    hosts[env.to_s]
  end

  def deploy(env, dry_run = true)
    # TODO: these checks are only in here b/c I'm mostly deploying from the command line
    # TODO: feels unnatural that host is set here
    Rake::Task['lint:run'].invoke
    Rake::Task['test'].invoke
    sh "HOST=#{host_for_environment(env)} bundle exec middleman s3_sync --build #{dry_run ? '--dry_run' : ''}"
  end

  task :development do
    sh "HOST=#{host_for_environment(:development)} bundle exec middleman server"
  end

  task :staging do
    deploy :staging, false
  end

  task :production do
    deploy :production, false
  end

  namespace :dry do
    task :staging do
      deploy :staging
    end

    task :production do
      deploy :production
    end
  end
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

  namespace :ruby do
    task :fix do
      sh 'bundle exec rubocop --auto-correct -c config/.rubocop.yml'
    end
  end
end

desc 'Start a local server to build, process, and serve the site files'
task :start do
  Rake::Task['deploy:development'].invoke
end

desc 'Test project'
task :test do
  sh 'bundle exec rspec'
end
