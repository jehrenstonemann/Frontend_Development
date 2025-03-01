import createChatDelegator from "./ChatDelegator";
import { ofRandom, isLoggedIn, getLoggedInUsername } from "./Util";

const createChatAgent = () => {
    const CS571_WITAI_ACCESS_TOKEN = "QORKWSNPG63I3A6IN6HEZMOJOKBGARMJ"; // Put your CLIENT access token here.

    const delegator = createChatDelegator();

    let chatrooms = [];

    const handleInitialize = async () => {
        const resp = await fetch("https://cs571.org/api/s24/hw11/chatrooms", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        });
        const data = await resp.json();
        chatrooms = data;

        return "Welcome to BadgerChat! My name is Bucki, how can I help you?";
    }

    const handleReceive = async (prompt) => {
        if (delegator.hasDelegate()) { return delegator.handleDelegation(prompt); }
        const resp = await fetch(`https://api.wit.ai/message?q=${encodeURIComponent(prompt)}`, {
            headers: {
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            }
        })
        const data = await resp.json();
        if (data.intents.length > 0) {
            switch (data.intents[0].name) {
                case "get_help": return handleGetHelp();
                case "get_chatrooms": return handleGetChatrooms();
                case "get_messages": return handleGetMessages(data);
                case "login": return handleLogin();
                case "register": return handleRegister();
                case "create_message": return handleCreateMessage(data);
                case "logout": return handleLogout();
                case "whoami": return handleWhoAmI();
            }
        }
        return "Sorry, I didn't get that. Type 'help' to see what you can do!";
    }

    const handleGetHelp = async () => {
        return ofRandom([
            "Try asking 'give me a list of chatrooms', or ask for more help!",
            "Try asking 'register for an account', or ask for more help!",
            "Try asking 'tell me the latest 3 messages', or ask for more help!"
        ]);
    }

    const handleGetChatrooms = async () => {
        return "Of course, there are " + chatrooms.length + " chatrooms: " + 
        chatrooms.reduce((prev, curr) => prev + ", " + curr, "").substring(2)
    }

    const handleGetMessages = async (data) => {
        const hasSpecifiedNumber = data.entities["wit$number:number"] ? true : false;
        const numComments = hasSpecifiedNumber ? data.entities["wit$number:number"][0].value : "";
        const hasSpecifiedChatrooms = data.entities["chatrooms:chatrooms"] ? true : false;
        const chatrooms = hasSpecifiedChatrooms ? data.entities["chatrooms:chatrooms"][0].value : "";
        const res = await fetch(`https://cs571.org/api/s24/hw11/messages?chatroom=${chatrooms}&num=${numComments}`, {
            headers : {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        const d = await res.json();
        const messages = d.messages;
        return messages.map(m => `In ${m.chatroom}, ${m.poster} created a post titled '${m.title}' saying '${m.content}'`);
    }

    const handleLogin = async () => {
        return await delegator.beginDelegation("LOGIN");
    }

    const handleRegister = async () => {
        return await delegator.beginDelegation("REGISTER");
    }

    const handleCreateMessage = async (data) => {
        return await delegator.beginDelegation("CREATE", data);
    }

    const handleLogout = async () => {
        if (await isLoggedIn()){
            const resp = await fetch("https://cs571.org/api/s24/hw11/logout", {
                method : "POST",
                credentials : "include",
                headers : {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                }
            })
            if (resp.status === 200){
                return ofRandom(["You have been signed out.","You have been logged out."])
            } else {
                return "Unexpected Error during logging out."
            }
        } else {
            return "You are not logged in."
        }
    }

    const handleWhoAmI = async () => {
        if (await isLoggedIn()){
            const username = await getLoggedInUsername()
            return ofRandom([`You are currently logged in as ${username}`, `You are logged in as ${username}`])
        } else {
            return "You are not logged in."
        }
    }

    
    const handleTranscription = async (rawSound, contentType) => {
        const resp = await fetch(`https://api.wit.ai/dictation`, {
            method: "POST",
            headers: {
                "Content-Type": contentType,
                "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
            },
            body: rawSound
        })
        const data = await resp.text();
        const transcription = data
            .split(/\r?\n{/g)
            .map((t, i) => i === 0 ? t : `{${t}`)  // Turn the response text into nice JS objects
            .map(s => JSON.parse(s))
            .filter(chunk => chunk.is_final)       // Only keep the final transcriptions
            .map(chunk => chunk.text)
            .join(" ");                            // And conjoin them!
        return transcription;
    }

    const handleSynthesis = async (txt) => {
        if (txt.length > 280) {
            return undefined;
        } else {
            const resp = await fetch(`https://api.wit.ai/synthesize`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "audio/wav",
                    "Authorization": `Bearer ${CS571_WITAI_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    q: txt,
                    voice: "Rebecca",
                    style: "soft"
                })
            })
            const audioBlob = await resp.blob()
            return URL.createObjectURL(audioBlob);
        }
    }

    return {
        handleInitialize,
        handleReceive,
        handleTranscription,
        handleSynthesis
    }
}

export default createChatAgent;