import React from 'react'


function Likes(props){
  return(
    <tbody>
      {props.likes.map((like, i) => {
        return(
          <tr>
            <th scope="row"><img className="like-profile-img rounded" src={"https://api.mediamoon.net" + like.avatar} alt="product-user-avatar"/></th>
            <td><a href={'/profile/' + like.username} target="_blank">{like.nickname}</a></td>
            <td>{like.rating}</td>
            <td>{like.verified ? 'Yes' : 'No'}</td>
            <td><button className="btn btn-outline-danger btn-small container-fluid mt-1" onClick={() => props.UnlikeUser(like.username)}>Unlike</button></td>
          </tr>
        )
      })}
    </tbody>
  )
}


export default Likes
