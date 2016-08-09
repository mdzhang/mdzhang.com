module GoogleHelpers
  def structured_data
    {
      '@context': 'http://schema.org',
      '@type': 'Person',
      name: data.me.full_name,
      description: data.me.short_description,
      birthDate: data.me.birth_date,
      email: data.me.email,
      gender: data.me.gender,
      nationality: data.me.nationality,
      url: config[:host],
      image: gravatar_url_large,
      jobTitle: data.work.job_title,
      affiliation: data.work.name,
      sameAs: [
        data.services.github.url,
        data.services.twitter.url,
        data.services.google_plus.url,
        data.services.linkedin.url
      ]
    }.to_json
  end
end
