# == Schema Information
#
# Table name: sessions
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_agent    :string           not null
#

class Session < ApplicationRecord
  validates :session_token, :user_agent, presence: true
  validates :session_token, uniqueness: true

  belongs_to :user
end
