class AddColumnToSessions < ActiveRecord::Migration[5.2]
  def change
    add_column :sessions, :user_agent, :string, null: false
    add_index :sessions, :user_agent
  end
end
