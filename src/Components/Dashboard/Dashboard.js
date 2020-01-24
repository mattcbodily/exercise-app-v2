import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Profile from '../Profile/Profile';
import Challenge from '../Challenge/Challenge';
import CreateBattleModal from '../CreateBattleModal/CreateBattleModal';
import {Container, Button} from './DashboardStyles';

const Dashboard = props => {
    const [member, setMember] = useState({})
    const [battles, setBattles] = useState([]);
    const [createBattleView, setCreateBattleView] = useState(false);

    useEffect(() => {
        axios.get('/api/user').then(res => {
            setMember(res.data);
            getBattles(res.data.user_id)
        }).catch(err => console.log(err));
    }, [])

    const toggleView = () => {
        setCreateBattleView(!createBattleView)
    }

    const getBattles = (id) => {
        axios.get(`/api/battles/${id}`).then(battles => {
            setBattles(battles.data.filter(element => {
                return element.accepted === true
            }))
        })
    }

    const mappedBattles = battles.map((battle, i) => {
        return (
            <p key={i}>
                <Link to={`/battle/${battle.battle_id}`}>{battle.battle_name}</Link>
            </p>
        )
    })

    return (
        <Container>
            <Profile />
            <Challenge battlesFn={getBattles}/>
            <Button onClick={toggleView}>+ Create Battle</Button>
            {createBattleView
            ? (<><CreateBattleModal user={member} toggleFn={toggleView}/></>)
            : (<>
                {mappedBattles}
               </>)
            }
        </Container>
    )
}

export default Dashboard;