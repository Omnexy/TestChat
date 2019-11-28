import React, {Component} from 'react';
import {sendMsg} from '../api';

class Inputer extends Component{

    state = {username: this.props.state.username, roomid: this.props.state.roomid, msg: ''};

    keyListener = (e) => {
        if(e.keyCode === 13) {
            if(!e.shiftKey) {
                while (this.state.msg.lastIndexOf("\n") === this.state.msg.length-1) {
                    this.setState({msg: this.state.msg.substr(0,this.state.msg.length-1)});
                }
                this.state.msg !== '' && sendMsg({username: this.state.username, roomid: this.state.roomid, msg:this.state.msg});
                this.setState({msg: ''});
            }
        }
    };  //обработка нажатия клавиши Enter

    sendMsg = () => {
        this.state.msg && sendMsg({username: this.state.username, roomid: this.state.roomid, msg:this.state.msg});
        this.setState({msg: ''});
    };  //отправка сообщения

    handleChange = (event) => {
        this.setState({msg: event.target.value});
    }; //обработка введённого текста

    componentDidMount() {
        document.addEventListener('keyup', this.keyListener);
    }

    render() {
        return (
            <div className={"inputer"}>
                <textarea id={"msgText"} autoFocus={true} value={this.state.msg} onChange={this.handleChange} placeholder={"WriteSOMETEXT!!!"} />
                <button id={"sendBtn"} onClick={this.sendMsg}>SEND MESSAGE</button>
            </div>
        )
    }
}

export default Inputer;