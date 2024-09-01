import styled from "styled-components";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { collection, onSnapshot, getFirestore } from 'firebase/firestore';

export default function Table() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const unsubscribe = onSnapshot(collection(db, "loans"), (snapshot) => {
            const updatedLoans = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setLoans(updatedLoans);
        });

        // Limpeza ao desmontar o componente
        return () => unsubscribe();
    }, []);

    return (
        <LoansStyle>
            <div className="bloco">
                <div className="aviso">
                    <h1>Pedir empréstimo</h1>
                    <p>Solicite um empréstimo para a sua empresa. Após fazer a solicitação seu processo será analisado e você receberá o retorno assim que possível.</p>
                </div>
                <div className="info">
                    <text className="info1">Crédito</text>
                    <div className="periodo">
                        <span>Período: Abril 2024 - Setembro 2024</span>
                    </div>
                </div>
                <div className="tabela">
                    <table className="dashboard-table">
                        <thead>
                        <tr>
                            <th>Concessão</th>
                            <th>Vencimento</th>
                            <th>Juros</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>{`R$ ${loan.loanAmount.toFixed(2)}`}</td>
                                <td>{moment().add(loan.loanTerm, 'months').format('MM/YYYY')}</td>
                                <td>{loan.loanInterestRate}</td>
                            </tr>
                        ))}
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
        padding-left: 242px;
        height: 220px;
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
        
    }

    .dashboard-table th, .dashboard-table td {
        padding: 8px;
        text-align: left;
    }
    

    .dashboard-table th {
        background-color: #FFFFFF;
        font-weight: normal;
    }
    
    .info{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        align-items: center;
    }
    
    tr {
        display: flex;
        border-bottom: solid 1px #E0E0E0;
        justify-content: space-between;
    }
    
    .periodo {
        border: 1px solid #0070E0;
        padding: 4px;
        border-radius: 4px;
    }
    
    .info1 {
        padding-left: 8px;
    }
`; //css aqui