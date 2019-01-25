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

  def dm_create
    @channel = Channel.create!(name: "#{current_user.id}-#{params[:user_id]}")
    @channel.dm_memberships.create!(user_id: current_user.id)
    @channel.dm_memberships.create!(user_id: params[:user_id])
    render :show
  end

  private

  def current_channel
    @channel ||= Channel.find(params[:id])
  end

  def channel_params
    params.require(:channel).permit(:name, :server_id)
  end
end