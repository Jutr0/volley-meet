# == Schema Information
#
# Table name: teams
#
#  id          :uuid             not null, primary key
#  description :text
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  captain_id  :uuid             not null
#
# Indexes
#
#  index_teams_on_captain_id  (captain_id)
#
# Foreign Keys
#
#  fk_rails_...  (captain_id => users.id)
#
class Team < ApplicationRecord
  belongs_to :captain, class_name: "User"
end
