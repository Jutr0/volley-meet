# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new(role: 'guest')

    if user.superadmin?
      can :manage, :all
    end
    if user.captain?
      can :create, Invitation, team_id: user.team_membership.team_id
    end
    if user.user?
      can [:read, :accept, :decline], Invitation, user_id: user.id
      can :read, User, id: user.id
      can :update, User, id: user.id
    end
  end
end
