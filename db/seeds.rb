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
Session.delete_all
AudioChannel.delete_all
DmChannelMembership.delete_all
FriendRequest.delete_all
Friendship.delete_all
Message.delete_all

pod = User.create!(username: 'pod', email: 'pod@pod.com', password: '111111')
podfile = EzDownload.open('https://smedia2.intoday.in/indiatoday/images/stories/2015March/podmos-650_031115042804.jpg')
pod.avatar.attach(io: podfile, filename: 'hodor.jpg')

hodor = User.create!(username: 'hodor', email: 'hodor@hodor.com', password: 'hodorhodor')
hodorfile = EzDownload.open('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2kTIdWjVn2QyQ-ZwDHE5iWsims2y4YsQ_73IeWl84JQtH1TOD')
hodor.avatar.attach(io: hodorfile, filename: 'hodor.jpg')

westeros = pod.admin_servers.create!(name: 'westeros')
westerosfile = EzDownload.open('https://vignette.wikia.nocookie.net/gameofthrones/images/7/71/Westeros_HBO.png/revision/latest?cb=20111113154717')
westeros.icon.attach(io: westerosfile, filename: 'westeros.jpg')
ServerMembership.create!(user_id: pod.id, server_id: westeros.id)
ServerMembership.create!(user_id: hodor.id, server_id: westeros.id)

ned = User.create!(username: 'ned', email: 'ned@gmail.com', password: '111111')
nedfile = EzDownload.open('https://cdna.artstation.com/p/assets/images/images/008/596/316/large/ole-gunnar-isager-got-ned-stark.jpg?1513797479')
ned.avatar.attach(io: nedfile, filename: 'ned.jpg')
ServerMembership.create!(user_id: ned.id, server_id: westeros.id)

stark = ned.admin_servers.create!(name: 'stark')
starkfile = EzDownload.open('https://i.pinimg.com/originals/23/98/9b/23989be145941efeef8be732fc18237a.jpg')
stark.icon.attach(io: starkfile, filename: 'stark.jpg')
ServerMembership.create!(user_id: pod.id, server_id: stark.id)
ServerMembership.create!(user_id: hodor.id, server_id: stark.id)
ServerMembership.create!(user_id: ned.id, server_id: stark.id)


daenerys = User.create!(username: 'daenerys', email: 'daenerys@gmail.com', password: '111111')
daenerysfile = EzDownload.open('https://pbs.twimg.com/profile_images/899649475030900736/_MnbkXcQ_400x400.jpg')
daenerys.avatar.attach(io: daenerysfile, filename: 'daenerys.jpg')

targaryen = daenerys.admin_servers.create!(name: 'targaryen')
tarfile = EzDownload.open('http://assets.viewers-guide.hbo.com/larges1-houses-rgb-sigil-avatar-house-targaryen-1024x1024@2x.jpg')
targaryen.icon.attach(io: tarfile, filename: 'targaryen.jpg')
ServerMembership.create!(user_id: daenerys.id, server_id: targaryen.id)
ServerMembership.create!(user_id: daenerys.id, server_id: westeros.id)
ServerMembership.create!(user_id: pod.id, server_id: targaryen.id)
ServerMembership.create!(user_id: hodor.id, server_id: targaryen.id)


robert = User.create!(username: 'robert', email: 'robert@gmail.com', password: '111111')
robertfile = EzDownload.open('https://www.totallytimelines.com/wp-content/uploads/2016/09/Robert-Baratheon-257x300.jpg')
robert.avatar.attach(io: robertfile, filename: 'robert.jpg')

baratheon = robert.admin_servers.create!(name: 'baratheon')
baratheonfile = EzDownload.open('https://i0.wp.com/www.tor.com/wp-content/uploads/2014/12/got-baratheon.jpg?fit=490%2C+9999&crop=0%2C0%2C100%2C390px&ssl=1')
baratheon.icon.attach(io: baratheonfile, filename: 'baratheon.jpg')
ServerMembership.create!(user_id: pod.id, server_id: baratheon.id)
ServerMembership.create!(user_id: robert.id, server_id: baratheon.id)
ServerMembership.create!(user_id: robert.id, server_id: westeros.id)
ServerMembership.create!(user_id: hodor.id, server_id: baratheon.id)


tywin = User.create!(username: 'tywin', email: 'tywin@gmail.com', password: '111111')
tywinfile = EzDownload.open('https://vignette.wikia.nocookie.net/gameofthrones/images/b/bb/TywinLannister-Profile.PNG/revision/latest/scale-to-width-down/185?cb=20160626095349')
tywin.avatar.attach(io: tywinfile, filename: 'tywin.jpg')

lannister = tywin.admin_servers.create!(name: 'lannister')
lanfile = EzDownload.open('https://img1.cgtrader.com/items/805664/e456e68628/large/game-of-thrones-house-lannister-3d-model-max-obj-stl-mtl.jpg')
lannister.icon.attach(io: lanfile, filename: 'lannister.jpg')
ServerMembership.create!(user_id: tywin.id, server_id: lannister.id)
ServerMembership.create!(user_id: tywin.id, server_id: westeros.id)
ServerMembership.create!(user_id: pod.id, server_id: lannister.id)
ServerMembership.create!(user_id: hodor.id, server_id: lannister.id)

margaery = User.create!(username: 'margaery', email: 'margaery@gmail.com', password: '111111')
margaeryfile = EzDownload.open('https://imgix.ranker.com/user_node_img/3832/76637959/original/margaery-tyrell-tv-characters-photo-u1?w=280&h=280&fit=crop&crop=faces&q=50&fmt=jpg')

margaery.avatar.attach(io: margaeryfile, filename: 'margaery.jpg')
tyrell = margaery.admin_servers.create!(name: 'tyrell')
tyrellfile = EzDownload.open('http://www.cardgamedb.com/forums/uploads/36954e8c7284ffd4f49e35c5a1eddab8.jpg')
tyrell.icon.attach(io: tyrellfile, filename: 'tyrell.jpg')
ServerMembership.create!(user_id: margaery.id, server_id: tyrell.id)
ServerMembership.create!(user_id: margaery.id, server_id: westeros.id)
ServerMembership.create!(user_id: pod.id, server_id: tyrell.id)
ServerMembership.create!(user_id: hodor.id, server_id: tyrell.id)


catelyn = User.create!(username: 'catelyn', email: 'catelyn@gmail.com', password: '111111')
catelynfile = EzDownload.open('https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-game-of-thrones-michelle-fairley.jpg')
catelyn.avatar.attach(io: catelynfile, filename: 'catelyn.jpg')
tully = catelyn.admin_servers.create!(name: 'tully')

tullyfile = EzDownload.open('https://imgix.ranker.com/user_node_img/50025/1000496306/original/hoster-tully-tv-characters-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces')
tully.icon.attach(io: tullyfile, filename: 'tully.jpg')
ServerMembership.create!(user_id: catelyn.id, server_id: stark.id)
ServerMembership.create!(user_id: catelyn.id, server_id: tully.id)
ServerMembership.create!(user_id: catelyn.id, server_id: westeros.id)
ServerMembership.create!(user_id: pod.id, server_id: tully.id)
ServerMembership.create!(user_id: hodor.id, server_id: tully.id)


oberyn = User.create!(username: 'oberyn', email: 'oberyn@gmail.com', password: '111111')
oberynfile = EzDownload.open('https://66.media.tumblr.com/477b3e7b4d757fb6edd63fdc7cb162d0/tumblr_ovbr6uaUKV1w2ye78o1_400.png')
oberyn.avatar.attach(io: oberynfile, filename: 'oberyn.jpg')

martell = oberyn.admin_servers.create!(name: 'martell')
martellfile = EzDownload.open('https://images.8tracks.com/cover/i/002/049/831/house-martell-game-of-thrones-movie-hd-wallpaper-1920x1080-9085-1109.jpg?rect=420,0,1080,1080&q=98&fm=jpg&fit=max&w=960&h=960')
martell.icon.attach(io: martellfile, filename: 'martell.jpg')
ServerMembership.create!(user_id: oberyn.id, server_id: martell.id)
ServerMembership.create!(user_id: oberyn.id, server_id: westeros.id)
ServerMembership.create!(user_id: pod.id, server_id: martell.id)
ServerMembership.create!(user_id: hodor.id, server_id: martell.id)


theon = User.create!(username: 'theon', email: 'theon@gmail.com', password: '111111')
theonfile = EzDownload.open('http://3.bp.blogspot.com/-z6YP-pe7Yrw/VaBeYis_pcI/AAAAAAAALmo/yijsmLE13-w/s1600/Theon_At_Winterfell.jpg')
theon.avatar.attach(io: theonfile, filename: 'theon.jpg')

greyjoy = theon.admin_servers.create!(name: 'greyjoy')
greyjoyfile = EzDownload.open('https://vignette.wikia.nocookie.net/gameofthrones/images/2/28/Greyjoy_Shield.jpg/revision/latest?cb=20120314225352')
greyjoy.icon.attach(io: greyjoyfile, filename: 'greyjoy.jpg')
ServerMembership.create!(user_id: pod.id, server_id: greyjoy.id)
ServerMembership.create!(user_id: theon.id, server_id: greyjoy.id)
ServerMembership.create!(user_id: theon.id, server_id: westeros.id)
ServerMembership.create!(user_id: hodor.id, server_id: greyjoy.id)


littlefinger = User.create!(username: 'littlefinger', email: 'littlefinger@gmail.com', password: '111111')
littlefingerfile = EzDownload.open('https://pixel.nymag.com/imgs/daily/vulture/2014/05/05/05-littlefinger-game-of-thrones.w700.h700.jpg')
littlefinger.avatar.attach(io: littlefingerfile, filename: 'littlefinger.jpg')

arryn = littlefinger.admin_servers.create!(name: 'arryn')
arrynfile = EzDownload.open('https://i.pinimg.com/236x/56/7b/16/567b16b5a74a0d24aa941b328ac87d8f.jpg')
arryn.icon.attach(io: arrynfile, filename: 'arryn.jpg')
ServerMembership.create!(user_id: littlefinger.id, server_id: arryn.id)
ServerMembership.create!(user_id: littlefinger.id, server_id: westeros.id)
ServerMembership.create!(user_id: pod.id, server_id: arryn.id)
ServerMembership.create!(user_id: hodor.id, server_id: arryn.id)



arya = User.create!(username: 'arya', email: 'arya@gmail.com', password: '111111')
aryafile = EzDownload.open('https://pbs.twimg.com/profile_images/894833370299084800/dXWuVSIb_400x400.jpg')
arya.avatar.attach(io: aryafile, filename: 'arya.jpg')
ServerMembership.create!(user_id: arya.id, server_id: stark.id)
ServerMembership.create!(user_id: arya.id, server_id: westeros.id)
jon = User.create!(username: 'jon', email: 'jon@gmail.com', password: '111111')
jonfile = EzDownload.open('https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2016%2F05%2Fjon-in-the-snow.jpg&c=sc&w=736&h=485')
jon.avatar.attach(io: jonfile, filename: 'jon.jpg')
ServerMembership.create!(user_id: jon.id, server_id: stark.id)
ServerMembership.create!(user_id: jon.id, server_id: targaryen.id)
ServerMembership.create!(user_id: jon.id, server_id: westeros.id)
bran = User.create!(username: 'bran', email: 'bran@gmail.com', password: '111111')
branfile = EzDownload.open('https://vignette.wikia.nocookie.net/westeropedia/images/3/33/Bran_Stark.png/revision/latest?cb=20120913150346&path-prefix=nl')
bran.avatar.attach(io: branfile, filename: 'bran.jpg')
ServerMembership.create!(user_id: bran.id, server_id: stark.id)
ServerMembership.create!(user_id: bran.id, server_id: westeros.id)
sansa = User.create!(username: 'sansa', email: 'sansa@gmail.com', password: '111111')
sansafile = EzDownload.open('https://pbs.twimg.com/profile_images/895515853365665792/1Qu_tdvS_400x400.jpg')
sansa.avatar.attach(io: sansafile, filename: 'sansa.jpg')
ServerMembership.create!(user_id: sansa.id, server_id: stark.id)
ServerMembership.create!(user_id: sansa.id, server_id: westeros.id)
rickon = User.create!(username: 'rickon', email: 'rickon@gmail.com', password: '111111')
rickonfile = EzDownload.open('https://i.pinimg.com/236x/ef/34/f3/ef34f3744e17d3cf532f7752eba2c8bd--house-stark-game-of.jpg')
rickon.avatar.attach(io: rickonfile, filename: 'rickon.jpg')
ServerMembership.create!(user_id: rickon.id, server_id: stark.id)
ServerMembership.create!(user_id: rickon.id, server_id: westeros.id)

joffrey = User.create!(username: 'joffrey', email: 'joffrey@gmail.com', password: '111111')
joffreyfile = EzDownload.open('http://pa1.narvii.com/6045/9968e5d3dcf97542915e7fbeecc4b51de104c822_00.gif')
joffrey.avatar.attach(io: joffreyfile, filename: 'joffrey.jpg')
ServerMembership.create!(user_id: joffrey.id, server_id: lannister.id)
ServerMembership.create!(user_id: joffrey.id, server_id: westeros.id)
ServerMembership.create!(user_id: joffrey.id, server_id: baratheon.id)
tommen = User.create!(username: 'tommen', email: 'tommen@gmail.com', password: '111111')
tommenfile = EzDownload.open('https://imgix.ranker.com/user_node_img/113/2255761/original/tommen-baratheon-u1?w=280&h=280&fit=crop&crop=faces&q=50&fmt=jpg')
tommen.avatar.attach(io: tommenfile, filename: 'tommen.jpg')
ServerMembership.create!(user_id: tommen.id, server_id: lannister.id)
ServerMembership.create!(user_id: tommen.id, server_id: westeros.id)
ServerMembership.create!(user_id: tommen.id, server_id: baratheon.id)
myrcella = User.create!(username: 'myrcella', email: 'myrcella@gmail.com', password: '111111')
myrcellafile = EzDownload.open('https://got2016-nocompany1458150561.netdna-ssl.com/People/myrcella-baratheon-d.jpg')
myrcella.avatar.attach(io: myrcellafile, filename: 'myrcella.jpg')
ServerMembership.create!(user_id: myrcella.id, server_id: lannister.id)
ServerMembership.create!(user_id: myrcella.id, server_id: westeros.id)
ServerMembership.create!(user_id: myrcella.id, server_id: baratheon.id)
cersei = User.create!(username: 'cersei', email: 'cersei@gmail.com', password: '111111')
cerseifile = EzDownload.open('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJFyp_RsWpJdmVBN9A736pjeswwAgfRE4WVYUVoC4ANPuDAUg')
cersei.avatar.attach(io: cerseifile, filename: 'cersei.jpg')
ServerMembership.create!(user_id: cersei.id, server_id: lannister.id)
ServerMembership.create!(user_id: cersei.id, server_id: westeros.id)
ServerMembership.create!(user_id: cersei.id, server_id: baratheon.id)
jaime = User.create!(username: 'jaime', email: 'jaime@gmail.com', password: '111111')
jaimefile = EzDownload.open('https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-game-of-thrones-nickolaj-coster-waldau.jpg')
jaime.avatar.attach(io: jaimefile, filename: 'jaime.jpg')
ServerMembership.create!(user_id: jaime.id, server_id: westeros.id)
ServerMembership.create!(user_id: jaime.id, server_id: lannister.id)
tyrion = User.create!(username: 'tyrion', email: 'tyrion@gmail.com', password: '111111')
tyrionfile = EzDownload.open('https://pbs.twimg.com/profile_images/668279339838935040/8sUE9d4C_400x400.jpg')
tyrion.avatar.attach(io: tyrionfile, filename: 'tyrion.jpg')
ServerMembership.create!(user_id: tyrion.id, server_id: westeros.id)
ServerMembership.create!(user_id: tyrion.id, server_id: lannister.id)

loras = User.create!(username: 'loras', email: 'loras@gmail.com', password: '111111')
lorasfile = EzDownload.open('https://pbs.twimg.com/profile_images/462627607020724224/r5Npyu6U_400x400.jpeg')
loras.avatar.attach(io: lorasfile, filename: 'loras.jpg')
ServerMembership.create!(user_id: loras.id, server_id: westeros.id)
ServerMembership.create!(user_id: loras.id, server_id: tyrell.id)

reek = User.create!(username: 'reek', email: 'reek@gmail.com', password: '111111')
reekfile = EzDownload.open('https://images.8tracks.com/cover/i/008/785/494/theon-160.png?rect=0,0,500,500&q=98&fm=jpg&fit=max')
reek.avatar.attach(io: reekfile, filename: 'reek.jpg')
ServerMembership.create!(user_id: reek.id, server_id: westeros.id)
ServerMembership.create!(user_id: reek.id, server_id: greyjoy.id)

robin = User.create!(username: 'robin', email: 'robin@gmail.com', password: '111111')
robinfile = EzDownload.open('https://got2016-nocompany1458150561.netdna-ssl.com/People/robin-arryn-6.jpg')
robin.avatar.attach(io: robinfile, filename: 'robin.jpg')
ServerMembership.create!(user_id: robin.id, server_id: westeros.id)
ServerMembership.create!(user_id: robin.id, server_id: arryn.id)
lysa = User.create!(username: 'lysa', email: 'lysa@gmail.com', password: '111111')
lysafile = EzDownload.open('https://pbs.twimg.com/profile_images/787041526664798208/-1w9m9GB_400x400.jpg')
lysa.avatar.attach(io: lysafile, filename: 'lysa.jpg')
ServerMembership.create!(user_id: lysa.id, server_id: arryn.id)
ServerMembership.create!(user_id: lysa.id, server_id: westeros.id)
ServerMembership.create!(user_id: lysa.id, server_id: tully.id)

door = User.create!(username: 'door', email: 'door@gmail.com', password: '111111')
doorfile = EzDownload.open('https://pre00.deviantart.net/c944/th/pre/i/2016/150/a/0/hodor___hold_the_door_by_frank_rod-da4c6oq.jpg')
door.avatar.attach(io: doorfile, filename: 'door.jpg')

Friendship.create!(user_id: hodor.id, friend_id: bran.id)
Friendship.create!(user_id: hodor.id, friend_id: arya.id)
Friendship.create!(user_id: hodor.id, friend_id: ned.id)
Friendship.create!(user_id: hodor.id, friend_id: sansa.id)
Friendship.create!(user_id: hodor.id, friend_id: jon.id)
Friendship.create!(user_id: hodor.id, friend_id: catelyn.id)
Friendship.create!(user_id: hodor.id, friend_id: rickon.id)

FriendRequest.create!(user_id: joffrey.id, friend_id: hodor.id)
FriendRequest.create!(user_id: reek.id, friend_id: hodor.id)
FriendRequest.create!(user_id: daenerys.id, friend_id: hodor.id)
FriendRequest.create!(user_id: door.id, friend_id: hodor.id)

stark.channels.create!(name: 'general')
stark.channels.create!(name: 'Lannisters are the worst')
targaryen.channels.create!(name: 'general')
martell.channels.create!(name: 'general')
lannister.channels.create!(name: 'general')
tully.channels.create!(name: 'general')
baratheon.channels.create!(name: 'general')
tyrell.channels.create!(name: 'general')
greyjoy.channels.create!(name: 'general')
arryn.channels.create!(name: 'general')
westeros.channels.create!(name: 'general')

stark.audio_channels.create!(name: 'General')
stark.audio_channels.create!(name: 'Is winter coming?')
targaryen.audio_channels.create!(name: 'General')
martell.audio_channels.create!(name: 'General')
lannister.audio_channels.create!(name: 'General')
tully.audio_channels.create!(name: 'General')
baratheon.audio_channels.create!(name: 'General')
tyrell.audio_channels.create!(name: 'General')
greyjoy.audio_channels.create!(name: 'General')
arryn.audio_channels.create!(name: 'General')
westeros.audio_channels.create!(name: 'General')

