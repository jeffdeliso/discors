class Api::ServersController < ApplicationController
  def create
    @server = current_user.admin_servers.new(name: server_params[:name])

    if @server.save
      render "api/servers/show"
    else
      render json: @user.errors.full_messages, status: 422
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