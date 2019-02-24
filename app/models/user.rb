# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  image_url       :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

  DEFAULT_ICONS = %w(blue gray red yellow green)

  attr_reader :password

  validates :username, :email, :password_digest, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_icon
  after_create :create_bot

  has_many :server_memberships

  has_many :servers,
    through: :server_memberships,
    source: :server

  has_many :server_users,
    through: :servers,
    source: :members

  has_many :server_channels,
    through: :servers,
    source: :channels

  has_many :audio_channels,
    through: :servers,
    source: :audio_channels

  has_many :admin_servers,
    class_name: :Server,
    foreign_key: :admin_id

  has_many :messages,
    foreign_key: :author_id

  has_many :message_channels,
    through: :messages,
    source: :channel

  has_many :dm_channel_memberships

  has_many :dm_channels,
    through: :dm_channel_memberships,
    source: :channel

  has_many :dm_users,
    through: :dm_channels,
    source: :members

  has_many :friend_requests

  has_many :incoming_friend_requests,
    class_name: :FriendRequest,
    foreign_key: :friend_id

  has_many :incoming_friends,
    through: :incoming_friend_requests,
    source: :user

  has_many :pending_friends, 
    through: :friend_requests, 
    source: :friend

  has_many :friendships

  has_many :friends, 
    through: :friendships

  has_many :sessions

  has_one_attached :avatar

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!(user_agent)
    destroy_session!(user_agent)
    session_token = generate_unique_session_token
    session = self.sessions.create(session_token: session_token, user_agent: user_agent)

    session_token
  end

  def destroy_session!(user_agent)
    user_agent_session = self.sessions.find_by(user_agent: user_agent)
    user_agent_session.destroy if user_agent_session
  end

  def remove_friend(friend)
    self.friends.destroy(friend)
  end

  private

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    session_token = new_session_token
    while Session.find_by(session_token: session_token)
      session_token = new_session_token
    end

    session_token
  end

  def ensure_icon
    self.image_url ||= "https://s3.amazonaws.com/discors-dev/User+Icons/#{DEFAULT_ICONS.sample}.png"
  end

  def create_bot
    bot_id = 97
    user_id = self.id
    name = user_id > bot_id ? "#{bot_id}-#{user_id}" : "#{user_id}-#{bot_id}"
    channel = Channel.find_or_create_by(name: name)
    channel.dm_memberships.create(user_id: bot_id)
    channel.dm_memberships.create(user_id: user_id)
    Message.create!(author_id: bot_id, channel_id: channel.id, body: %Q{Welcome to Discors! I'm here to keep you company and help you test the site.

If you would like to be friends type "send" and I will send you a friend request in real time.

If you would like to test DM notifications type "test" and I will send you a message in 5 seconds.  Make sure to navigate away from this channel to receive the notification.

If you would like to learn more about Discors you can type "voice", "servers", "channels", or "friends". For a random joke, type "joke".})
  end
end
