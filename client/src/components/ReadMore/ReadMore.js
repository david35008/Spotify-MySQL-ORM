import React, { useState } from 'react';

function ReadMore({ content, maxChar, color }) {
    const [isSliced, setIsSliced] = useState(content.length <= maxChar ? false : true);

    const text = isSliced ? content.slice(0, maxChar) : content;

    return (
        <>
            {isSliced
                ? (
                    <div>
                        <p style={color&&{color: "black"}} >
                            Lyrics: {('  ')}   {text}
                            <span>...</span>  <button className="moreLess" onClick={() => setIsSliced(!isSliced)}>See more...</button>
                        </p>

                    </div>
                )
                : (
                    <div>
                        <p style={color&&{color: "black"}} className='readMore' >
                            Lyrics: {('  ')} {text}
                            {!(content.length <= maxChar)
                                && (
                                    <button className="moreLess" onClick={() => setIsSliced(!isSliced)}>See less...</button>
                                )}
                        </p>
                    </div>
                )}
        </>
    );
}

export default ReadMore;
