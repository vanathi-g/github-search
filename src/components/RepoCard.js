import React from 'react';
import { FaClipboard } from "react-icons/fa";

const cutString = (str, width) => {
    let l = (width >= 1280) ? 100 : 75
    if (!str)
        str = "-No description provided-"
    else if (str.length > l)
        str = str.substring(0, l) + "...";
    return str;
}

const copyToClipboard = (text) => {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        return document.execCommand("copy");
    }
    catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
    }
    finally {
        document.body.removeChild(textarea);
    }
}

function RepoCard({details}){
    let desc = cutString(details.description);
    return(
        <div className='py-4 px-6 min-h-36 w-full rounded shadow-lg bg-white xl:min-h-32 xl:w-5/6'>
            <a target="_blank" rel="noopener noreferrer" href={details.html_url} className='text-xl font-bold'>{details.name}</a>
            <hr className='m-1 ml-0 w-5/6 border-2 border-black'/>
            <p className='text-wrap text-justify'>{desc}</p>
            <div className='mt-1 flex items-center invisible xl:visible'>
                <FaClipboard className='inline mr-1 cursor-pointer text-sm text-gray-600' 
                    onClick={() => {copyToClipboard(details.clone_url)}}/>
                <p className='inline text-gray-600 text-sm'>{details.clone_url}</p>
            </div>
        </div>
    );
}

export default RepoCard;