@audio_channels.each do |audio_channel|
  json.set! audio_channel.id do
    json.partial! 'api/audio_channels/audio_channel', audio_channel: audio_channel
  end
end