class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, user, channel)
    NotificationsChannel.broadcast_to(
      user, {type: 'message', 
        message: render_message(message),
        user: render_user(message.author),
        channel: render_channel(channel)
      }
    )
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(
      partial: 'api/messages/message',
      locals: { message: message }
    )
  end

  def render_user(user)
    ApplicationController.renderer.render(
      partial: 'api/users/user',
      locals: { user: user }
    )
  end

  def render_channel(channel)
    ApplicationController.renderer.render(
      partial: 'api/channels/channel',
      locals: { channel: channel }
    )
  end
end