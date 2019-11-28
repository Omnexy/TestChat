import React, {Component} from "react";
import Chatlist from "./Chatlist";
import {newMsg, gotDisconnect, newUser, parseUrlQuery} from "../api";
import { animateScroll } from "react-scroll";
import Userlist from './Userlist';
import Inputer from "./Inputer";

class Chat extends Component{

    state = {username: this.props.state.username, roomid: this.props.state.roomid, message: "", chatlog: this.props.state.chatlog, users: this.props.state.users};

    scrollToBottom = () => {
        animateScroll.scrollToBottom({containerId: "chathistory"});
    };  //прокрутка лога чата вниз

    soundMsg = () => {
        let audio = new Audio();
        audio.src = 'sound.mp3';
        audio.autoplay = true;
    };  //Воспроизведение звука при получении сообщения

    newMessage = () => {
        newMsg((data) => {
            this.soundMsg();
            let newchatlog = this.state.chatlog;
            newchatlog.push(data);
            this.setState({chatlog: newchatlog}, this.scrollToBottom);
        });
    };  //обработка нового сообщения

    gotDisconnect = () => {
        gotDisconnect((data) => {
            this.setState({users:data});
        });
    };  //обработка отключения пользователей

    newUser = () => {
        newUser((data) => {
            let newusers = this.state.users;
            newusers.push(data);
            this.setState({users: newusers});
            console.log(this.state.users);
        });
    };  //обработка нового пользователя

    linkToBuffer = () => {
        let link= document.getElementById("link");
        link.select();
        document.execCommand('copy');
    }; //копирование ссылки на комнату в буфер обмена

    componentDidMount() {
        this.newMessage();
        this.gotDisconnect();
        this.newUser();
        let roomid = parseUrlQuery().roomid;
        if(roomid) {
            this.setState({roomid: roomid}, () =>{console.log(this.state.roomid)});
        }
    }  //чтение ID комнаты из адресной строки, подключение слушателей событий

    render() {
        return (
            <div className={"room"}>
                <div className={"content"}>Welcome to room {this.state.roomid}, {this.state.username}!<br/><div id={"linkholder"} onClick={this.linkToBuffer}>Copy room link</div> <input id={"link"} readOnly={true} value={"http://"+window.location.host+"?roomid="+this.state.roomid}/><br/>
                    <Chatlist chatlog = {this.state.chatlog}/>
                    <Userlist users = {this.state.users}/>
                </div>
                <Inputer state={{username: this.state.username, roomid: this.state.roomid}}/>
            </div>
        );
    }
}

export default Chat