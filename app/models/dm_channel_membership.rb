# == Schema Information
#
# Table name: dm_channel_memberships
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DmChannelMembership < ApplicationRecord
  validates :user_id, uniqueness: {scope: :channel_id}

  belongs_to :channel

  belongs_to :user
end
