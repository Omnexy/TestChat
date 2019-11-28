import React from 'react'

function Userlist(props) {

    const userListElements = props.users.map((element,index) =>
        <li key={index}>
            {element.username}
        </li>
    );

    return (
        <div className={"userlistdiv"}>
            Users:<br/>
            <ul className={"userlist"}>
                {userListElements}
            </ul>
        </div>
    )
}

export default Userlist;