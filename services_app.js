// ***Todo service*** 
const feathers = require('@feathersjs/feathers');
const app = feathers();
// Register a simple todo service that returns the name and some text
app.use('todos', {
    async get(name) {
// Return an object in the form of {name, text}
        return {
            name,
            text: `You have to do ${name}`
        };
    }
});
// A function that gets and logs a todo from the service
async function getTodo(name) {
// Get the service we registered above
    const service = app.service('todos');
// Call the 'get' method with a name
    const todo = await service.get(name);ƒ
// Log the todo that we got back
    console.log(todo);
}

getTodo('dishes');

// ***MESSAGES SERVICE***
const feathers = require('@feathersjs/feather');

class Messages {
    constructor() {
        this.messages = [];
        this.currentId = 0;
    }

    async find(params) {
// Return a list of all messages
        return this.messages;
    }

    async get(id, params) {
// Find message by id
        const message = this.messages.find(message => message.id === parseInt(id, 10));
// Throw an error if message not found
        if (!message) {
            throw new Error('Message with id ${id} not found');
        }
// Otherwise return the message
        return message;
    }

    async create(data, params) {
// Create a new object with the original data and an id
// taken from the incrementing 'currentId' counter
        const message = Object.assign({
            id: ++this.currentId
        }, data);

        this.messages.push(message);

        return message;
    }

    async remove(id, params) {
// Get the message by id (will throw an error if not found)
        const message = await this.get(id);
// Find the index of the message in our message array
        const index = this.messages.indexOf(message);
// Remove the found message from array
        this.messages.splice(index, 1);
// Return the removed message
        return message;
    }
}

const app = feathers();
// Initialize the messages service by creating a new instance of our class
app.use('messages', new Messages());

//***REGISTER MESSAGES SERVICES*** 
async function processMessages() {
// Event emitter of service using 'on' method
    app.service('messages').on('created', message => {
        consople.log('Created a new message', message);
    });

    app.service('messages').on('removed', message => {
        console.log('Deleted message', message);
    })

// Retrive service with app.service(serviceName).serviceMethod
    await app.service('messages').create({
        text: 'First Message'
    });

    await app.service('messages').create({
        text: 'Second message'
    });
// Remove the messsage just created
    await app.service('messages').remove(lastMessage.id);

    const messageList = await app.service('messages').find();

    console.log('Available messages', messageList);
}

processMessages();