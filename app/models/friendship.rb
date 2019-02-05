# == Schema Information
#
# Table name: friendships
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Friendship < ApplicationRecord
  validates :user, presence: true
  validates :friend, presence: true, uniqueness: { scope: :user }
  validate :not_self

  after_create :create_inverse_relationship
  after_destroy :destroy_inverse_relationship

  belongs_to :user
  
  belongs_to :friend, 
    class_name: :User

  def send_friend
    FriendshipBroadcastJob.perform_later(self.user, self.friend, true)
  end

  def send_friend_destroy
    FriendshipBroadcastJob.perform_later(self.user, self.friend, false)
  end

  after_create_commit :send_friend
  after_destroy :send_friend_destroy

  private

  def create_inverse_relationship
    friend.friendships.create(friend: user)
  end

  def destroy_inverse_relationship
    friendship = friend.friendships.find_by(friend: user)
    friendship.destroy if friendship
  end

  def not_self
    errors.add(:friend, "can't be equal to user") if user == friend
  end
end
