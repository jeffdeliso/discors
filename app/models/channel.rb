# == Schema Information
#
# Table name: channels
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  server_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: {scope: :server_id}

  belongs_to :server,
    optional: true

  has_many :messages,
    dependent: :destroy

  has_many :dm_memberships,
    class_name: :DmChannelMembership,
    dependent: :destroy

  has_many :members,
    through: :dm_memberships,
    source: :user

end
