class CreateDmChannelMemberships < ActiveRecord::Migration[5.2]
  def change
    create_table :dm_channel_memberships do |t|
      t.integer :user_id, null: false
      t.integer :channel_id, null: false

      t.timestamps
    end
    add_index :dm_channel_memberships, :user_id
    add_index :dm_channel_memberships, :channel_id
    add_index :dm_channel_memberships, [:user_id, :channel_id], unique: true
  end
end
