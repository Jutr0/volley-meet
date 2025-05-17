# == Schema Information
#
# Table name: invitations
#
#  id         :uuid             not null, primary key
#  status     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  team_id    :uuid             not null
#  user_id    :uuid             not null
#
# Indexes
#
#  index_invitations_on_team_id  (team_id)
#  index_invitations_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (team_id => teams.id)
#  fk_rails_...  (user_id => users.id)
#
class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :team

  enum :status, { pending: 'pending', accepted: 'accepted', declined: 'declined' }, default: :pending

end
