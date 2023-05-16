import React, { useState } from 'react';
import "./NavBar.css";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import dp from "../../images/dp6.png"
import config from '../../config';
import { useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import InfoSection from '../InfoSection/InfoSection'
import logoblack from '../../images/logoblack.png'

const NavBar = ({dp}) => {
    const [state, setState] = useState({});
    const navigate = useNavigate()
    const _id = localStorage.getItem("uid")
    return (
        <div>
            <div className="navbar__barContent">
                <Grid container>
                    <Grid item xs={2}> </Grid>
                    <Grid item xs={3}>
                        <Title className="navbar_logo" level={1}><img src={logoblack}/></Title>
                    </Grid>
                    <Grid item xs={3}>
                        <div></div>
                    </Grid>
                
                    <Grid item xs={1}>sdsdsdsdsdsdsdsd</Grid>
                </Grid>
                <InfoSection/>
            </div>
        </div>
    );
}

export default NavBar;
