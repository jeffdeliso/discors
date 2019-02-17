server_array = user.server_memberships.sort.map { |membership| membership.server_id }
online = !user.sessions.empty?
image_url = user.avatar.attached? ? url_for(user.avatar) : user.image_url

json.extract! user, :id, :username, :email
json.image_url image_url   
json.servers server_array
json.online online