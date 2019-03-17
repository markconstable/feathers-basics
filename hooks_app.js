//Hook that adds a createdAt property to data before calling create service method
app.service('messages').hooks({
    before: {
        create (context) {
            context.data.createdAt = new Date();

            return context;
        }
    }
})

//Common pattern to make hooks more reusable

const setTimeStamp = name => {
    return async context => {
        context.data[name] = new Date();

        return context;
    }
}

app.service('messages').hooks({
    before: {
        create: setTimeStamp('created')
    }
})

// Example of registering a hook

const messageHooks = {
    before: {
// Hooks in 'all' will run before all other hooks
        all: {},
        find: {},
        get:  {},
        create: setTimeStamp('created'),
        update: {},
        patch: {},
        remove: {},
    },
    after: {
        all: {},
        find: {},
        get:  {},
        create: {},
        update: {},
        patch: {},
        remove: {},
    }
}

// Calling method for messageHooks
app.service('messsages').hooks(messageHooks);

// VALIDATING DATA EXAMPLE