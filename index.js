const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const isMac = process.platform === "darwin";

let mainWindow;

const createWindow = () => {
    // Main Window -> Browser + Node JS
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.on("close", () => {
        app.quit();
    })

    mainWindow.loadURL(`file://${__dirname}/main.html`);
    // mainWindow.loadFile("main.html");
};


let addWindow;
const createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 500,
        height: 300,
        title: "Add New Todo",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    addWindow.on("closed", () => {
        addWindow = null;
    })

    addWindow.loadFile("add.html");
};

const menuTemplate = [
    {
        label: "File",
        submenu: [
            { label: "Add Todo", click: createAddWindow },
            {
                label: "Clear Todos",
                click() {
                    mainWindow.webContents.send("todo:clear");
                },
            },
            {
                label: "Quit",
                click: () => app.quit(),
                accelerator: "CmdOrCtrl+Q",
                // accelerator : isMac ? "Command+Q" : "Ctrl+Q"
            },
        ],
    },
];

if (isMac) {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {

    menuTemplate.push({
        label: "Developer Tools",
        submenu: [
            { role: "reload", accelerator: "CmdOrCtrl+R" },
            {
                label: "Toggle DevTools",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
                accelerator: isMac ? "Command+Alt+I" : "Ctrl+Shift+I",
            }
        ],
    });
} 


ipcMain.on("todo:add", (event, todo) => {
    mainWindow.webContents.send("todo:add", todo);
    addWindow.close()
    // addWindow = null;
})

app.on("ready", () => {
    createWindow();

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});
