class Api::DmChannelMembershipsController < ApplicationController

  def destroy
    channel_id = params[:id]
    @dm_channel_membership = DmChannelMembership.find_by(user_id: current_user.id, channel_id: channel_id)
    @dm_channel_membership.destroy
    render json: @dm_channel_membership
  end
end