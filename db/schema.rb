# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_18_200301) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "audio_channels", force: :cascade do |t|
    t.string "name", null: false
    t.integer "server_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "server_id"], name: "index_audio_channels_on_name_and_server_id", unique: true
    t.index ["server_id"], name: "index_audio_channels_on_server_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "name", null: false
    t.integer "server_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "server_id"], name: "index_channels_on_name_and_server_id", unique: true
    t.index ["name"], name: "index_channels_on_name"
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "dm_channel_memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_dm_channel_memberships_on_channel_id"
    t.index ["user_id", "channel_id"], name: "index_dm_channel_memberships_on_user_id_and_channel_id", unique: true
    t.index ["user_id"], name: "index_dm_channel_memberships_on_user_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "friend_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friend_requests_on_friend_id"
    t.index ["user_id", "friend_id"], name: "index_friend_requests_on_user_id_and_friend_id", unique: true
    t.index ["user_id"], name: "index_friend_requests_on_user_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "friend_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
    t.index ["user_id", "friend_id"], name: "index_friendships_on_user_id_and_friend_id", unique: true
    t.index ["user_id"], name: "index_friendships_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body", null: false
    t.integer "author_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["channel_id"], name: "index_messages_on_channel_id"
  end

  create_table "server_memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_server_memberships_on_server_id"
    t.index ["user_id", "server_id"], name: "index_server_memberships_on_user_id_and_server_id", unique: true
    t.index ["user_id"], name: "index_server_memberships_on_user_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.integer "admin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_servers_on_admin_id"
    t.index ["name"], name: "index_servers_on_name", unique: true
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_agent", null: false
    t.index ["session_token"], name: "index_sessions_on_session_token"
    t.index ["user_agent"], name: "index_sessions_on_user_agent"
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "image_url", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
