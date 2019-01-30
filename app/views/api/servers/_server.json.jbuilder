icon_url = server.icon.attached? ? polymorphic_url(server.icon) : ''

json.extract! server, :id, :name, :admin_id
json.icon_url icon_url