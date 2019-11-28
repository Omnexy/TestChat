import React, {Component} from 'react';
import {sendName, parseUrlQuery} from '../api';

class Setname extends Component {

    state = {username: ''};

    handleChange = (event) => {
        this.setState({username: event.target.value});
    };  //отслеживание текста, введённого в поле input

    send = () => {
        this.state.username && sendName( {username: this.state.username, roomid: parseUrlQuery().roomid});
    };  //отправка введённого имени на сервер

    render() {
        return (
            <div className={"room"}>
                <div className={"nameform"}>
                    <div className={"justtext"}>Chat</div>
                    <input id={"nameinput"} onChange={this.handleChange} placeholder={"Enter name"} autoFocus={true}/>
                    <button id={"sendnamebtn"} onClick={this.send}>Send</button><br/>
                    <div className={"justtext"}>Test task by Vlasenko Vasiliy</div>
                </div>
            </div>
        );
    }
}

export default Setname;