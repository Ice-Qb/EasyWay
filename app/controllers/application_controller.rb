class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  before_filter :guest_menu

  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
    @current_user ||= User.find_by_authentication_token(cookies[:auth_token]) if cookies[:auth_token] && @current_user.nil?
    @current_user
  end


  def guest_menu
    @Menu_items=Menu.order("ancestry desc")
  end
end