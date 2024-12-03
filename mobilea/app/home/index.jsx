import React, { useState, useEffect } from "react";
import { Link } from "expo-router";

const BeatifyHome = () => {
  const [artistas, setArtistas] = useState([]);
  const [albuns, setAlbuns] = useState([]);
  const [musicas, setMusicas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const musicasMock = [
      { id: 1, nome: "Cintura Fina", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/6d9913707dd914d4451044c765ea2838.jpg", artista: "Raimundos" },
      { id: 2, nome: "É Quente", imageUrl: "https://lastfm.freetls.fastly.net/i/u/500x500/8c5d646d49982c5193400df017e2ef06.jpg", artista: "Charlie Brown Jr" },
      { id: 3, nome: "O Show Tem Que Continuar", imageUrl: "https://i.scdn.co/image/ab67616d00001e023a3569af7c0f73c3b7d74133", artista: "Grupo Revelação" },
    ];

    const artistasMock = [
      { id: 1, nome: "Raimundos", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/9f12b516f23f494bb6d1c6ef7a6574dc.jpg", artista: "Raimundos" },
      { id: 2, nome: "Charlie Brown Jr", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/7b542d42e42f4afbb74dbd569620d819.jpg", artista: "Charlie Brown Jr" },
      { id: 3, nome: "Bob Marley", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/55bb7ba278a2028e2c391a6e32e23f1a.jpg", artista: "Bob Marley" },
    ];

    const albunsMock = [
      { id: 1, nome: "Armandinho Ao Vivo", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/4f083e53848841df97e1f4f18609d054.jpg", artista: "Armandinho" },
      { id: 2, nome: "Raimundos", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/6d9913707dd914d4451044c765ea2838.jpg", artista: "Raimundos" },
      { id: 3, nome: "Nada Como um Dia Após o Outro Dia, Vol. 1 & 2", imageUrl: "https://lastfm.freetls.fastly.net/i/u/avatar300s/4ea51b8d56e1b15842a8d6b303911760.jpg", artista: "Racionais" },
    ];

    setMusicas(musicasMock);
    setArtistas(artistasMock);
    setAlbuns(albunsMock);
    
  }, []);

  const musicasFiltradas = musicas.filter(musica =>
    musica.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const renderCards = (items) => {
    return items.map((item) => (
      <div key={item.id} style={styles.card} onClick={() => setMusicaSelecionada(item)}>
        <img src={item.imageUrl} alt={item.nome} style={styles.image} />
        <p style={styles.text}>{item.nome}</p>
      </div>
    ));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.appName}>BEATIFY</h1>
        <div style={styles.profileIcon}>
          <Link href="../perfil">
            <img
              src="./assets/images/user1.png"
              alt="Profile"
              style={styles.profileImage}
            />
          </Link>
        </div>
      </header>
      <main style={styles.main}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search songs..."
            style={styles.searchInput}
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>
        
      
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Songs</h2>
          <div style={styles.horizontalList}>
            {musicasFiltradas.map((musica) => (
              <div
                key={musica.id}
                style={styles.card}
                onClick={() => setMusicaSelecionada(musica)}
              >
                <img src={musica.imageUrl} alt={musica.nome} style={styles.image} />
                <p style={styles.text}>{musica.nome}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Albums</h2>
          <div style={styles.horizontalList}>{renderCards(albuns)}</div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Artists</h2>
          <div style={styles.horizontalList}>{renderCards(artistas)}</div>
        </div>
      </main>

      
      {musicaSelecionada && (
        <div style={styles.player}>
          <div style={styles.playerContent}>
            <img
              src={musicaSelecionada.imageUrl}
              alt={musicaSelecionada.nome}
              style={styles.playerImage}
            />
            <div>
              <p style={styles.playerSongName}>{musicaSelecionada.nome}</p>
              <p style={styles.playerArtistName}>Artist: {musicaSelecionada.artista}</p>
            </div>
          </div>
          <div style={styles.controls}>
            <button onClick={togglePlayPause} style={styles.playButton}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <div style={styles.volumeControl}>
              <label htmlFor="volume" style={styles.volumeLabel}>Volume</label>
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                style={styles.volumeSlider}
              />
              <span>{volume}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#1DB954",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appName: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },
  profileIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    cursor: "pointer",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  main: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    paddingBottom: "80px",  
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    borderBottom: "2px solid #1DB954",
    display: "inline-block",
  },
  horizontalList: {
    display: "flex",
    overflowX: "auto",
    paddingBottom: "10px",
  },
  card: {
    marginRight: "15px",
    textAlign: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  text: {
    marginTop: "10px",
    fontSize: "14px",
  },
  searchBar: {
    marginBottom: "30px",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #1DB954",
    backgroundColor: "#333",
    color: "#fff",
  },
  player: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "#121212",
    padding: "10px 20px",
    borderTop: "2px solid #1DB954",
    zIndex: "100",
  },
  playerContent: {
    display: "flex",
    alignItems: "center",
  },
  playerImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "20px",
    objectFit: "cover",
  },
  playerSongName: {
    margin: 0,
    fontSize: "18px",
  },
  playerArtistName: {
    margin: 0,
    fontSize: "14px",
    color: "#aaa",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  playButton: {
    backgroundColor: "#1DB954",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
  volumeControl: {
    display: "flex",
    alignItems: "center",
  },
  volumeLabel: {
    marginRight: "10px",
  },
  volumeSlider: {
    marginRight: "10px",
  },
};

export default BeatifyHome;
