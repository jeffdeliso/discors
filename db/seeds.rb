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
jad = User.create!(username: 'jad346', email: 'jeff.deliso@gmail.com', password: 'starwars')
oliver = User.create!(username: 'oliver', email: 'oliver@gmail.com', password: 'starwars')
soonmi = User.create!(username: 'soonmi', email: 'soonmi@gmail.com', password: 'starwars')
cameron = User.create!(username: 'cameron', email: 'cameron@gmail.com', password: 'starwars')
greg = User.create!(username: 'greg', email: 'greg@gmail.com', password: 'starwars')
david = User.create!(username: 'david', email: 'david@gmail.com', password: 'starwars')
jeff = User.create!(username: 'jeff', email: 'jeff@gmail.com', password: 'starwars')
roman = User.create!(username: 'roman', email: 'roman@gmail.com', password: 'starwars')
tommy = User.create!(username: 'tommy', email: 'tommy@gmail.com', password: 'starwars')
derek = User.create!(username: 'derek', email: 'derek@gmail.com', password: 'starwars')
adam = User.create!(username: 'adam', email: 'adam@gmail.com', password: 'starwars')
terance = User.create!(username: 'terance', email: 'terance@gmail.com', password: 'starwars')
gary = User.create!(username: 'gary', email: 'gary@gmail.com', password: 'starwars')
johnny = User.create!(username: 'johnny', email: 'johnny@gmail.com', password: 'starwars')
fransisco = User.create!(username: 'fransisco', email: 'fransisco@gmail.com', password: 'starwars')
maggie = User.create!(username: 'maggie', email: 'maggie@gmail.com', password: 'starwars')
mike = User.create!(username: 'mike', email: 'mike@gmail.com', password: 'starwars')
muhammed = User.create!(username: 'muhammed', email: 'muhammed@gmail.com', password: 'starwars')
rick = User.create!(username: 'rick', email: 'rick@gmail.com', password: 'starwars')
nader = User.create!(username: 'nader', email: 'nader@gmail.com', password: 'starwars')
sam = User.create!(username: 'sam', email: 'sam@gmail.com', password: 'starwars')
zak = User.create!(username: 'zak', email: 'zak@gmail.com', password: 'starwars')
danielle = User.create!(username: 'danielle', email: 'danielle@gmail.com', password: 'starwars')
eric = User.create!(username: 'eric', email: 'eric@gmail.com', password: 'starwars')


server1 = jeff.admin_servers.create!(name: 'a/A')
server2 = guest.admin_servers.create!(name: 'not a/A')

ServerMembership.create!(user_id: guest.id, server_id: server1.id)
ServerMembership.create!(user_id: jad.id, server_id: server1.id)
ServerMembership.create!(user_id: oliver.id, server_id: server1.id)
ServerMembership.create!(user_id: soonmi.id, server_id: server1.id)
ServerMembership.create!(user_id: guest.id, server_id: server2.id)
ServerMembership.create!(user_id: cameron.id, server_id: server2.id)
ServerMembership.create!(user_id: greg.id, server_id: server1.id)
ServerMembership.create!(user_id: david.id, server_id: server1.id)
ServerMembership.create!(user_id: jeff.id, server_id: server1.id)
ServerMembership.create!(user_id: jeff.id, server_id: server2.id)
ServerMembership.create!(user_id: roman.id, server_id: server1.id)
ServerMembership.create!(user_id: tommy.id, server_id: server1.id)
ServerMembership.create!(user_id: derek.id, server_id: server1.id)
ServerMembership.create!(user_id: adam.id, server_id: server1.id)
ServerMembership.create!(user_id: gary.id, server_id: server1.id)
ServerMembership.create!(user_id: johnny.id, server_id: server1.id)
ServerMembership.create!(user_id: fransisco.id, server_id: server1.id)
ServerMembership.create!(user_id: maggie.id, server_id: server1.id)
ServerMembership.create!(user_id: mike.id, server_id: server1.id)
ServerMembership.create!(user_id: muhammed.id, server_id: server1.id)
ServerMembership.create!(user_id: rick.id, server_id: server1.id)
ServerMembership.create!(user_id: nader.id, server_id: server1.id)
ServerMembership.create!(user_id: sam.id, server_id: server1.id)
ServerMembership.create!(user_id: zak.id, server_id: server1.id)
ServerMembership.create!(user_id: danielle.id, server_id: server1.id)
ServerMembership.create!(user_id: eric.id, server_id: server1.id)
ServerMembership.create!(user_id: greg.id, server_id: server2.id)

server1.channels.create!(name: 'general')
server2.channels.create!(name: 'general')