module ResumeHelpers
  def resume_url
    "#{data.application.url}/assets/files/#{data.me.resume_file_name}"
  end
end
