class FriendsController < ApplicationController

  def index
    @users = current_user.friends
    render "api/users/index"
  end

  def destroy
    current_user.remove_friend(current_friend)
    render "api/users/show"
  end

  private

  def current_friend
    @user ||= current_user.friends.find(params[:id])
  end
end