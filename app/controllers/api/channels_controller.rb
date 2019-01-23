class Api::ChannelsController < ApplicationController
  def create
    # @channel = current_user.admin_servers.new(name: server_params[:name])

    if @channel.save
      render "api/channels/show"
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def show
    # @server = Server.find_by(name: server_params[:name])
    # if @server 
    #   current_user.server_memberships.create(server_id: @server.id)
    #   render :show
    # else
    #   render json: ["Server does not exist"], status: 401
    # end
    current_channel
  end

  def index
    
  end

  private

  def current_channel
    @channel ||= Channel.find(params[:id])
  end

  def server_params
    params.require(:channel).permit(:name, :server_id)
  end
end