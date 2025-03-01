import { isLoggedIn, ofRandom } from "../Util"

const createRegisterSubAgent = (end) => {

    let stage;
    let username, password, passwordAgain;

    const handleInitialize = async (promptData) => {
        if (await isLoggedIn()){
            return end("Please log out before registering");
        } else {
            stage = "FOLLOWUP_USERNAME";
            return ofRandom(["Great! What username would you like to use?","Got it! What username would you like to use?"]);
        }
    }

    const handleReceive = async (prompt) => {
        switch(stage) {
            case "FOLLOWUP_USERNAME": return await handleFollowupUsername(prompt);
            case "FOLLOWUP_PASSWORD": return await handleFollowupPassword(prompt);
            case "FOLLOWUP_PASSWORD_AGAIN" : return await handleFollowupPasswordAgain(prompt);
        }
    }

    const handleFollowupUsername = async (prompt) => {
        username = prompt;
        stage = "FOLLOWUP_PASSWORD";
        return {
            msg : "Thanks, what password would you like to use?",
            nextIsSensitive: true
        };
    }

    const handleFollowupPassword = async (prompt) => {
        password = prompt;
        stage = "FOLLOWUP_PASSWORD_AGAIN";
        return ofRandom([{
            msg: "Lastly, please confirm your password.",
            nextIsSensitive: true
        },
        {
            msg: "Finally, please confirm your password.",
            nextIsSensitive: true
        }]);
    }

    const handleFollowupPasswordAgain = async (prompt) => {
        passwordAgain = prompt;
        stage = undefined;

        if (password !== passwordAgain){
            return end("Password does not match")
        } else {
            // TODO "https://cs571.org/api/s24/hw11/register"
            const resp = await fetch("https://cs571.org/api/s24/hw11/register", {
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
            if(resp.status === 200){
                return end({
                    msg : `Success! Your account has been registered. Welcome ${username}.`,
                    emote: "SUCCESS"
                });
            } else {
                return end({
                    msg : "Sorry, that username already exists. Please try registering again.",
                    emote : "error"
                });
            }
        }
    }

    return {
        handleInitialize,
        handleReceive
    }
}

export default createRegisterSubAgent;