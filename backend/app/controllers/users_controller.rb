class UsersController < ApplicationController
  def me
    @user = current_user
  end
end
