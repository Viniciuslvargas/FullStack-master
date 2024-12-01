import React from "react";
import { Link } from "expo-router";

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#121212", // Estilo escuro, típico de aplicativos como Spotify
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "20px",
  },
  profileName: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
  },
  profileDescription: {
    fontSize: "18px",
    color: "#ccc",
    marginTop: "10px",
  },
  playlistSection: {
    marginTop: "40px",
  },
  playlistTitle: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#1db954", // Cor verde do Spotify
  },
  playlistItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "18px",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
  },
  logoutButton: {
    backgroundColor: "#1db954",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logoutButtonHover: {
    backgroundColor: "#1ed760",
  },
};

const Perfil = () => {
  // Dados do usuário (isso poderia vir de um estado ou de uma API)
  const usuario = {
    nome: "César Maroli",
    descricao:
      "Adoro música e estou sempre descobrindo novas faixas e artistas! Minhas playlists são meu refúgio.",
    fotoPerfil: "./assets/images/user1.png", // Coloque o caminho correto da imagem
    playlists: [
      { nome: "Reagges FOD@S", quantidadeMusicas: 20 },
      { nome: "MPB", quantidadeMusicas: 15 },
      { nome: "Funks", quantidadeMusicas: 25 },
    ],
  };

  const logout = () => {
    // Aqui você pode adicionar a lógica para o logout
    console.log("Usuário deslogado!");
  };

  return (
    <div style={styles.container}>
      {/* Cabeçalho do perfil */}
      <div style={styles.header}>
        <img
          src={usuario.fotoPerfil}
          alt="Perfil"
          style={styles.profileImage}
        />
        <h1 style={styles.profileName}>{usuario.nome}</h1>
        <p style={styles.profileDescription}>{usuario.descricao}</p>
      </div>

      {/* Seção de playlists */}
      <div style={styles.playlistSection}>
        <h2 style={styles.playlistTitle}>Playlists</h2>
        {usuario.playlists.map((playlist, index) => (
          <div key={index} style={styles.playlistItem}>
            <span>{playlist.nome}</span>
            <span>{playlist.quantidadeMusicas} músicas</span>
          </div>
        ))}
      </div>

      {/* Rodapé com botão de logout */}
      <div style={styles.footer}>
        <Link href="/home">
        <button
          style={styles.logoutButton}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.logoutButton.backgroundColor)
          }
          onClick={logout}
        >
          Sair
        </button> </Link>
      </div>
    </div>
  );
};

export default Perfil;