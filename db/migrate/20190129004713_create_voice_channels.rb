class CreateVoiceChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :voice_channels do |t|
      t.string :name, null: false
      t.integer :server_id

      t.timestamps
    end
    add_index :voice_channels, :server_id
    add_index :voice_channels, [:name, :server_id], unique: true
  end
end
