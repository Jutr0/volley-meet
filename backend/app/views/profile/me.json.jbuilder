json.extract! @user, :id, :email, :role, :name, :surname, :nickname
if @user.team.present?
  json.team do
    json.extract! @user.team, :id, :name
    json.captain @user.captain?
  end
end