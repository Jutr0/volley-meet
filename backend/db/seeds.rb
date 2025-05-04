if User.find_by(email: "admin@volleymeet.com").nil?
  User.create!(email: "admin@volleymeet.com", password: "password")
end