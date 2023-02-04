const axios = require('axios');
const fs = require('fs');
const path = require('path');
const configFile = fs.readFileSync(path.join(__dirname, 'config.json'));
const config = JSON.parse(configFile);

const sendToWebhook = async (url) => {
    try {
        const response = await axios.post(url, {
            "content": '@everyone @here',
            "embeds": [
                {
                    "title": `**${config.embeds.title}**`,
                    "description": `**${config.embeds.description}**\n\n@everyone @here`,
                    "color": 15729925,
                    "author": {
                        "name": config.embeds.author.name
                    },
                    "thumbnail": {
                        "url": config.embeds.thumbnail
                    }
                }
            ],
            "username": config.embeds.author.name,
            "avatar_url": config.embeds.author.avatar_url,
            "attachments": []
        });
        console.log(`Successfully sent to ${url}`);
    } catch (error) {
        console.log(error)
        console.error(`Failed to send to ${url}`);
    }
};

const deleteWebhook = async (url) => {
    try {
        const response = await axios.delete(url);
        console.log(`Successfully deleted ${url}`);
    } catch (error) {
        console.error(`Failed to delete ${url}`);
    }
}

const parseIntegers = (number) => {
    if (isNaN(number)) {
        number = number.replace(/\D/g, '');
    } else if (number === null) {
        number = 0;
    } else if (number === undefined) {
        number = 0;
    } else if (number === '') {
        number = 0;
    }
    return parseInt(number);
}


switch (config.method) {
    case 'simultaneously':
        (async () => {
            for (let i = 0; i < parseIntegers(config.interval); i++) {
                console.log(i)
                await Promise.all(config.webhooks.map(sendToWebhook));
                await new Promise((resolve) => {
                    setTimeout(resolve, config.frequency);
                });
            }
        })();
        break;
    case 'one-by-one-and-delete':
        (async () => {
            for (let i = 0; i < parseIntegers(config.webhooks.length); i++) {
                const webhook = config.webhooks[i];
                for (let j = 0; j < parseIntegers(config.interval); j++) {
                    await sendToWebhook(webhook)
                    await new Promise((resolve) => {
                        setTimeout(resolve, config.frequency);
                    });
                }
                try {
                    await axios.delete(webhook)
                    console.log('Successfully deleted webhook: ' + webhook)
                } catch (e) {
                    console.log('Failed to delete webhook: ' + webhook)
                }
            }
        })();
        break;
    case 'delete-webhooks-one-by-one':
        (async () => {
            for (let i = 0; i < parseIntegers(config.webhooks.length); i++) {
                const webhook = config.webhooks[i];
                try {
                    const response = await axios.delete(webhook)
                    console.log('Successfully deleted webhook: ' + webhook)
                    await new Promise((resolve) => {
                        setTimeout(resolve, config.frequency);
                    })
                } catch (e) {
                    if (e.response.data.message === 'Unknown Webhook') {
                        console.log('Invalid webhook: ' + webhook)
                    } else {
                        console.log('Failed to delete webhook: ' + webhook)
                    }
                }
            }
        })();
        break;
    case 'delete-webhooks-simultaneously':
        (async () => {
            for (let i = 0; i < 1; i++) {
                await Promise.all(config.webhooks.map(deleteWebhook));
                await new Promise((resolve) => {
                    setTimeout(resolve, config.frequency);
                });
            }
        })();
        break;
    default:
        console.log('Invalid option please check your config.json file')
        break;
}