module ApplicationHelper
  def format_date(timestamp)
    timestamp.strftime("%B %d, %Y, %I:%M %p")
  end
end
