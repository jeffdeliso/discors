# == Schema Information
#
# Table name: sessions
#
#  id            :bigint(8)        not null, primary key
#  user_id       :integer          not null
#  session_token :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Session < ApplicationRecord
  validates :session_token, presence: true, uniqueness: true

  belongs_to :user
end
