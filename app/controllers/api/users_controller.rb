class Api::UsersController < ApplicationController

  def show
    @user = current_user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user, request.user_agent)
      bot_id = 59
      user_id = @user.id
      # Friendship.create!(user_id: user_id, friend_id: bot_id)
      name = @user.id > bot_id ? "#{bot_id}-#{user_id}" : "#{user_id}-#{bot_id}"
      @channel = Channel.find_or_create_by(name: name)
      @channel.dm_memberships.create(user_id: bot_id)
      @channel.dm_memberships.create(user_id: user_id)
      Message.create!(author_id: bot_id, channel_id: @channel.id, body: %Q{Welcome to Discors! 
If you would like to be friends type "send" and I will send you a friend request in real time.
If you would like to test DM notifications type "test" and I will send you a message in 5 seconds.  Make sure to navigate away from this channel to receive the notification.
If you would like to learn more about Discors you can type "voice", "servers", "channels", or "friends".
    })

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
    @users = User.all.includes(:sessions, :server_memberships)
    # @users = current_user.dm_users.includes(:sessions, :server_memberships)
    @friends = current_user.friends.includes(:sessions, :server_memberships)
    # @pending_friends = current_user.pending_friends.includes(:sessions, :server_memberships)
    # @incoming_friends = current_user.incoming_friends.includes(:sessions, :server_memberships)
    # @server_users = current_user.server_users.includes(:sessions, :server_memberships)
    @incoming = FriendRequest.where(friend: current_user)
    @outgoing = current_user.friend_requests
    render "api/users/user_data"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar)
  end
end