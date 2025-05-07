json.extract! team, :id, :name, :description
json.captain do
  json.extract! team.captain, :id, :email
end