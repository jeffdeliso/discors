class Api::ServersController < ApplicationController
  def create
    @server = current_user.admin_servers.new(server_params)

    if @server.save
      current_user.server_memberships.create!(server_id: @server.id)
      @server.channels.create!(name: 'general')
      @server.audio_channels.create!(name: 'General')
      
      render "api/servers/show"
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def index
    @servers = Server.all.includes(:channels)
  end

  def join
    @server = Server.find_by(name: server_params[:name])
    if @server 
      current_user.server_memberships.create(server_id: @server.id)
      render :show
    else
      render json: ["Server does not exist"], status: 401
    end
  end

  def members
    if current_server
      @users = User.distinct.select('users.*').left_outer_joins(:message_channels).left_outer_joins(:server_memberships)
        .where("server_memberships.server_id = :current_server_id OR channels.server_id = :current_server_id", current_server_id: current_server.id)
        .includes(:sessions, :server_memberships)
      # @users = current_server.members.includes(:sessions, :server_memberships)
      render "api/users/index"
    else
      render json: ["Server does not exist"], status: 401
    end
  end

  def destroy
    if current_user.id == current_server.admin_id
      current_server.destroy
    else
      current_user.server_memberships.find_by(server_id: current_server.id).destroy
    end

    render :show
  end

  private

  def current_server
    @server ||= Server.find_by(id: params[:id])
  end

  def server_params
    params.require(:server).permit(:name, :icon)
  end
end