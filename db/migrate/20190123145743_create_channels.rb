class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.integer :server_id

      t.timestamps
    end
    add_index :channels, :server_id
    add_index :channels, [:name, :server_id], unique: true
  end
end
