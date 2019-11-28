const io = require('socket.io')();
const datef = require('datef');
const ip = require('ip');
const roomHolder = require('./Room');

const PORT = 3001;

console.log("Server started on: "+ip.address()+":"+PORT);
io.listen(PORT);
io.on('connection', (socket) => {
    socket.on('got_name', (data) => {
        socket.username = data.username;
        if(data.roomid) {
            socket.roomid = data.roomid;
            let room = roomHolder.getRoomById(data.roomid);
            if(room === null) {
                roomHolder.addRoom({user:socket, roomid: data.roomid});
                room = roomHolder.getRoomById(data.roomid);
            }
            else {
                if(room.delTimer) {
                    clearTimeout(room.delTimer);
                }
                room.users.forEach(function (item) {
                    item.emit('new_user', {username: socket.username, roomid: socket.roomid});
                });
                room.addUser(socket);
            }

            let userlist = [];
            room.users.forEach(function (item) {
                userlist.push({username: item.username, roomid: item.roomid});
            });

            let dat = {username: data.username, roomid: room.roomid, chatlog: room.chatlog, users: userlist};
            socket.emit('got_name', dat);
        }
        else {
            let rid = new Date().getTime().toString();
            socket.roomid = rid;
            roomHolder.addRoom({user:socket, roomid: rid});
            let dat = {username: data.username, roomid: rid, chatlog: [], users: [{username: data.username, roomid: rid}]};
            socket.emit('got_name', dat);
        }
        console.log("User "+socket.username+" connected to room "+socket.roomid);
    }); //устанавливаю имя, если определена комната, то присоединяю/создаю нужную, иначе просто создаю новую
    socket.on('new_msg', (data) => {
        let msg = {username: data.username, msg: data.msg, time: datef("HH:mm")};
        let room = roomHolder.getRoomById(socket.roomid);
        room.addMessage(msg);
        room.users.forEach(function (item) {
            item.emit('new_msg', msg);
        });
        console.log(data.username + " ---> " + data.roomid + " : " + data.msg + " time: " + datef("HH:mm"));
    }); //подписываю сокет на новые сообщения, добавляю их в логи своих комнат
    socket.on('disconnect', function() {
        //console.log('Got disconnect!');
        let room = roomHolder.getRoomById(socket.roomid);
        if(room) {
            let i = room.users.indexOf(socket);
            if(i >= 0) {
                room.users.splice(i, 1);
                console.log("User "+socket.username+" disconnected from room "+socket.roomid);
                if(room.users.length === 0) {
                    roomHolder.delTimer = setTimeout(roomHolder.delRoom, 300000, room);
                }
                else {
                    let newusers = [];
                    room.users.forEach(function (item) {
                        newusers.push({username: item.username, roomid:item.roomid});
                    });
                    room.users.forEach(function (item) {
                        item.emit('got_disconnect', newusers);
                    });
                }
            }
        }
    }); //подписываю сокет на дисконнект, убираю сокет из списка в комнате, оповещаю остальные сокеты комнаты, ставлю комнату в очередь на удаление, если последний пользователь
});
