outgoing = []
incoming = []

@requests.each do |request|
  if request.user_id == current_user.id
    outgoing << request
  else
    incoming << request
  end
end

json.channels do

  @channels.each do |channel|
    json.set! channel.id do
      json.partial! 'api/channels/channel', channel: channel
    end
  end

  @dm_channels.each do |channel|
    json.set! channel.id do
      json.partial! 'api/channels/channel', channel: channel
    end
  end
end

json.voice_channels do 
  @audio_channels.each do |audio_channel|
    json.set! audio_channel.id do
      json.partial! 'api/audio_channels/audio_channel', audio_channel: audio_channel
    end
  end

end

json.users do
  @users.with_attached_avatar.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end

json.servers do
  @servers.with_attached_icon.each do |server|
    json.set! server.id do
      json.partial! 'api/servers/server', server: server
    end
  end
end

json.friend_requests do 

  outgoing.each do |request|
    json.set! request.id do
      json.partial! 'api/friend_requests/friend_request', friend_request: request
    end
  end

  incoming.each do |request|
    json.set! request.id do
      json.partial! 'api/friend_requests/friend_request', friend_request: request
    end
  end

end

json.friends do 
  json.array! @friendships
end

json.currentUserId current_user.id