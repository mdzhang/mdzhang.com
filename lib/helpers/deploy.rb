module Helpers
  module Deploy
    def config_s3(options = {})
      # NB: Reads credentials from .envrc; assumes same credentials used for all environments
      activate :s3_sync do |s3_sync|
        s3_sync.bucket                     = s3_bucket_from_host(options[:host])
        s3_sync.region                     = 'us-west-1'
        s3_sync.prefer_gzip                = true
        s3_sync.index_document             = 'index.html'
        s3_sync.error_document             = 'error.html'
      end
    end

    def s3_bucket_from_host(host)
      host.sub(%r{^https?\:\/\/}, '') if host
    end
  end
end
