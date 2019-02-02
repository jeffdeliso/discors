
json.requests do
  @outgoing.each do |request|
    json.set! request.id do
      json.partial! 'api/friend_requests/friend_request', friend_request: request
    end
  end

  @incoming.each do |request|
    json.set! request.id do
      json.partial! 'api/friend_requests/friend_request', friend_request: request
    end
  end
end

json.users do 
  @incoming_friends.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
  @pending_friends.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end