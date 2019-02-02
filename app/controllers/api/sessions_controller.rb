class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )

    if @user
      login(@user)
      @channels = current_user.channels
      @audio_channels = current_user.audio_channels
      @servers = current_user.servers
      @users = current_user.dm_users.includes(:sessions, :server_memberships)
      @friends = current_user.friends.includes(:sessions, :server_memberships)
      @pending_friends = current_user.pending_friends.includes(:sessions, :server_memberships)
      @incoming_friends = current_user.incoming_friends.includes(:sessions, :server_memberships)
      render "api/users/login_show"
    else
      render json: ["Invalid username/password combination"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render json: ["Nobody signed in"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end