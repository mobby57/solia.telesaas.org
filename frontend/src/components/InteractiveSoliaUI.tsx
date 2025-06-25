import React from 'react';

const zones = [
  {
    id: 'logo',
    coords: [20, 20, 170, 70],
    action: () => window.location.href = '/',
    description: 'Logo Solia cliquable pour revenir à l’accueil',
  },
  {
    id: 'mainMenu',
    coords: [20, 90, 220, 790],
    action: () => {
      // Toggle sidebar menu logic here
      alert('Menu latéral toggled');
    },
    description: 'Ouvre menu latéral ou dashboard',
  },
  {
    id: 'loginBtn',
    coords: [1300, 30, 1420, 70],
    action: () => window.location.href = '/login',
    description: 'Bouton Connexion',
  },
  {
    id: 'userProfile',
    coords: [1340, 30, 1400, 70],
    action: () => {
      // Open user profile menu logic here
      alert('Menu profil utilisateur ouvert');
    },
    description: 'Profil utilisateur',
  },
  {
    id: 'missionSection',
    coords: [250, 90, 1150, 490],
    action: () => {
      // Show mission detail logic here
      alert('Détail mission affiché');
    },
    description: 'Zone Mission',
  },
  {
    id: 'commentsSection',
    coords: [250, 510, 1150, 810],
    action: () => {
      // Show comments logic here
      alert('Commentaires affichés');
    },
    description: 'Zone Commentaires',
  },
  {
    id: 'addButton',
    coords: [1150, 650, 1230, 690],
    action: () => {
      // Open add form logic here
      alert('Formulaire création mission ouvert');
    },
    description: 'Bouton Ajout',
  },
  {
    id: 'footer',
    coords: [0, 870, 1440, 900],
    action: () => {
      // Show footer links logic here
      alert('Liens footer affichés');
    },
    description: 'Footer',
  },
];

const InteractiveSoliaUI: React.FC = () => {
  const handleClick = (action: () => void) => (event: React.MouseEvent) => {
    event.preventDefault();
    action();
  };

  return (
    <div className="interactive-solia-container">
      <img
        src="/images/interface-graphique.png"
        alt="Interface Solia"
        className="interactive-solia-image"
      />
      {zones.map(({ id, coords, action, description }) => {
        const [x1, y1, x2, y2] = coords;
        const width = x2 - x1;
        const height = y2 - y1;
        return (
          <a
            key={id}
            href="#"
            onClick={handleClick(action)}
            title={description}
            className="interactive-solia-zone"
            style={{
              '--left': `${x1}px`,
              '--top': `${y1}px`,
              '--width': `${width}px`,
              '--height': `${height}px`,
            } as React.CSSProperties}
          >
            {id}
          </a>
        );
      })}
    </div>
  );
};

export default InteractiveSoliaUI;
