class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    current_user = User.find(params['userId'])
    stream_for current_user
  end

  def unsubscribed
  end
end