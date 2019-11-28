import openSocket from 'socket.io-client'

const socket = openSocket(window.location.hostname+':3001');


function newMsg(cb) {
    socket.on('new_msg', data => cb(data));
}

function sendMsg(data) {
    socket.emit('new_msg', data);
}

function gotName(cb) {
    socket.on('got_name', data => cb(data));
}

function sendName(data) {
    socket.emit('got_name', data);
}

function gotDisconnect(cb) {
    socket.on('got_disconnect', data => cb(data));
}

function newUser(cb) {
    socket.on('new_user', data => cb(data));
}

function onServerDisconnect(cb) {
    socket.on('disconnect', () => cb());
}

function parseUrlQuery(){
    let data = {};
    if(window.location.search) {
        let pair = (window.location.search.substr(1)).split('&');
        for(let i = 0; i < pair.length; i ++) {
            let param = pair[i].split('=');
            data[param[0]] = param[1];
        }
    }
    return data;
};

export {newMsg,sendMsg,gotName,sendName, gotDisconnect, newUser, onServerDisconnect, parseUrlQuery};
