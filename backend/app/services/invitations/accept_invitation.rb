module Invitations
  class AcceptInvitation < BaseService
    def initialize(invitation:)
      @invitation = invitation
    end

    def call
      ActiveRecord::Base.transaction do
        user_id = @invitation.user_id
        team_id = @invitation.team_id
        TeamMembership.create!(user_id:, team_id:)
        @invitation.update!(status: Invitation.statuses[:accepted])
      end
    end
  end
end
