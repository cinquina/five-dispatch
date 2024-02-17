local calls = 0

RegisterServerEvent('dispatch:server:senddispatch')
AddEventHandler('dispatch:server:senddispatch', function(data) 
    calls+=1
    data.id = calls
    TriggerClientEvent('dispatch:client:senddispatch', -1, data)
end)