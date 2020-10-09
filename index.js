
const processExists = require('process-exists')
const DiscordRPC = require('discord-rpc')
require('dotenv').config()

const clientId = process.env.CLIENT_ID
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
let startTimestamp;

async function setActivity() {
    let running = await processExists("GenshinImpact.exe")

    if (rpc && running) {
        startTimestamp = new Date()
        rpc.setActivity({
            details: 'Exploring Liyue',
            state: 'Searching For Chests',
            startTimestamp,
            largeImageKey: 'liyue',
            largeImageText: 'Liyue',
            smallImageKey: 'keqing',
            smallImageText: 'Keqing',
            instance: false,
        })
    }
    else {
        startTimestamp = 0;
        rpc.clearActivity()
    }
}

rpc.on('ready', () => {
    setActivity();

    // activity can only be set every 15 seconds
    setInterval(() => {
        setActivity();
    }, 15e3);
});

rpc.login({ clientId }).catch(console.error);