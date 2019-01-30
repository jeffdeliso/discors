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

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :avatar)
  end
end