icon_url = (server.icon.attached? ? url_for(server.icon) : '')
channels = server.channels
first_channel = channels.select { |channel| channel.name == "general" }.first
root_channel = (first_channel ? first_channel.id : '')

json.extract! server, :id, :name, :admin_id
json.icon_url icon_url
json.root_channel root_channel