import React from "react";
import styled from "styled-components";
import Loans from "../components/home/Loans";
import RightBar from "../components/home/RightBar";
import Table from "../components/home/Table";

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