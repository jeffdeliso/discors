server_array = user.server_memberships.map { |membership| membership.server_id }

json.extract! user, :id, :username, :email, :image_url  
json.servers server_array
