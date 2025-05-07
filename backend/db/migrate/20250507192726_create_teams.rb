class CreateTeams < ActiveRecord::Migration[8.0]
  def change
    create_table :teams, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.references :captain,
                   null: false,
                   type: :uuid,
                   foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
