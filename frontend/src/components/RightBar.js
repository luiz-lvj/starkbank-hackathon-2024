import styled from "styled-components";
import { Button } from "@mui/material";

export default function RightBar() {
    return (
        <SidebarContainer>
            <div className="button-container">
                <Button variant="contained" className="loan-button loan-button--request">
                    Solicitar empréstimo
                </Button>
                <Button variant="outlined" className="loan-button loan-button--pay">
                    Quitar empréstimo
                </Button>
            </div>
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
    width: 280px;
    height: 100%;
    position: fixed;
    right: 0;
    background-color: #f5f5f5;
    
    .button-container {
        width: 200px;
        padding: 0 40px;
    }
    
    .loan-button {
        height: 32px;
        text-transform: none;
        width: 100%;
        margin-bottom: 10px;
    }
    
    .loan-button--request {
        background-color: #0070E0;
        color: #FFFFFF;
    }
    
    .loan-button--pay {
        background-color: white;
        color: #0070E0;
    }
`;