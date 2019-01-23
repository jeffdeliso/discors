class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    current_channel
  end

  def index
    server = Server.find(channel_params[:server_id])
    @channels = server.channels
    render :index
  end

  private

  def current_channel
    @channel ||= Channel.find(params[:id])
  end

  def channel_params
    params.require(:channel).permit(:name, :server_id)
  end
end