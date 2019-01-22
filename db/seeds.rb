# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.delete_all
Server.delete_all
ServerMembership.delete_all

guest = User.create!(username: 'guest', email: 'guest@guest.com', password: 'starwars')

server1 = guest.admin_servers.create!(name: 'First Server')
ServerMembership.create!(user_id: guest.id, server_id: server1.id)