import { isLoggedIn, ofRandom } from "../Util"

const createLoginSubAgent = (end) => {

    let stage;
    let username, password;

    const handleInitialize = async (promptData) => {
        if (await isLoggedIn()){
            return end("You are currently logged in, please log out before logging in again!");
        } else {
            stage = "FOLLOWUP_USERNAME";
            return ofRandom(["Got it! What is your username?","Great! What is your username?"]);
        }
    }

    const handleReceive = async (prompt) => {
        switch(stage) {
            case "FOLLOWUP_USERNAME": return await handleFollowupUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handleFollowupPassword(prompt);
        }
    }

    const handleFollowupUsername = async (prompt) => {
        username = prompt;
        stage = "FOLLOWUP_PASSWORD";
        return ofRandom([{
            msg : "Great! What is your password?",
            nextIsSensitive: true
        },
        {
            msg : "Got it! What is your password?",
            nextIsSensitive: true
        }
        ]);
    }

    const handleFollowupPassword = async (prompt) => {
        password = prompt;
        stage = undefined;
            
        const resp = await fetch("https://cs571.org/api/s24/hw11/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (resp.status === 200) {
            return end({
                msg: `Logged in! Welcome ${username}.`,
                emote: "SUCCESS"
            })
        } else {
            return end({
                msg:"Sorry, your username or password is incorrect.",
                emote : "error"
            })
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createLoginSubAgent;