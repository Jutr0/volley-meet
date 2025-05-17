json.extract! @team, :id, :name, :description
json.captain do
  json.extract! @team.captain, :id, :name, :surname, :nickname
end
json.members do
  json.array! @team.members, partial: "users/user", as: :user
end
