import styled from "styled-components";


export default function Loans() {
    return (
        <LoansStyle>
            <div className="bloco">
                <div className="aviso">
                    <h1>Nova Área de Crédito</h1>
                    <p>Visualize suas solicitações, conceções e histórico de crédito. Após fazer a solicitação seu processo será analisado e você receberá o retorno assim que possível.</p>
                </div>
                <div className="info">
                    <text>Crédito</text>
                    <div className="periodo">
                        <text>Período: Abril 2024 </text>
                    </div>
                </div>
                <div>
                    <table className="dashboard-table">
                        <thead>
                        <tr>
                            <th>Total</th>
                            <th>Conceição</th>
                            <th>Vencimento</th>
                            <th>Status</th>
                            <th>Pendência</th>
                            <th>Integral</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* As linhas de dados virão aqui */}
                        </tbody>
                    </table>
                </div>
            </div>
        </LoansStyle>
    );
}

const LoansStyle = styled.div`

    h1, p {
        margin: 0 0 4px 0;
    }

    .bloco {
        margin-top: 100px;
        width: calc(100% - 240px - 360px);
        position: absolute;
        height: fit-content;
        min-height: 100%;
        padding-left: 242px;
    }
    
    .aviso {
        width: 790.4px;
        height: 76px;
        padding: 24px;
        margin-bottom: 60px;
        border: solid 1px black;
        border-radius: 8px;
        background-color: #F7F9FA;
        display: flex;
        flex-direction: column;
    }

    .dashboard-table {
        width: 100%;
        border-collapse: collapse;
    }

    .dashboard-table th, .dashboard-table td {
        border-bottom: 1px solid #E0E0E0;
        padding: 8px;
        text-align: left;
    }

    .dashboard-table th {
        background-color: #FFFFFF;
        font-weight: bold;
    }
`; //css aqui