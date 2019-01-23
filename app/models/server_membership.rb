# == Schema Information
#
# Table name: server_memberships
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ServerMembership < ApplicationRecord
  validates :user_id, uniqueness: {scope: :server_id}

  belongs_to :server

  belongs_to :user

end
