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