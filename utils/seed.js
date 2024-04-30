const connection = require('../config/connection');
const { Thought, User} = require('../models');

const { user, thought } = require('./data');

connection.once('open', async () => {
    console.log('connected!');
    const userData = await User.create(user);
    const thoughtData = await Thought.create(thought);
    console.log(userData, thoughtData);
    process.exit(0);
})