import React from 'react'

function Rules(){
  document.title = 'Rules'
  return(
    <div className="container p-0">
      <div className="c-box mb-5 mt-5 text-center pb-3 pl-3 pr-3">
        <h3>MediaMoon Rules</h3>
        <div className="rules text-left">

          <h5>
            <ol>

              <li>
                <h5>Nickname</h5>
                <h6>
                  <ol>
                    <li>You can not insult anyone in your nickname.</li>
                  </ol>
                </h6>
              </li>

              <li>
                <h5>Status</h5>
                <h6>
                  <ol>
                    <li>You can not insult anyone in your status.</li>
                  </ol>
                </h6>
              </li>

              <li>
                <h5>Personal information</h5>
                <h6>
                  <ol>
                    <li>You can not insult anyone in your personal information.</li>
                  </ol>
                </h6>
              </li>

              <li>
                <h5>Avatar</h5>
                <h6>
                  <ol>
                    <li>You can not use pictures that insult anyone as an avatar.</li>
                    <li>You can not use pictures with extremist content as an avatar.</li>
                    <li>You can not use pictures with 18+ content as an avatar.</li>
                  </ol>
                </h6>
              </li>

              <li>
                <h5>Profile wallpaper</h5>
                <h6>
                  <ol>
                    <li>You can not use pictures that insult anyone as an profile wallpaper.</li>
                    <li>You can not use pictures with extremist content as an profile wallpaper.</li>
                    <li>You can not use pictures with 18+ content as an profile wallpaper.</li>
                  </ol>
                </h6>
              </li>

              <li>
                <h5>Products</h5>
                <h6>
                  <ol>
                    <li>You can not use fake account/website links for your products.</li>
                  </ol>
                </h6>
              </li>

            </ol>
          </h5>

        </div>
      </div>
    </div>
  )
}


export default Rules
