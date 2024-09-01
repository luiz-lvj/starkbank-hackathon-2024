import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/investimentos">Investimentos</Link></li>
          <li><Link to="/recebimentos">Recebimentos</Link></li>
          <li><Link to="/cartao-corporativo">Cartão Corporativo</Link></li>
          <li><Link to="/integracoes">Integrações</Link></li>
          <li><Link to="/consultas">Consultas</Link></li>
        </ul>
      </nav>
      <div className="account-info">
        <p>Hackathon Account 518467</p>
        <p>hackathon-518467.sandbox.starkb...</p>
      </div>
    </div>
  );
}

export default Sidebar;
