json.channels do
  @channels.each do |channel|
    json.set! channel.id do
      json.partial! 'api/channels/channel', channel: channel
    end
  end
end
json.users do
  @users.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
  # @friends.each do |user|
  #   json.set! user.id do
  #     json.partial! 'api/users/user', user: user
  #   end
  # end
  # @incoming_friends.each do |user|
  #   json.set! user.id do
  #     json.partial! 'api/users/user', user: user
  #   end
  # end
  # @pending_friends.each do |user|
  #   json.set! user.id do
  #     json.partial! 'api/users/user', user: user
  #   end
  # end
  # json.set! @current_user.id do
  #   json.partial! 'api/users/user', user: @current_user
  # end
end