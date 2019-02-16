class Api::FriendRequestsController < ApplicationController

  def create
    friend = User.find(friend_request_params[:friend_id])
    @friend_request = current_user.friend_requests.new(friend: friend)

    if @friend_request.save
      @user = current_user
      render 'api/friend_requests/show'
    else
      render json: @friend_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    current_friend_request.destroy
    render :show
  end

  def update
    current_friend_request.accept
    render :show
  end
  
  private

  def friend_request_params
    params.require(:friend_request).permit(:friend_id)
  end

  def current_friend_request
    @friend_request ||= FriendRequest.find(params[:id])
  end
end