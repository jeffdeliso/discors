class Api::UsersController < ApplicationController
  
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user, request.user_agent)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = current_user

    if @user.id == 71
      render json: ['Can not edit the demo user'], status: 422
    else
      if current_user.update_attributes(user_params)
        render :show
      else
        render json: current_user.errors.full_messages, status: 422
      end
    end
  end

  def data
    current_user_id = current_user.id
      
    @servers = current_user.servers.includes(:channels, :audio_channels)
    @channels = @servers.map(&:channels).flatten.uniq
    @audio_channels = @servers.map(&:audio_channels).flatten.uniq
    @requests = FriendRequest.where(friend_id: current_user_id).or(FriendRequest.where(user_id: current_user_id))
    @friendships = current_user.friendships.pluck(:friend_id)
    @dm_channels = current_user.dm_channels

    # This is the code I would actually use; however, to decrease subsequent load times for non-tech people viewing my
    # site, I have temporarily replaced it with a load of all the users.
    # dm_user_ids = [current_user_id]

    # @dm_channels.each do |channel|
    #   dm_arr = channel.name.split('-')
    #   if dm_arr[0].to_i == current_user_id
    #     dm_user_ids << dm_arr[1].to_i
    #   else
    #     dm_user_ids << dm_arr[0].to_i
    #   end
    # end
    
    # @users = User.distinct.select('users.*').left_outer_joins(:friend_requests)
    #   .left_outer_joins(:incoming_friend_requests).left_outer_joins(:friendships)
    #   .where("incoming_friend_requests_users.user_id = :current_user_id OR friend_requests.friend_id = :current_user_id OR friendships.friend_id = :current_user_id OR users.id IN (:dm_user_ids)", current_user_id: current_user_id, dm_user_ids: dm_user_ids)
    #   .includes(:sessions, :server_memberships)
    
    @users = User.all.includes(:sessions, :server_memberships)
    render "api/users/user_data"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar)
  end
end