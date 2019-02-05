class FriendshipBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user, friend, create)
    if create
      NotificationsChannel.broadcast_to(
        user, {type: 'friend', 
          user: render_user(friend)
        }
      )
    else
      NotificationsChannel.broadcast_to(
        user, {type: 'friend_destroy', 
          user_id: friend.id
        }
      )
    end
  end

  private

  def render_user(user)
    ApplicationController.renderer.render(
      partial: 'api/users/user',
      locals: { user: user }
    )
  end
end