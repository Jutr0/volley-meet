module Invitations
  class AcceptInvitation < BaseService
    def initialize(invitation:)
      @invitation = invitation
    end

    def call
      ActiveRecord::Base.transaction do
        @invitation.update!(status: Invitation.statuses[:accepted])
        Teams::CreateMembership.call(team_id: @invitation.team_id, user_id: @invitation.user_id)
      end
    end
  end
end
