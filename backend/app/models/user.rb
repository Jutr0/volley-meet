# == Schema Information
#
# Table name: users
#
#  id                 :uuid             not null, primary key
#  email              :string           not null
#  encrypted_password :string           not null
#  name               :string           not null
#  nickname           :string
#  role               :string           not null
#  surname            :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  enum :role, { user: 'user', superadmin: 'superadmin', guest: 'guest' }, default: :user
  validates :password_confirmation, presence: true, on: :create

  has_one :team_membership, dependent: :destroy
  has_one :team, through: :team_membership
  has_many :invitations, dependent: :destroy

  def username
    "#{name} #{nickname ? "'#{nickname}'" : ""} #{surname}"
  end

  def has_team?
    team.present?
  end

  def captain?
    has_team? && team.captain == self
  end

end
