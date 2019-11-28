import React from 'react'

function Chatlist(props) {
    const listElements = props.chatlog.map((element,index) =>
        <li key={index}>
            <div className={"msgholder"}>
                <div className={"namediv"}>{element.username}</div>
                <div className={"msgdiv"}>{element.msg}</div>
                <div className={"timediv"}>{element.time}</div>
            </div>
        </li>
    );
    return (
        <div id={"chathistory"} className={"chathistory"}>
            <ul id={"chatlist"} className={"chatlist"}>
                {listElements}
            </ul>
        </div>
    )
}

export default Chatlist