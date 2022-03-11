const { app, BrowserWindow, Menu } = require("electron");

const isMac = process.platform === "darwin";

let mainWindow;

const createWindow = () => {
    // Main Window -> Browser + Node JS
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
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
    });

    addWindow.loadFile("add.html");
};

const menuTemplate = [
    {
        label: "File",
        submenu: [
            { label: "Add Todo", click: createAddWindow },
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

app.on("ready", () => {
    createWindow();

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});
