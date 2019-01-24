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
Channel.delete_all

guest = User.create!(username: 'guest', email: 'guest@guest.com', password: 'starwars')
jeff = User.create!(username: 'jad346', email: 'jeff@gmail.com', password: 'starwars')
oliver = User.create!(username: 'oliver', email: 'oliver@gmail.com', password: 'starwars')
soonmi = User.create!(username: 'soonmi', email: 'soonmi@gmail.com', password: 'starwars')
cameron = User.create!(username: 'cameron', email: 'cameron@gmail.com', password: 'starwars')


server1 = guest.admin_servers.create!(name: 'First Server')
server2 = guest.admin_servers.create!(name: 'Second Server')

ServerMembership.create!(user_id: guest.id, server_id: server1.id)
ServerMembership.create!(user_id: jeff.id, server_id: server1.id)
ServerMembership.create!(user_id: oliver.id, server_id: server1.id)
ServerMembership.create!(user_id: soonmi.id, server_id: server1.id)
ServerMembership.create!(user_id: guest.id, server_id: server2.id)
ServerMembership.create!(user_id: cameron.id, server_id: server2.id)
ServerMembership.create!(user_id: cameron.id, server_id: server1.id)

server1.channels.create!(name: 'general')
server2.channels.create!(name: 'general')