# Discord Webhook Tool
This project is a simple script that sends a Discord message to multiple webhooks ,delete webhooks using Axios. The message contains a title, description, author, and an image thumbnail.

### Usage
1. Install the required dependencies using `npm install`.
2. Replace the webhooks array (config file) with your own Discord webhook URLs.
3. Run the script using `node index.js`.

**Note**: The script will send the message to each webhook (config file) times with a delay of (config file) second between each send or delete webhooks. This is done using a for loop and a setTimeout function. The script uses asynchronous functions and Promise.all to send messages to all the webhooks simultaneously.

### Config file
```
{
    "method": "simultaneously", //remove this comment methods: ["simultaneously","one-by-one-and-delete","delete-webhooks-one-by-one","delete-webhooks-simultaneously"]
    "interval": "5",
    "frequency": "1000",
    "webhooks": [
        "YOUR_WEBHOOK_URL",
        "YOUR_WEBHOOK_URL",
        "YOUR_WEBHOOK_URL"
    ],
    "embeds": {
        "title": "Test",
        "description": "DESCRIPTION",
        "author": {
            "name": "AUTHOR_NAME",
            "avatar_url": "https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg"
        },
        "thumbnail": "https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg"
    }
}
```


### Support
For support and questions, please join our Discord support server: https://discord.gg/T6WQY9APG2

### Contributing
If you have any suggestions or improvements, feel free to create a pull request.

### Dockerfile
This project also includes a Dockerfile that can be used to create a Docker image of the project. The Dockerfile specifies the base image to be used, sets the working directory, copies the package.json and installs dependencies, copies the rest of the files, and runs the script with node index.js

**To build the Docker image, run the following command in the project directory:**

`docker build -t discord-webhook-tool:latest`

**Once the image has been built, you can run a container using the following command:**

`docker run -d --rm --name webhook-tool  discord-webhook-tool:latest`

### Disclaimer
<span style="color:red;font-size:20px;font-weight:540;">This project is intended for educational purposes only. Please use it at your own risk and responsibility.</span>