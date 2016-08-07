module GravatarHelpers
  LARGE = 2134
  MEDIUM = 1200
  SMALL = 144

  def gravatar_url(email_address = data.me.email, size = SMALL)
    email_hash = Digest::MD5.hexdigest(email_address.downcase)

    "http://www.gravatar.com/avatar/#{email_hash}?s=#{size}"
  end

  def gravatar_url_small
    gravatar_url(data.me.email, SMALL)
  end

  def gravatar_url_med
    gravatar_url(data.me.email, MEDIUM)
  end

  def gravatar_url_large
    gravatar_url(data.me.email, LARGE)
  end
end