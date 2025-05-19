module Teams
  class CreateMembership < BaseService
    def initialize(team_id:, user_id:)
      @team_id = team_id
      @user_id = user_id
    end

    def call
      TeamMembership.create!(user_id: @user_id, team_id: @team_id)
    end
  end
end