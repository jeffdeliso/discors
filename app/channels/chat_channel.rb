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
      "Why did the functions stop calling each other? Because they had constant arguments.",
      "How does a computer scientist order three beers? He holds up two fingers.",
      "How many programmers does it take to screw in a light bulb? None, it's a hardware problem.",
      "It should be noted that no ethically-trained software engineer would ever consent to write a DestroyBaghdad procedure. Basic professional ethics would instead require him to write a DestroyCity procedure, to which Baghdad could be given as a parameter.",
      "A SQL statement walks into a bar and sees two tables. It approaches, and asks may I join you?"
    ]

    default_response = %Q{Welcome to Discors! I'm here to keep you company and help you test the site.

If you would like to be friends type "send" and I will send you a friend request in real-time.

If you would like to test DM notifications type "test" and I will send you a message in 5 seconds.  Make sure to navigate away from this channel to receive the notification.

If you would like to learn more about Discors you can type "voice", "servers", "channels", or "friends". For a joke, type "joke".}

    if text == 'hi' || text == 'hey' || text == 'hello'
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
      %Q{Servers have both text and voice channels. You can select or create channels within a server. If you have selected a text channel, you will see all the message for that channel. For more information on voice channels type "voice".}
    elsif text == 'servers'
      %Q{You can create or join a server by clicking the dashed circle with a plus sign. Once you have joined a server you can chat with all the other members of that server. If you are looking for a server to join, try "westeros".}
    elsif text == 'voice'
      "Voice channels use WebSockets and WebRTC to exchange user audio in real time. If you are behind a symetric NAT or certain firewalls WebRTC may not be able to create a peer to peer connection with your computer. The solution to this would be to implement a TURN relay server, however, these are expensive to operate. A TURN server provides a fallback solution for clients that cannot establish a peer to peer connection and acts as a media server proxy between the two peers."
    elsif text == 'friends'
      "You can send a friend request or direct message to any user by clicking on their username or avatar. Friend requests and messages are sent in real-time using WebSockets."
    elsif text == 'joke'
      response_arr.sample
    else
      default_response
    end
  end
end