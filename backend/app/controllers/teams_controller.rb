class TeamsController < ApplicationController
  load_and_authorize_resource

  def index
  end

  def show
  end

  def create
    @team.save!
    render :show, status: :created
  end

  def update
    @team.update!(team_params)
    render :show, status: :ok
  end

  def destroy
    @team.destroy!
  end

  private

  def team_params
    params.require(:team).permit(:name, :description, :captain_id, team_memberships_attributes: [:user_id])
  end
end
