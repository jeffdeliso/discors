# == Schema Information
#
# Table name: friend_requests
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FriendRequest < ApplicationRecord
  validates :user, presence: true
  validates :friend, presence: true, uniqueness: { scope: :user }
  validate :not_self
  validate :not_friends
  validate :not_pending

  belongs_to :user
  
  belongs_to :friend, 
    class_name: :User

  def accept
    user.friends << friend
    destroy
  end

  def send_request
    FriendRequestBroadcastJob.perform_later(self, true)
  end

  def send_request_destroy
    FriendRequestBroadcastJob.perform_later(self, false)
  end

  after_create_commit :send_request
  after_destroy :send_request_destroy
  
  private

  def not_self
    errors.add(:friend, "can't be equal to user") if user == friend
  end

  def not_friends
    errors.add(:friend, 'is already added') if user.friends.include?(friend)
  end

  def not_pending
    errors.add(:friend, 'already requested friendship') if friend.pending_friends.include?(user)
  end
end
