class Api::AudioChannelsController < ApplicationController
  def create
    @audio_channel = AudioChannel.new(audio_channel_params)

    if @audio_channel.save
      render "api/audio_channels/show"
    else
      render json: @audio_channel.errors.full_messages, status: 422
    end
  end

  def index
    server = Server.find_by(id: audio_channel_params[:server_id])

    if server
      @audio_channels = server.audio_channels
      render :index
    else
      render json: ["Server does not exist"], status: 422
    end
  end

  def destroy
    current_audio_channel.destroy
    render "api/audio_channels/show"
  end

  private

  def current_audio_channel
    @audio_channel ||= AudioChannel.find(params[:id])
  end

  def audio_channel_params
    params.require(:audio_channel).permit(:name, :server_id)
  end
end