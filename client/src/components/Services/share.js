import React, { useState } from 'react';
import shareButton from '../../images/shareButton.png';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import {
    WhatsappShareButton, FacebookMessengerIcon, EmailShareButton, FacebookMessengerShareButton,
    WhatsappIcon, EmailIcon, FacebookShareButton,
    FacebookIcon,

} from "react-share"

export default function Share({ link, songName, artistName }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="share" >
            <OverlayTrigger
                trigger="click"
                key={'up'}
                overlay={
                    <Popover id={id}>
                        <Popover.Content>
                            <WhatsappShareButton
                                url={link}
                                title={`Check out ${songName} by ${artistName}:`}

                            >
                                <WhatsappIcon size={36} />
                            </WhatsappShareButton>
                            <FacebookMessengerShareButton style={{ outline: 0 }}
                                url={link}
                                title={`Check out ${songName} by ${artistName}:`}
                            >
                                <FacebookMessengerIcon size={36} />
                            </FacebookMessengerShareButton>
                            <EmailShareButton style={{ outline: 0 }}
                                url={link}
                                title={`Check out ${songName} by ${artistName}:`}
                            >
                                <EmailIcon size={36} />
                            </EmailShareButton>
                            <FacebookShareButton style={{ outline: 0 }}
                                url={link}
                                quote={`Check out ${songName} by ${artistName}:`}
                            >
                                <FacebookIcon size={36} />
                            </FacebookShareButton>
                        </Popover.Content>
                    </Popover>
                }
            >
                <img className='shareButton' src={shareButton} alt={''} aria-describedby={id} onClick={handleClick} />
            </OverlayTrigger>
        </div>
    );
}