import React, {Component} from 'react'
import "../styles.css"
import Chat from "./Chat"
import Setname from "./Setname"
import {gotName, onServerDisconnect} from "../api";

class App extends Component{

    state = {isSet: false, username: '', roomid: '', chatlog: [], users: []};

    onDisconnect = () => {
        onServerDisconnect(() => {
            window.location.reload();
            alert("Server disconnected!");
        });
    };  //обработка отключения пользователей

    setName = () => {
        gotName((data) => {
            this.setState({isSet: true, username: data.username, roomid: data.roomid, chatlog: data.chatlog, users: data.users});
        });
    };

    componentDidMount() {
        this.setName();
        this.onDisconnect();
    }

    render() {
        return this.state.isSet ? <Chat state = {this.state}/> : <Setname/>
    }
}

export default App;