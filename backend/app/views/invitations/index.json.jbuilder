json.array!(@invitations) do |invitation|
  json.extract! invitation, :id, :status
  json.team invitation.team, :id, :name
end