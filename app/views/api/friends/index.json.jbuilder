friends_array = @friends.map { |friend| friend.id }
json.array! friends_array