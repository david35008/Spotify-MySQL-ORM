function GetYTId({ songId }) {

    let video_id = songId.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }

    return (
        video_id
    )
}

export default GetYTId;
