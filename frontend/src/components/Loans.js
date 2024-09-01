import styled from "styled-components";


export default function Loans() {
    return (
        <LoansStyle>
            <div id="bloco">
                <div id="Aviso">
                    <h1>Nova Área de Crédito</h1>
                    <p>Visualize suas solicitações, conceções e histórico de crédito. Após fazer a solicitação seu processo será analisado e você receberá o retorno assim que possível.</p>
                </div>
            </div>
        </LoansStyle>
    );
}

const LoansStyle = styled.div`
    
    h1, p {
        margin: 0 0 4px 0;
    }
    
    #bloco {
        margin-top: 100px;
        width: calc(100% - 240px - 360px);
        position: absolute;
        height: fit-content;
        min-height: 100%;
        padding-left: 20px;
    }
    
    #Aviso {
        width: 790.4px;
        height: 76px;
        padding: 24px;
        margin-bottom: 40px;
        border: solid 1px black;
        border-radius: 8px;
        background-color: #F7F9FA;
        display: flex;
        flex-direction: column;
    }
    
`; //css aqui