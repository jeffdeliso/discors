# == Schema Information
#
# Table name: servers
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  admin_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Server < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  belongs_to :admin,
    class_name: :User

  has_many :memberships,
    class_name: :ServerMembership,
    dependent: :destroy

  has_many :members,
      through: :memberships,
      source: :user

  has_many :channels,
    dependent: :destroy

  has_many :audio_channels,
    dependent: :destroy
  
  has_many :server_messages,
    through: :channels,
    source: :messages

  has_many :message_users,
    through: :server_messages,
    source: :author

  has_one_attached :icon
end
