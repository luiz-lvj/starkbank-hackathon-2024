import styled from "styled-components";
import Loans from "../components/Loans";
import RightBar from "../components/RightBar";
import Sidebar from "../components/Sidebar";


export default function Home() {
    return (
        <HomeStyle>
            <Loans />
            <RightBar />
        </HomeStyle>
    );
}


const HomeStyle = styled.div`

`; //css aqui