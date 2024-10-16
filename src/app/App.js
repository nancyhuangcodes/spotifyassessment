import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar.jsx';
import SearchResults from '../components/searchresults/SearchResults.jsx';
import Playlist from '../components/playlist/Playlist.jsx';
import { Spotify } from '../utils/Spotify.js';

function App() {

  // state management (useState() hook) - to create an Array called searchResults
  const [searchResults, setSearchResults] = useState([]);
  const [playListTracks, setPlayListTracks] = useState([]);
  const [playListName, setPlayListName] = useState("My New Playlist");

  // sideEffect (Document Load) - called useEffect hook
  // The blank bracket refers to running this hook only once
  useEffect(() => {

    Spotify.getAccessToken();
    

  }, []);

  // passed as a prop to SearchBar 
  // invokes the Spotify.search() 
  function search(term) {
    Spotify.search(term).then((response) => setSearchResults(response));
  }

  // passed as a prop to SearchResults 
  function addTrack(track) {
    const trackExists = playListTracks.find((currentTrack) =>
      currentTrack.id === track.id);

    if (!trackExists)
      setPlayListTracks([...playListTracks, track]);
  }

  // passed as a prop to Playlist 
  function removeTrack(track) { // return all the tracks except the track passed in (i.e. the track to be removed)
    const filteredTrack = playListTracks.filter((currentTrack) => currentTrack.id !== track.id);

    setPlayListTracks(filteredTrack);
  }

  // passed as a prop to PlayList (update playlist name)

  function updatePlayListName(strName){
    setPlayListName(strName);
  }

  // passed as a prop to PlayList (save new playlist)
  function savePlayList(){
    const tracksUri = playListTracks.map((track) => track.uri);

    Spotify.savePlaylist(playListName, tracksUri).then (() => {
      updatePlayListName("New Playlist");
      setPlayListTracks([]);
    });
  }

  console.log("my searchResults", searchResults);
  console.log("my playListTracks", playListTracks);
  console.log("My playlist name: ", playListName);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onClick ={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults
            searchResults={searchResults}
            onAdd={addTrack}
            onSave={savePlayList}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playListTracks={playListTracks}
            onRemove={removeTrack}
            playListName={playListName}
            updateName = {updatePlayListName}
            onSave={savePlayList}
          />

        </div>
      </div>
    </div>
  );
}

export default App;