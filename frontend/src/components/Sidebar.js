import styled from "styled-components";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from "@mui/icons-material/Add";

export default function Sidebar() {
  return (
    <SidebarStyle>
      <div id="sidebar">
        <div id="menu-header">
          <img
            id="menu-logo"
            className="menu-icon"
            src="./images/logo.svg"
            alt="Logo"
          ></img>
        </div>
        <div id="menu-body">
          <span className="menu-text">Extrato</span>
          <span className="menu-text">Membros</span>
          <span className="menu-text">Crédito</span>
          <div className="menu-item">
            <ArrowRightIcon className="menu-icon" />
            <span>Investimentos</span>
          </div>
          <div className="menu-item">
            <ArrowRightIcon className="menu-icon" />
            <span>Recebimentos</span>
          </div>
          <div className="menu-item">
            <ArrowRightIcon className="menu-icon" />
            <span>Cartão Corporativo</span>
            <AddIcon className="add-icon" />
          </div>
          <div className="menu-item">
            <ArrowRightIcon className="menu-icon" />
            <span>Integrações</span>
          </div>
          <div className="menu-item">
            <ArrowRightIcon className="menu-icon" />
            <span>Consultas</span>
          </div>
          <div className="menu-item">
            <ArrowRightIcon className="menu-icon" />
            <span>Pagamentos</span>
            <AddIcon className="add-icon" />
          </div>
        </div>
        <div id="menu-footer">
          <p>Hackathon Account 518467</p>
          <p>hackathon-518467.sandbox.starkbank.com</p>
        </div>
      </div>
    </SidebarStyle>
  );
}

const SidebarStyle = styled.div`
  #sidebar {
    width: 240px;
    height: 100%;
    position: fixed;
    z-index: 21;
    background-color: #f7f9fa;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  #menu-header {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #menu-logo {
    width: 40px;
    height: 40px;
  }

  #menu-body {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    flex-grow: 1;
  }

  .menu-text {
    margin-bottom: 15px;
    margin-left: 35px;
    font-size: 16px;
    color: #637282;
    cursor: pointer;
  }

  .menu-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 16px;
    color: #637282;
    cursor: pointer;
    position: relative;
  }

  .menu-icon {
    margin-right: 10px;
    color: #1b2733;
  }

  .add-icon {
    position: absolute;
    right: 0;
    color: #1b2733;
  }

  #menu-footer {
    padding-left: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    color: #637282;
  }

  #menu-footer p:last-child {
    font-size: 12px;
    color: #a0a0a0;
  }
`;
