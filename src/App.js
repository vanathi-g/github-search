import { useEffect, useState } from 'react';
import { getUserReposURL, getSearchUsersURL } from './api';

import SearchBar from './components/SearchBar'
import RepoCard from './components/RepoCard';
import UserCard from './components/UserCard';

function Repositories({ userName }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        if (userName !== '') {
            const url = getUserReposURL(userName);
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setRepos(data);
                });
        }
    }, [userName]);

    if (userName === '')
        return (<div hidden={true}></div>);

    return (
        <div className='border-t-8 border-white my-8 p-8 lg:mx-10 lg:px-10 lg:py-0 lg:my-0 lg:h-full lg:border-l-8 lg:border-white lg:border-t-0'>
            <h1 className='text-2xl pb-2 mb-4 min-w-96 text-white font-extrabold border-b-4 border-white md:text-4xl'>{userName}'s Repositories</h1>
            <div className='grid grid-cols-1 overflow-hidden gap-4 place-items-center xl:place-items-start'>
                {repos.length > 0 && repos.map((repo) => <RepoCard details={repo} key={repo.id} width={window.innerWidth}/>)}
            </div>
        </div>
    );
}

function App() {
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [selected, setSelected] = useState('');

    // Update text in search input
    const updateText = (event) => {
        setText(event.target.value);
    }

    useEffect(() => {
        // 1. Get query
        // 2. Make API call
        // 3. Get response
        if (text === '')
            return
        let display_num = 9;
        if(window.innerWidth < 768)
            display_num = 5;
        if(window.innerWidth >= 768 && window.innerWidth < 1280)
            display_num = 8;
        const url = getSearchUsersURL(text);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!data.items) setUsers([])
                else setUsers(data.items.slice(0, display_num))
            });
    }, [text])

    return (
        <div className='min-h-screen bg-gradient-to-tr from-black via-purple-900 to-black'>
            <div className='p-8 md:flex md:justify-end md:items-center'>
                <header className='text-center mb-3 text-white font-bold font-sans text-xl md:mr-3 md:mb-0'>
                    Github User Search
                </header>
                <SearchBar text={text} updateText={updateText} setText={setText} setUsers={setUsers} setSelected={setSelected}/>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 place-items-center'>
                    {users.length > 0 && users.map((user) => <UserCard details={user} setSelected={setSelected} key={user.id}/>)}
                </div>
                <div>
                    <Repositories userName={selected} />
                </div>
            </div>
        </div>
    )
}

export default App;