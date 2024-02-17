local PlayerJob = ""

if GetResourceState("es_extended") == "started" then 
    local ESX = exports['es_extended']:getSharedObject()
    PlayerJob = ESX.GetPlayerData().job.name

    RegisterNetEvent('esx:playerLoaded')
    AddEventHandler('esx:playerLoaded', function(xPlayer) 
        PlayerJob = xPlayer.job.name
    end)

    RegisterNetEvent('esx:setJob')
    AddEventHandler('esx:setJob', function(job) 
        PlayerJob = job.name
    end)
else
    local QBCore = exports['qb-core']:GetCoreObject()
    PlayerJob = QBCore.Functions.GetPlayerData().job.name

    RegisterNetEvent('QBCore:Client:OnPlayerLoaded')
    AddEventHandler('QBCore:Client:OnPlayerLoaded', function(job)
		local PlayerData = QBCore.Functions.GetPlayerData()
        PlayerJob = PlayerData.job.name
    end)
    
    RegisterNetEvent('QBCore:Client:OnJobUpdate')
    AddEventHandler('QBCore:Client:OnJobUpdate', function(job)
        PlayerJob = job.name
    end)
end

local function SendReactMessage(action, data)
    SendNUIMessage({action = action, data = data})
end

local function HasJob(jobs) 
    for _, _job in pairs(jobs) do 
        if _job == PlayerJob then 
            return true
        end
    end
    return false
end

RegisterNetEvent('dispatch:client:senddispatch')
AddEventHandler('dispatch:client:senddispatch', function(data) 
    if HasJob(data.jobs) then
        SendReactMessage('showNotification', data) 
        PlaySound(-1, 'Lose_1st', 'GTAO_FM_Events_Soundset', 0, 0, 1)
        local blip = AddBlipForCoord(data.coords)
        SetBlipSprite(blip, 161)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, 1.0)
        SetBlipColour(blip, 3)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString(data.label .. " [#".. data.id .."]") -- set blip's "name"
        EndTextCommandSetBlipName(blip)
        PulseBlip(blip)
        Wait(Config.RemoveBlipAfter)
        RemoveBlip(blip)
    end
end)

RegisterCommand('testdispatch', function(_, args)
    local coords = vec3(-147.5948, -703.6071, 44.9534)
    local streetName, crossing = GetStreetNameFromHashKey(GetStreetNameAtCoord(coords.x, coords.y, coords.z))
    TriggerServerEvent('dispatch:server:senddispatch', {
        road = streetName,
        label = "Active Shooting",
        code = "10-10",
        priority = "5",
        coords = coords,
        jobs = { "unemployed" }
    })
    Wait(500)
    ExecuteCommand('e c')
    ExecuteCommand('e cop3')
    Wait(4000)
    local coords = vec3(-312.2052, -294.5097, 90.0350)
    local streetName, crossing = GetStreetNameFromHashKey(GetStreetNameAtCoord(coords.x, coords.y, coords.z))
    TriggerServerEvent('dispatch:server:senddispatch', {
        road = streetName,
        label = "Injured Person",
        code = "10-47",
        priority = "2",
        coords = coords,
        jobs = { "unemployed" }
    })
    Wait(5000)
    local coords = vec3(-280.8979, -307.5426, 96.8548)
    local streetName, crossing = GetStreetNameFromHashKey(GetStreetNameAtCoord(coords.x, coords.y, coords.z))
    TriggerServerEvent('dispatch:server:senddispatch', {
        road = streetName,
        label = "24/7 Robbery",
        code = "10-99",
        priority = "3",
        coords = coords,
        jobs = { "unemployed" }
    })
end)

RegisterKeyMapping('testdispatch', 'a', 'KEYBOARD', 'F4')