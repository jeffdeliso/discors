class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def index
    server = Server.find_by(id: channel_params[:server_id])
    
    if server
      @channels = server.channels
      render :index
    else
      render json: ["Server does not exist"], status: 422
    end
  end

  def destroy
    current_channel.destroy
    render "api/channels/show"
  end

  private

  def current_channel
    @channel ||= Channel.find(params[:id])
  end

  def channel_params
    params.require(:channel).permit(:name, :server_id)
  end
end