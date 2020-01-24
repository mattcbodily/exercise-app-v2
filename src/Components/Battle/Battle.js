import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import WorkoutModal from '../WorkoutModal/WorkoutModal';
import {Container, ChartWrapper, Button} from './BattleStyles';

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
            setBattle(res.data[0]);
            axios.get(`/api/contestants/${props.match.params.id}/type/${res.data[0].battle_type}`)
            .then(contestants => {
                setContestants(contestants.data)
            })
        }).catch(err => console.log(err));
    }, [])

    const toggleModal = () => {
        setWorkoutModal(!workoutModal)
    }

    const getContestants = (battleType) => {

    }

    return (
        <Container>
            {/* user images will display up here */}
            {contestants.length
            ? (<ChartWrapper>
                    <Doughnut 
                        height={1}
                        width={1}
                        data={{
                            datasets: [{
                                backgroundColor: ['#0091F5', '#F50000'],
                                borderColor: ['#000000', '#000000'],
                                data: [+contestants[0].distance, +contestants[1].distance]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartWrapper>)
            : null}
            <Button onClick={toggleModal}>Add Workout</Button>
            {workoutModal
            ? <WorkoutModal toggleFn={toggleModal}/>
            : null}
        </Container>
    )
};

export default Battle;