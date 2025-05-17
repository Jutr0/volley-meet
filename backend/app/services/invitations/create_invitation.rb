module Invitations
  class CreateInvitation < BaseService
    def initialize(email:, team_id:)
      @user_email = email
      @team_id = team_id
    end

    def call
      user = User.find_by(email: @user_email)
      team = Team.find(@team_id)

      if user.nil?
        raise CustomException.new :user_email_not_found, "No user with email #{@user_email}", 404
      end

      if Invitation.exists?(user:, team:, status: Invitation.statuses[:pending])
        raise CustomException.new :invitation_already_sent, "Invitation already pending for #{user.email}", 409
      end

      Invitation.create!(user:, team:)
    end
  end
end
