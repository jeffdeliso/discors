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
    unless current_user.id == params[:user_id].to_i
      name = current_user.id > params[:user_id].to_i ? "#{params[:user_id]}-#{current_user.id}" : "#{current_user.id}-#{params[:user_id]}"
      @channel = Channel.find_or_create_by(name: name)
      @channel.dm_memberships.create(user_id: current_user.id)
      @channel.dm_memberships.create(user_id: params[:user_id])
      render "api/channels/show"
    else
      render json: ['Cannot DM yourself'], status: 401
    end
  end

  def dm_index
    @channels = current_user.dm_channels
    @users = current_user.dm_users.includes(:sessions)
    @friends = current_user.friends.includes(:sessions)
    @pending_friends = current_user.pending_friends.includes(:sessions)
    @incoming_friends = current_user.incoming_friends.includes(:sessions)
    render "api/channels/dm_index"
  end

  private

  def current_channel
    @channel ||= Channel.find(params[:id])
  end

  def channel_params
    params.require(:channel).permit(:name, :server_id)
  end
end