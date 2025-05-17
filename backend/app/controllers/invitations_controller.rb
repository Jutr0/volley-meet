class InvitationsController < ApplicationController
  load_and_authorize_resource except: :invite

  def index
    @invitations = @invitations.reorder(created_at: :desc)
  end

  def invite
    Invitations::CreateInvitation.call(email: invitation_params[:email], team_id: invitation_params[:team_id])
    render status: :created, json: { message: "Invitation sent" }
  end

  def accept
    Invitations::AcceptInvitation.call(invitation: @invitation)
  end

  def decline
    Invitations::DeclineInvitation.call(invitation: @invitation)
  end

  private

  def invitation_params
    params.require(:invitation).permit(:email, :team_id)
  end
end
