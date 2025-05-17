module Invitations
  class DeclineInvitation < BaseService
    def initialize(invitation:)
      @invitation = invitation
    end

    def call
      @invitation.update!(status: Invitation.statuses[:declined])
    end
  end
end
