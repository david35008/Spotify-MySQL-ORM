import Cookies from 'js-cookie';

export function GetYTId(songId) {
    let video_id = songId.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id
}

export const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 450, itemsToShow: 2 },
    { width: 700, itemsToShow: 3 },
    { width: 1000, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
]

export function removeTokents() {
    Cookies.remove('name')
    Cookies.remove('token')
    Cookies.remove('isAdmin')
}
