const {app, BrowserWindow} = require("electron");


let mainWindow;

const createWindow = () => { 
    // Main Window -> Browser + Node JS
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });


    mainWindow.loadURL(`file://${__dirname}/main.html`)
    // mainWindow.loadFile("main.html");
};


app.on("ready", () => {
    createWindow();
})