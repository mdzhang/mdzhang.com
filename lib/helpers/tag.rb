module Helpers
  module Tag
    def time_tag(date)
      content_tag :time, date.strftime('%B %e, %Y')
    end
  end
end
