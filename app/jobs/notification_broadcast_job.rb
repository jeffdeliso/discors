class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message, user)
    NotificationsChannel.broadcast_to(
      user, {type: 'message', 
        message: render_message(message),
        user: render_user(message.author)
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
end