class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.integer "user_id", null: false
      t.string "session_token", null: false

      t.timestamps
    end
    add_index :sessions, :user_id
    add_index :sessions, :session_token
  end
end
