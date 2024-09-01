import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import LoanPopup from "./LoanDialog";

export default function RightBar() {
    const [openPopup, setOpenPopup] = useState(false);

    const handleOpenPopup = () => {
        setOpenPopup(true);
    };

    return (
        <SidebarContainer>
            <div className="button-container">
                <Button 
                    variant="contained" 
                    className="loan-button loan-button--request"
                    onClick={handleOpenPopup}
                >
                    Solicitar empréstimo
                </Button>
                <Button variant="outlined" className="loan-button loan-button--pay">
                    Quitar empréstimo
                </Button>
            </div>
            <LoanPopup open={openPopup} onClose={() => setOpenPopup(false)} />
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
    width: 280px;
    padding-top: 100px;
    position: fixed;
    right: 0;
    background-color: #FFFFFF;
    
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