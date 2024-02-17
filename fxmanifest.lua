fx_version "cerulean"
author "Five Developments"
lua54 'yes'

game "gta5"

ui_page 'web/build/index.html'

shared_script "config.lua"
client_script "client.lua"
server_script "server.lua"

files {
	'web/build/index.html',
	'web/build/**/*',
}