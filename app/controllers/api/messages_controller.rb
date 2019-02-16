class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id

    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def index
    server = Channel.find(message_params[:channel_id])
    @messages = channel.messges
    render :index
  end

  private

  def current_message
    @message ||= Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:body, :channel_id, :author_id)
  end
end