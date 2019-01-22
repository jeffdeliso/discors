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

  belongs_to :admin,
    class_name: :User

  has_many :memberships,
    class_name: :ServerMembership

  has_many :users,
      through: :memberships,
      source: :user

end
