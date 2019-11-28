class Room {
    constructor(props) {
        this.users = [];
        this.users.push(props.user);
        this.roomid = props.roomid;
        this.chatlog = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    addMessage(message) {
        this.chatlog.push(message);
    }
}

let rooms = [];

function addRoom(room) {
    rooms.push(new Room({user: room.user, roomid: room.roomid}));
    console.log("Room created: "+room.roomid+"  Creater: "+room.user.username);
    return rooms[rooms.length];
}  //создание новой комнаты

function delRoom(room) {
    if(room.users.length === 0) {
        let i = rooms.indexOf(room);
        rooms.splice(i,1);
        console.log("Room deleted: "+room.roomid);
    }
    else {
        console.log("There are users in the room");
    }
}  //удаление пустой комнаты

function getRoomById(id) {
    for (let i = 0; i < rooms.length; i++) {
        if(rooms[i].roomid === id) {
            return rooms[i];
        }
    }
    return null;
}  //получение объекта комнаты по идентификатору

module.exports.addRoom = addRoom;
module.exports.delRoom = delRoom;
module.exports.getRoomById = getRoomById;
