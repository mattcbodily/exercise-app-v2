import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';

const Battle = props => {
    const [battle, setBattle] = useState({});
    const [contestants, setContestants] = useState([]);

    useEffect(() => {
        axios.get(`/api/battle/${props.match.params.id}`)
        .then(res => {
            setBattle(res.data[0]);
            axios.get(`/api/contestants/${props.match.params.id}`)
            .then(contestants => setContestants(contestants.data))
        }).catch(err => console.log(err));
    }, [])

    console.log(battle)
    console.log(contestants)

    return (
        <div>Haloo</div>
    )
};

export default Battle;