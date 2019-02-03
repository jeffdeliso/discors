class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  private

  def current_user
    unless @current_user
      current_session = Session.find_by(session_token: session[:session_token])
      @current_user = User.find(current_session.user_id) if current_session
    end

    @current_user
  end

  def logged_in?
    !!current_user
  end

  def login(user, user_agent)
    session[:session_token] = user.reset_session_token!(user_agent)
    @current_user = user
  end

  def logout(user_agent)
    current_user.destroy_session!(user_agent)
    session[:session_token] = nil
    @current_user = nil
  end

  def require_logged_in
    unless current_user
      render json: { base: ['invalid credentials'] }, status: 401
    end
  end
end
