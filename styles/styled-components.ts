import styled from 'styled-components';
import { Input } from 'antd';

export const Logo = styled.h1<{ primary?: boolean }>`
    font: poppins;
    font-size: 3rem;
    background: linear-gradient(90deg, rgba(244, 170, 129, 0.7) 1.91%, rgba(227, 153, 141, 0.7) 26.43%, rgba(189, 98, 154, 0.7) 55.04%, rgba(176, 96, 167, 0.7) 77.52%, rgba(159, 93, 184, 0.7) 100%), linear-gradient(180deg, #F4AA81 8.75%, #E3998D 31.56%, #BD629A 58.18%, #B060A7 79.09%, #9F5DB8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`;

const {Search} = Input;
export const CustomSearch = styled(Search)`
    .ant-btn-primary {
        background: linear-gradient(90deg, rgba(244, 170, 129, 0.7) 1.91%, rgba(227, 153, 141, 0.7) 26.43%, rgba(189, 98, 154, 0.7) 55.04%, rgba(176, 96, 167, 0.7) 77.52%, rgba(159, 93, 184, 0.7) 100%), linear-gradient(180deg, #F4AA81 8.75%, #E3998D 31.56%, #BD629A 58.18%, #B060A7 79.09%, #9F5DB8 100%);
        border-color: transparent;
    }

    .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
        border-color: #F4AA81;
    }
    .ant-input-affix-wrapper:hover {
        border-color: #F4AA81;
    }
`

export const LandingPage = styled.div`
padding: 30vh 20vw;
`