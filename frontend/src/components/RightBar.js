import styled from "styled-components";
import {Button} from "@mui/material";


export default function RightBar() {
    return (
        <LoansStyle>
            <div class="buttons">
            <Button variant="contained" id="button1">Solicitar empréstimo</Button>
            <Button variant="outlined" id="button2">Quita empréstimo</Button>
            </div>
        </LoansStyle>
    );
}

const LoansStyle = styled.div`
    width: 280px;
    height: calc(100%);
    float: right;
    margin-left: calc(100% - 280px);
    right: 0px;
    background-color: var(#f5f5f5);
    position: fixed !important;
    
    .buttons {
        width: 200px;
        padding: 0 40px 0;
    }
    
    button {
        height: 32px;
        text-transform: none;
        width: 100%;
    }
    
    
    #button1 {
        background-color: #0070E0;
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    
    #button2 {
        background-color: white;
        color: #0070E0;
    }
    
`; //css aqui