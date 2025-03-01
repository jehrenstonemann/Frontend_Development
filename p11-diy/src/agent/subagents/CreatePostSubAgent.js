import { isLoggedIn, ofRandom } from "../Util"

const createPostSubAgent = (end) => {

    const CS571_WITAI_ACCESS_TOKEN = "QORKWSNPG63I3A6IN6HEZMOJOKBGARMJ";
    let stage;
    let chatroom, title, comment;

    const handleInitialize = async (promptData) => {
        if (await isLoggedIn()){
            if(Object.keys(promptData.entities).length === 1){
                chatroom = promptData.entities["chatrooms:chatrooms"][0].value;
                stage = "FOLLOWUP_TITLE";
                return "Sounds good. What would you like your title to be?";
            } else {
                return end("Please specify a chatroom to make a post.");
            }
        } else {
            return end("Logged in before creating a post.");
        }
    }

    const handleReceive = async (prompt) => {
        switch(stage) {
            case "FOLLOWUP_TITLE": return await handleFollowupTitle(prompt);
            case "FOLLOWUP_COMMENT" : return await handleFollowupComment(prompt);
            case "FOLLOWUP_CONFIRM": return await handleFollowupConfirm(prompt);
        }
    }
    
    const handleFollowupTitle = async (prompt) => {
        title = prompt;
        stage = 'FOLLOWUP_COMMENT';
        return ofRandom([
            "Alright, and what should be the content of your post?",
            "Good choice. What would you like your message to say?"
        ]);
    }

    const handleFollowupComment = async (prompt) => {
        comment = prompt;
        stage = "FOLLOWUP_CONFIRM";
        return ofRandom([
            `All ready! To confirm, you want to create this post titled '${title}' in ${chatroom}?`,
            `Excellent! To confirm, you want to create this post titled '${title}' in ${chatroom}?`
        ]);
    }

    const handleFollowupConfirm = async (prompt) => {
        confirm = prompt;
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0 && data.intents[0].name === 'wit$confirmation') {
            await fetch(`https://cs571.org/api/s24/hw11/messages?chatroom=${chatroom}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title : title,
                    content : comment
                })
            })
            return end({
                msg:`All set! Your post has been made in ${chatroom}`,
                emote: "SUCCESS"
            });
        } else {
            return end("No problem, if you change your mind just ask me to create a post again!");
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createPostSubAgent;