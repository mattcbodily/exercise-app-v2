import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import WorkoutModal from './WorkoutModal';

const Button = styled.button`
    height: 50px;
    width: 95%;
    font-size: 18px;
`

const Battle = props => {
    const [member, setMember] = useState({})
    const [battle, setBattle] = useState({});
    const [contestants, setContestants] = useState([]);
    const [workoutModal, setWorkoutModal] = useState(false);

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setMember(res.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`/api/battle/${props.match.params.id}`)
        .then(res => {
            console.log(res.data[0].battle_type)
            setBattle(res.data[0]);
            axios.get(`/api/contestants/${props.match.params.id}`)
            .then(contestants => {
                setContestants(contestants.data)
            })
        }).catch(err => console.log(err));
    }, [])

    console.log(contestants)

    const toggleModal = () => {
        setWorkoutModal(!workoutModal)
    }

    return (
        <div>
            <Button onClick={toggleModal}>Add Workout</Button>
            {workoutModal
            ? <WorkoutModal toggleFn={toggleModal}/>
            : null}
        </div>
    )
};

export default Battle;