class Api::ServersController < ApplicationController
  def create
    @server = current_user.admin_servers.new(name: server_params[:name])

    if @server.save
      current_user.server_memberships.create!(server_id: @server.id)
      @server.channels.create!(name: 'general')
      render "api/servers/show"
    else
      render json: @server.errors.full_messages, status: 422
    end
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

  def show
    current_server
  end

  def index
    @servers = current_user.servers
  end

  private

  def current_server
    @server ||= Server.find(params[:id])
  end

  def server_params
    params.require(:server).permit(:name)
  end
end