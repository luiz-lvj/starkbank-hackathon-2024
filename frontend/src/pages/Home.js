import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loans from "../components/Loans";
import RightBar from "../components/RightBar";
import Table from "../components/Table";

export default function Home() {

    return (
        <HomeStyle>
            <Loans />
            <Table />
            <RightBar />
        </HomeStyle>
    );
}

const HomeStyle = styled.div`
    // ... seu CSS aqui ...
`;