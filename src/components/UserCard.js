import React from 'react';

function UserCard({details, setSelected}){
    return (
    <div className='flex flex-col w-50 h-50 p-7 pb-4 rounded shadow-lg' style={{ backgroundColor: "white" }}>
        <img className='mb-4 cursor-pointer' width="140px" height="140px" alt="profile or display" onClick={() => setSelected(details.login)} src={details.avatar_url}></img>
        <hr className='border-r-0 border-l-0 border-t-0 border-dotted border-b-8 w-10 border-purple-400 m-auto mb-2'/>
        <a target="_blank" rel="noopener noreferrer" className='text-wrap font-bold w-36 overflow-hidden text-center' href={details.html_url}>{details.login}</a>
    </div>);
}

export default UserCard;