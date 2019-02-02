class Api::UsersController < ApplicationController

  def show
    @user = current_user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = current_user
    if current_user.update_attributes(user_params)
      render :show
    else
      render json: current_user.errors.full_messages, status: 422
    end
  end

  def data
    @channels = current_user.channels
    @dm_channels = current_user.dm_channels
    @audio_channels = current_user.audio_channels
    @servers = current_user.servers
    @users = current_user.dm_users.includes(:sessions, :server_memberships)
    @friends = current_user.friends.includes(:sessions, :server_memberships)
    @pending_friends = current_user.pending_friends.includes(:sessions, :server_memberships)
    @incoming_friends = current_user.incoming_friends.includes(:sessions, :server_memberships)
    @server_users = current_user.server_users.includes(:sessions, :server_memberships)
    @incoming = FriendRequest.where(friend: current_user)
    @outgoing = current_user.friend_requests
    render "api/users/user_data"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar)
  end
end