json.partial! "teams/team", team: @team

json.members do
  json.array! @team.members, partial: "users/user", as: :user
end
