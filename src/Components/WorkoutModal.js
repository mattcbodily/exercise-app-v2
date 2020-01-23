import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    height: 100vh;
    width: 100%;
    position: fixed;
`

const Input = styled.input`
    height: 35px;
    width: 80%;
    font-size: 16px;
`

const Select = styled.select`
    height: 35px;
    width: 80%;
    font-size: 16px;
`

const Button = styled.button`
    height: 35px;
    width: 80%;
    font-size: 16px;
`

const WorkoutModal = props => {
    const [member, setMember] = useState({});
    const [workoutName, setWorkoutName] = useState('');
    const [workoutDate, setWorkoutDate] = useState('');
    const [workoutType, setWorkoutType] = useState('Cycling');
    const [workoutDistance, setWorkoutDistance] = useState('');

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setMember(res.data))
        .catch(err => console.log(err));
    }, [])

    const addWorkout = () => {
        axios.post(`/api/workout/${member.user_id}`, {workoutName, workoutDate, workoutType, workoutDistance})
        .then(res => {
            props.toggleFn()
        }).catch(err => console.log(err));
    }

    return (
        <Container>
            <Input value={workoutName} onChange={(e) => setWorkoutName(e.target.value)}/>
            <Input type='date' value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)}/>
            <Select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                <option value='Cycling'>Cycling</option>
                <option value='Running'>Running</option>
                <option value='Hiking'>Hiking</option>
            </Select>
            <Input value={workoutDistance} onChange={(e) => setWorkoutDistance(e.target.value)}/>
            <Button onClick={addWorkout}>Submit</Button>
        </Container>
    )
}

export default WorkoutModal;