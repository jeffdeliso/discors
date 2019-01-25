# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  image_url       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord

  DEFAULT_ICONS = %w(blue gray red yellow green)

  attr_reader :password

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token, :ensure_icon

  attr_reader :password

  has_many :server_memberships

  has_many :servers,
    through: :server_memberships,
    source: :server

  has_many :admin_servers,
    class_name: :Server,
    foreign_key: :admin_id

  has_many :messages,
    foreign_key: :author_id

  has_many :dm_channel_memberships

  has_many :dm_channels,
    through: :dm_channel_memberships,
    source: :channel

  has_many :dm_users,
    through: :dm_channels,
    source: :members

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

  def reset_session_token!
    generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

  def ensure_icon
    self.image_url ||= "https://s3.amazonaws.com/discors-dev/User+Icons/#{DEFAULT_ICONS.sample}.png"
  end
end
