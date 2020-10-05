import Cookies from 'js-cookie';
import { create } from '../Network/Ajax';

export function GetYTId(songId) {
    let videoId = songId.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    return videoId
}

export const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2 },
    { width: 700, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
]

export function removeTokents() {
    create('/users/logOut', Cookies.get('refreshToken'))
    .then(res => {debugger})
    .catch(res=> {debugger})
    Cookies.remove('name')
    Cookies.remove('refreshToken')
    Cookies.remove('accessToken')
    Cookies.remove('isAdmin')
    Cookies.remove('user')
}

export function formatDate(date) {
    function pad(num) { return ('00' + num).slice(-2) };

    // Change the date to SQL date format
    let dateStr = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate() + 1)
    return dateStr;
};

