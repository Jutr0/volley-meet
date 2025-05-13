class AddNameSurnameAndNickToTheUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :name, :string
    add_column :users, :surname, :string
    add_column :users, :nickname, :string

    User.update_all(name: "John", surname: "Doe", nickname: "johndoe")

    change_column_null :users, :name, false
    change_column_null :users, :surname, false
  end
end
