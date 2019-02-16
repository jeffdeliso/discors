class Api::DmChannelMembershipsController < ApplicationController

  def destroy
    channel_id = params[:id]
    @dm_channel_membership = DmChannelMembership.find_by(user_id: current_user.id, channel_id: channel_id)
    @dm_channel_membership.destroy
    render json: @dm_channel_membership
  end

  def create
    user_id = dm_channel_params[:user_id].to_i
    current_user_id = current_user.id
    unless current_user_id == user_id
      name = current_user_id > user_id ? "#{user_id}-#{current_user_id}" : "#{current_user_id}-#{user_id}"
      @channel = Channel.find_or_create_by(name: name)
      @channel.dm_memberships.create(user_id: current_user_id)
      @channel.dm_memberships.create(user_id: user_id)
      
      render "api/channels/show"
    else
      render json: ['Cannot DM yourself'], status: 401
    end
  end

  private

  def dm_channel_params
    params.require(:dm_channel).permit(:user_id)
  end
end