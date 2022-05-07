const { Webhook, MessageBuilder } = require('discord-webhook-node');

const sendMessage = (url, from, to, amount, currency) => {
    const hook = new Webhook(url);
    const embed = new MessageBuilder()
        .setTitle('Transaction of ' + amount + ' ' + currency)
        .setAuthor('Snitcher', 'https://i.imgur.com/o1mhcnV.png')
        .addField('From', from, true)
        .addField('To', to, true)
        .setColor('#00b0f4')
        .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
        .setDescription('Description')
        .setFooter('Powered by Snitcher', 'https://i.imgur.com/o1mhcnV.png')
        .setTimestamp();

    hook.send(embed);
}

module.exports = {
    sendMessage
}