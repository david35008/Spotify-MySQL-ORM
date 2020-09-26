import React, { useEffect, useState } from 'react';
import { create, read } from '../../Network/Ajax';


function AddToPlayListButton() {

    const [playlists, setPlaylists] = useState([{ value: 1, label: 'hey' }])
    // const [chosenPlaylists, setChosenPlaylists] = useState()

    // useEffect(() => {
    //     read(`playlists`)
    //         .then((res) => {
    //             setPlaylists(res)
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, [])
    // let playlists =[{value: 1, label: 'hey'}]
    // // alert('i am addToPlayList button')
    // const playlistsOptions = playlists.map((playlist) => {
    //     return {
    //         value: playlist.id, label: playlist.name
    //     }
    // })

    // const addToPlayListAjax = (value) => {
    //     create('songsInPlaylists', value)
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }

    // onChange={(e) => { setChosenPlaylists(e.value); addToPlayListAjax(e.value); }
    return (
        // <Select options={playlists} />
    )
}

export default AddToPlayListButton;
