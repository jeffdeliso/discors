class FriendRequestBroadcastJob < ApplicationJob
  queue_as :default

  def perform(friend_request, user, create)
    if create
      NotificationsChannel.broadcast_to(
        user, {type: 'friend_request', 
          friend_request: render_friend_request(friend_request),
          user: render_user(friend_request.user),
        }
      )
    else
      NotificationsChannel.broadcast_to(
        user, {type: 'friend_request_destroy', 
          friend_request: render_friend_request(friend_request)
        }
      )
    end
  end

  private

  def render_friend_request(friend_request)
    ApplicationController.renderer.render(
      partial: 'api/friend_requests/friend_request',
      locals: { friend_request: friend_request }
    )
  end

  def render_user(user)
    ApplicationController.renderer.render(
      partial: 'api/users/user',
      locals: { user: user }
    )
  end
end