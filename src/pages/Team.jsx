import React from 'react';
import "../styles/Team.css"

const Team = () =>{
    return (
        <>
            {/* 이미지 영역 */}
            <div className='team-member-img'>
                <img src="../src/assets/images/my_profile.png" alt="rsy img" />
            </div>

            <div className='team-recruit'>
                <h2>Team Recruitment</h2>
                <p style={{ textAlign: 'left' }}>We are looking for talented team members to help develop a better Healing Space service.</p>
                <p style={{ textAlign: 'left' }}>If you're interested in working with us, please feel free to contact us.</p>
                <p style={{ textAlign: 'left' }}>We would appreciate it.</p>
            </div>

            <br />
            <p style={{ textAlign: "left" }}>Apply form will be continue...</p> 

        </>
    )

}

export default Team;