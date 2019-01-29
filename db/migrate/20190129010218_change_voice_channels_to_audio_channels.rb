class ChangeVoiceChannelsToAudioChannels < ActiveRecord::Migration[5.2]
  def change
    rename_table :voice_channels, :audio_channels
  end
end
