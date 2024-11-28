
let focusStart = null;
let focusDuration = 0;
let isFocused = false;

document.getElementById("command").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const input = event.target.value.trim();
        handleCommand(input);
        event.target.value = ""; // Clear input field
    }
});

function handleCommand(command) {
    const outputDiv = document.getElementById("output");
    let response = "";

    switch (command.toLowerCase()) {
        case "help":
            response = "Available commands: start, pause, reset, status, fullscreen, exit";
            break;

        case "start":
            if (!isFocused) {
                focusStart = Date.now();
                isFocused = true;
                response = "Focus timer started.";
            } else {
                response = "Focus timer is already running.";
            }
            break;

        case "pause":
            if (isFocused) {
                focusDuration += Math.floor((Date.now() - focusStart) / 1000); // Update focus time
                isFocused = false;
                focusStart = null;
                response = "Focus timer paused.";
            } else {
                response = "Focus timer is not running.";
            }
            break;

        case "reset":
            focusStart = null;
            focusDuration = 0;
            isFocused = false;
            response = "Focus timer reset.";
            break;

        case "status":
            let totalFocusTime = focusDuration;
            if (isFocused && focusStart) {
                totalFocusTime += Math.floor((Date.now() - focusStart) / 1000);
            }
            response = `Total focus time: ${totalFocusTime} seconds.`;
            break;

        case "fullscreen":
            toggleFullScreen();
            response = "Fullscreen mode toggled.";
            break;

        case "exit":
            response = "Exiting fullscreen mode.";
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            break;

        default:
            response = `Unknown command: ${command}. Type \`help\` for a list of commands.`;
    }

    addOutput(response);
}

function addOutput(text) {
    const outputDiv = document.getElementById("output");
    const newLine = document.createElement("div");
    newLine.textContent = `$ ${text}`;
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}
