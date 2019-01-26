server_array = user.server_memberships.map { |membership| membership.server_id }
incoming_friends_array = FriendRequest.where(friend: current_user).map { |request| request.user_id }
outgoing_friends_array = user.friend_requests.map { |request| request.friend_id }
friends_array = user.friends.map { |friend| friend.id }
friend_requests = user.friend_requests

json.extract! user, :id, :username, :email, :image_url  
json.servers server_array
json.friends friends_array
