import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import WorkoutModal from '../WorkoutModal/WorkoutModal';
import {Button} from './BattleStyles';

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
        <div>
            {contestants.length
            ? <Doughnut 
                height={100}
                width={100}
                data={{
                    datasets: [{
                        backgroundColor: ['#0091F5', '#F50000'],
                        borderColor: ['#000000', '#000000'],
                        data: [+contestants[0].distance, +contestants[1].distance]
                    }]
                }}
                options={{
                    // responsive: true,
                    maintainAspectRatio: false,
                    cutoutPercentage: 60
                }}/>
            : null}
            <Button onClick={toggleModal}>Add Workout</Button>
            {workoutModal
            ? <WorkoutModal toggleFn={toggleModal}/>
            : null}
        </div>
    )
};

export default Battle;