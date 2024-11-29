// Initialize task list
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const bonsai ="                                        
             &  &                       
            &&&&&   &                   
              \|  &&&&& &&&&&           
              \&  &&&/&&&&&& &          
           & &|// & &~&&&&&&            
            &|\&& &&\&&&&&|&&&          
           &&~~&   &&& |&&~~~           
    & && && /  \\~|&\\~&~~ /            
     \ |  /      ~/~|~~ &~              
       ~~~ |     | /~/ |                
           \    |~\~ / \                
             ~~~~ ~/|   ~~              
                \|~|/   /               
                 ||/   |                
                 \~\   ~|               
                   \ ~| /               
                    \/~~                
                    ~\~                 
                    |~ ~/               
                    |/ ~                
                   \\                   
                   |/ ~                 
                   /                    
                 ~                      
                   ~/                   
                   ~                    
                                        
                                        "


// Select elements
const taskList = document.getElementById("task-list");
const commandLine = document.getElementById("command-line");
const outputDiv = document.getElementById("output");

// Render tasks on page load
renderTaskList();

// Event listener for Enter key
commandLine.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent adding new lines
        const input = commandLine.textContent.trim();
        processCommand(input);
        commandLine.textContent = ""; // Clear the input
        highlightSyntax(); // Reset syntax highlighting
    }
});

// Event listener for real-time syntax highlighting
commandLine.addEventListener("input", highlightSyntax);

// Process commands
function processCommand(input) {
    const args = input.split(" ");
    const command = args[0].toLowerCase();
    const argument = args.slice(1).join(" ");
    let response = "";

    switch (command) {
        case "help":
            response = `Commands:
- add [task]: Add a new task.
- done [index]: Mark a task as completed.
- remove [index]: Remove a task.
- clear: Clear the terminal output.
- idle: Enter the idle page.`;
            break;

        case "add":
            if (argument) {
                tasks.push({ text: argument, completed: false });
                saveTasks();
                renderTaskList();
                response = `Task added: "${argument}"`;
            } else {
                response = "Usage: add [task]";
            }
            break;

        // case "list":
        //     renderTaskList();
        //     response = "Task list refreshed.";
        //     break;

        case "done":
            const doneIndex = parseInt(argument) - 1;
            if (!isNaN(doneIndex) && tasks[doneIndex]) {
                tasks[doneIndex].completed = true;
                saveTasks();
                renderTaskList();
                response = `Task marked as completed: "${tasks[doneIndex].text}"`;
            } else {
                response = "Usage: done [index]";
            }
            break;

        case "remove":
            const removeIndex = parseInt(argument) - 1;
            if (!isNaN(removeIndex) && tasks[removeIndex]) {
                const removedTask = tasks.splice(removeIndex, 1)[0];
                saveTasks();
                renderTaskList();
                response = `Task removed: "${removedTask.text}"`;
            } else {
                response = "Usage: remove [index]";
            }
            break;

        case "idle":
            response = bonsai;
            break;

        case "clear":
            outputDiv.innerHTML = "";
            response = "Terminal cleared.";
            break;

        default:
            response = `Unknown command: ${command}. Type \`help\` for a list of commands.`;
    }

    addOutput(response);
}

// Render task list
function renderTaskList() {
    taskList.innerHTML = ""; // Clear current list
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.textContent = `${index + 1}. ${task.text}`;
        taskList.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add output to terminal
function addOutput(text) {
    const line = document.createElement("div");
    line.textContent = `$ ${text}`;
    outputDiv.appendChild(line);
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll to bottom
}





