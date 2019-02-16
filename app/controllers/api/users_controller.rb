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
      name = @user.id > bot_id ? "#{bot_id}-#{user_id}" : "#{user_id}-#{bot_id}"
      @channel = Channel.find_or_create_by(name: name)
      @channel.dm_memberships.create(user_id: bot_id)
      @channel.dm_memberships.create(user_id: user_id)
      Message.create!(author_id: bot_id, channel_id: @channel.id, body: %Q{Welcome to Discors! I'm here to keep you company and help you test the site.

If you would like to be friends type "send" and I will send you a friend request in real time.

If you would like to test DM notifications type "test" and I will send you a message in 5 seconds.  Make sure to navigate away from this channel to receive the notification.

If you would like to learn more about Discors you can type "voice", "servers", "channels", or "friends". For a random joke, type "joke".})

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
    current_user_id = current_user.id
      
    @servers = current_user.servers.includes(:channels, :audio_channels)
    @channels = @servers.map(&:channels).flatten.uniq
    @audio_channels = @servers.map(&:audio_channels).flatten.uniq

    @dm_channels = current_user.dm_channels
    dm_user_ids = [current_user_id]

    @dm_channels.each do |channel|
      dm_arr = channel.name.split('-')
      if dm_arr[0].to_i == current_user_id
        dm_user_ids << dm_arr[1].to_i
      else
        dm_user_ids << dm_arr[0].to_i
      end
    end
    
    @users = User.distinct.select('users.*').left_outer_joins(:friend_requests).left_outer_joins(:incoming_friend_requests).left_outer_joins(:friendships)
    .where("incoming_friend_requests_users.user_id = :current_user_id OR friend_requests.friend_id = :current_user_id OR friendships.friend_id = :current_user_id OR users.id IN (:dm_user_ids)", current_user_id: current_user_id, dm_user_ids: dm_user_ids).includes(:sessions, :server_memberships)
      # .joins("LEFT OUTER JOIN dm_channel_memberships ON dm_channel_memberships.user_id = users.id").joins("LEFT OUTER JOIN dm_channel_memberships AS dm_channel_memberships2 ON dm_channel_memberships.channel_id = dm_channel_memberships2.channel_id")
      # .where("incoming_friend_requests_users.user_id = :current_user_id OR friend_requests.friend_id = :current_user_id OR friendships.friend_id = :current_user_id OR dm_channel_memberships2.user_id = :current_user_id", current_user_id: current_user_id).includes(:sessions, :server_memberships)

    @requests = FriendRequest.where(friend_id: current_user.id).or(FriendRequest.where(user_id: current_user_id))
    @friendships = current_user.friendships.pluck(:friend_id)
    # @users = User.all.includes(:sessions, :server_memberships)
    render "api/users/user_data"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar)
  end
end