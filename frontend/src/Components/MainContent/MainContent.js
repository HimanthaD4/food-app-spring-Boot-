import React, { Component } from 'react';
import "./MainContent.css";
import Grid from '@mui/material/Grid';
import MainPage from '../MainPage/MainPage';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="main-content"
                style={{
                    margin: "64px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >


                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={12} className="maincontent__container">
                        <Grid>
                            <div>
                                <MainPage />
                            </div>

                        </Grid>


                        {/* </Grid> */}
                        <Grid item xs={2}>
                            {/* <InfoSection />
                           */}
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MainContent;