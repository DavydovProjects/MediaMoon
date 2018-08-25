import React from 'react'

function Bans(props){
  return(
    <tbody>
      {props.bans.map((user, i) => {
        return(
          <tr>
            <th scope="row"><img className="ban-profile-img rounded" src={"https://api.mediamoon.net" + user.avatar} alt="product-user-avatar"/></th>
            <td><a href={'/profile/' + user.username} target="_blank">{user.nickname}</a></td>
            <td>{user.rating}</td>
            <td>{user.verified ? 'Yes' : 'No'}</td>
            <td>{user.ban_date}</td>
            <td><button className="btn btn-outline-danger btn-small container-fluid mt-1" onClick={() => props.UnBanUser(user.username)}>Unban</button></td>
          </tr>
        )
      })}
    </tbody>
  )
}


export default Bans
