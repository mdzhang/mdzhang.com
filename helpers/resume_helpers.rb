module ResumeHelpers
  def resume_url
    "#{config[:host]}/files/#{data.me.resume_file_name}"
  end
end
