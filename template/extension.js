//We dont need to wrap it in a function cause the builder does that for us
// Boilerplate from https://docs.penguinmod.com

class Extension {
    getInfo() {
        return {
            id: "johnMyExtension",
            name: "My Extension",
            blocks: [
                {
                    opcode: 'logToConsole',
                    text: 'log to console',
                    blockType: Scratch.BlockType.COMMAND
                }
            ]
        };
    }

    logToConsole() {
        console.log('Hello world!');
    }
}

Scratch.extensions.register(new Extension());