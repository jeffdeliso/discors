friends_array = @friends.map { |friend| friend.id }
json.friends do
  json.array! friends_array
end

json.users do 
  @friends.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
