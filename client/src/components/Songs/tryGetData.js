import React, { useEffect,useState } from 'react';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';

function TryGetData({link}) {
      
// const [song, setSong] =useState()

    const getIdSong = (songId) => {
        let video_id = songId.split("v=")[1];
        const ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition !== -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
      }

    //   useEffect(()=> {
    //       (async()=> {
    //           try {
    //               const { data} = await Axios.get(`song/1`)
    //               setSong(data);
    //           } catch(e) {
                  
    //           }
    //       })
    //   })

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      }
    }


    const [songName, setSongName] = useState('');
    const [songArtist, setSongArtist] = useState();
    const [songAlbum, setSongAlbum] = useState('');
    const [songTrackNumber, setSongTrackNumber] = useState('');
    const [songLength, setSongLength] = useState('');
    const [songLycris, setSongLycris] = useState('');
    const [songCreated, setSongCreated] = useState('');
    const [songLink, setSongLink] = useState('');



     const _onReady = (event)=> {
        // access to player in all event handlers via event.target
        const t = event.target.getVideoData()
        setSongLength(event.target.getDuration())
      }
    

    return  (
        <YouTube videoId={getIdSong(link)} opts={opts} onReady={_onReady} /> 
    )
  }

export default TryGetData;
