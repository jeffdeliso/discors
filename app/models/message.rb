# == Schema Information
#
# Table name: messages
#
#  id         :bigint(8)        not null, primary key
#  body       :string           not null
#  author_id  :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  validates :body, presence: true

  belongs_to :channel

  belongs_to :author,
    class_name: :User

  def send_notification
    message_channel = self.channel
    unless message_channel.server_id
      user = message_channel.members.where.not(id: self.author_id).first
      NotificationBroadcastJob.perform_later(self, user)
    end
  end

  after_create_commit :send_notification
end
