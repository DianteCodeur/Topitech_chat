const Message = require('../client/src/components/Messages/Message/Message')
const users = [];
const addUser = ({id, pseudo, password, channel }) => {
    pseudo = pseudo.trim().toLowerCase();
    password = password.trim().toLowerCase();
    channel = channel.trim().toLowerCase();

    const existingUser = users.find((user) => user.channel === channel && user.password === password && user.pseudo === pseudo);

  if(!pseudo || !password || !channel) return { error: 'Username, password and channel are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, pseudo, password, channel };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.pseudo === id);

const getUsersInChannel = (channel) => users.filter((user) => user.channel === channel);

const listChannels = channels.user((channel) =>
<li key={channel.id}>{channel}</li>
);

const getMessagesInChannel = (channel) => users.filter((Message) => Message.channel === channel);

module.exports = { addUser, removeUser, getUser, getUsersInChannel, listChannels, getMessagesInChannel}