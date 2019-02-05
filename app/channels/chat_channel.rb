class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find(params['channelId'])
    stream_for channel
    load({'channelId' => params['channelId']})
  end

  def speak(data)
    message = Message.create!(data['message'])
    channel = Channel.find(message.channel_id)
    socket = { message: message, type: 'message' }
    ChatChannel.broadcast_to(channel, socket)

    unless channel.server_id
      bot_id = 59
      dmArray = channel.name.split('-')
      
      if dmArray.include?(bot_id.to_s)
        sleep(5) if message.body.downcase == 'test'
    
        bot_response = bot_message(message)
        bot_message = Message.create!(author_id: bot_id, body: bot_response, channel_id: channel.id)
        bot_socket = { message: bot_message, type: 'message' }
        ChatChannel.broadcast_to(channel, bot_socket)
      end
    end
  end

  def load(data)
    channel = Channel.find(data['channelId'])
    messages = channel.messages.sort_by(&:created_at)
    socket = { messages: messages, type: 'messages' }
    ChatChannel.broadcast_to(channel, socket)
  end

  def unsubscribed; end

  def bot_message(message)
    bot_id = 59
    text = message.body.downcase
    response_arr = [
      "Hello! I'm a bot. I'm here to keep you company and help you test the site."
    ]

    default_response = %Q{Welcome to Discors! 
If you would like to be friends type "send" and I will send you a friend request in real time.

If you would like to test DM notifications type "test" and I will send you a message in 5 seconds.  Make sure to navigate away from this channel to receive the notification.

If you would like to learn more about Discors you can type "voice", "servers", "channels", or "friends". For a random response type "random".}

    if text.include?('hi') || text.include?('hey') || text.include?('hello')
      "Hello! I'm a bot. I'm here to keep you company and help you test the site."
    elsif text == 'send'
      friend_request = FriendRequest.new(user_id: bot_id, friend_id: message.author_id)
      if friend_request.save
        "Sent! You should now see a red indicator that you have a friend request."
      else
        if friend_request.errors.full_messages.first.include?('added')
          "We're already friends. If you would like me to send you a friend request remove me from your friends list and try again."
        else
          "I already sent a request."
        end
      end
    elsif text == 'test'
      "Was that 5 seconds already?"
    elsif text == 'channels'
      "Channels"
    elsif text == 'servers'
      "Servers"
    elsif text == 'voice'
      "Voice"
    elsif text == 'friends'
      "Friends"
    elsif text = 'random'
      response_arr.sample
    else
      default_response
    end
  end
end