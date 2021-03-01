const Discord = require('discord.js')
const TOKEN = require('../../secret.json').token;




module.exports = function (file = "", filename) {
    return new Promise(async function (resolve, reject) {
        const client = new Discord.Client();
        client.login(TOKEN);
        client.on("ready", async () => {
            /**
             * @type {Discord.TextChannel}
             */
            const channel = await client.channels.fetch("816066387063341106", false, true);
            const msg = await channel.send({
                files: [{
                    attachment: Buffer.from(file),
                    name: filename
                }]
            });
            const str = msg.attachments.array()[0].attachment;
            resolve(str);
            client.destroy();
        });
    });
}