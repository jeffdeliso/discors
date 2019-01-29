# == Schema Information
#
# Table name: audio_channels
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  server_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class AudioChannel < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: {scope: :server_id}

  belongs_to :server,
    optional: true
end
