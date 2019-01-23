@channels.each do |channel|
  json.set! channel.id do
    json.partial! 'api/channels/channel', channel: channel
  end
end