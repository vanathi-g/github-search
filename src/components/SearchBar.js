import React from 'react';

function SearchBar({text, updateText, setText, setUsers, setSelected}){
    const clearAll = () => {
        setText('');
        setUsers([]);
        setSelected('')
    }
    return(
        <div className='flex'>
            <input
                type="text"
                placeholder="Enter name"
                value={text}
                onChange={updateText}
                className='mb-3 mr-3 p-2 h-10 w-5/6 border rounded text-grey-darkest md:mb-0'
            />
            <button
                onClick={clearAll}
                className='h-10 py-2 px-3 bg-purple-900 hover:bg-purple-600 text-white text-lg rounded cursor-pointer font-bold'
            >Clear</button>
        </div>
    );
}

export default SearchBar;