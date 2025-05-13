class UsersController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def update
    @user.update!(user_params)
    render :show, status: :ok
  end

  def create
    @user.save!
    render :show, status: :created
  end

  def destroy
    @user.destroy!
  end

  def search
    @users = @users.where("email LIKE ?", "%#{params[:query]}%").limit(10)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role, :name, :surname, :nickname)
  end
end
