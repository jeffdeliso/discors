json.users do
  @users.with_attached_avatar.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end
