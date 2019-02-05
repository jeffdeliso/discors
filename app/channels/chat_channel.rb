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
    responseArr = [
      "If you receive a DM, you'll get a notification. If you type test, I will wait 5 seconds and send you a message. Make sure to navigate to a different channel."
    ]

    if message.body.downcase.include?('hi') || message.body.downcase.include?('hey') || message.body.downcase.include?('hello')
      "Hello! I'm a bot. I'm here to keep you company and help you test the site."
    else
      responseArr.sample
    end
  end
end