const infoBox = document.querySelector('.info-box');
const messageInp = document.getElementById('message-to-bot');
const messageContainer = document.getElementById('chat-with-bot');
const sendBtn = document.getElementById('message-send-btn');
const randomNum = Math.floor(Math.random() * 999) 
const userId = `user${randomNum}`;

const data = {
    user_id:  userId,
    message: messageInp.value,
};

const sendMessage = async () => {
    if (messageInp.value.trim() === "") {
        alert('Enter your Message');
        return;
    } else {
        await axios.post('https://patienttriage.azurewebsites.net/chat', { user_id: userId , message: messageInp.value })
            .then((res) => {
                console.log(JSON.stringify(res.data.reply));

                // User Message
                const userMessage = document.createElement('div');
                userMessage.innerHTML = `${messageInp.value}`;
                userMessage.classList.add('user-message');
                messageContainer.append(userMessage);
                messageInp.value = "";

                // Bot Response
                const botMessage1 = document.createElement('div');
                botMessage1.innerHTML = `- <div class="chat-message bg-white bot mt-1">
                            <div class="bot-icon">
                                <img src="assets/chat-bot-icon.png" alt="">
                            </div>
                            <div class="message-content">
                              ${res.data.reply}
                            </div>
                        </div>`;
                messageContainer.append(botMessage1);
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }
};

sendBtn.addEventListener('click', sendMessage);

messageInp.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


async function fistMessage() {
    await axios.post('https://patienttriage.azurewebsites.net/chat', { user_id: userId, message: messageInp.value })
        .then((res) => {
            // Bot Response
            const botMessage1 = document.createElement('div');
            botMessage1.innerHTML = `- <div class="chat-message bg-white bot mt-1">
                            <div class="bot-icon">
                                <img src="assets/chat-bot-icon.png" alt="">
                            </div>
                            <div class="message-content">
                              ${res.data.reply}
                            </div>
                        </div>`;
            messageContainer.append(botMessage1);
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

fistMessage()