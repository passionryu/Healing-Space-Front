import React from 'react';
import "../styles/Team.css"

const Team = () =>{
    return (

        <div className='team-container'> 

            {/* 왼쪽 이미지 영역 */}
            <div className='team-member-img'>
                <img src="../src/assets/images/rsy.jpg" alt="rsy img" />
            </div>

            {/* 오른쪽 설명 영역 */}
            <div className='team-member-text'>
                <h1>Team Member</h1>
                <h3>Name : SeongYeol.Ryu</h3>
                <h3>Position : Software Engineer</h3>
                <h3>How to reach me : rsy1225@naver.com</h3>
            </div>

        </div>
    )

}

export default Team;