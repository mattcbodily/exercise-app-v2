import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FormButton} from './ChallengeStyles';

const Challenge = props => {
    const [user, setUser] = useState({});
    const [battleInvitations, setBattleInvitations] = useState([]);

    useEffect(() => {
        axios.get('/api/user').then(res => {
            setUser(res.data);
            axios.get(`/api/battles/${res.data.user_id}`).then(battles => {
                setBattleInvitations(battles.data.filter(element => {
                   return element.accepted === false 
                }))
            })
        }).catch(err => console.log(err));
    }, [])

    const acceptBattle = (battleId) => {
        axios.put(`/api/invitation/${user.user_id}`, {battleId})
        .then(res => {
            axios.get(`/api/battles/${user.user_id}`).then(battles => {
                props.battlesFn(user.user_id)
                setBattleInvitations(battles.data.filter(element => {
                   return element.accepted === false 
                }))
            })
        }).catch(err => console.log(err))
    }

    const declineBattle = (battleId) => {
        axios.delete(`/api/invitation/${battleId}`)
        .then(res => {
            axios.get(`/api/battles/${user.user_id}`).then(battles => {
                props.battlesFn(user.user_id)
                setBattleInvitations(battles.data.filter(element => {
                   return element.accepted === false 
                }))
            })
        }).catch(err => console.log(err))
    }

    const mappedBattleInvitations = battleInvitations.map((invitation, i) => {
        return (
            <div key={i}>
                <p>You have been challenged!</p>
                <p>{invitation.battle_name}</p>
                <FormButton onClick={() => acceptBattle(invitation.battle_id)}>Accept</FormButton>
                <FormButton onClick={() => declineBattle(invitation.battle_id)}>Decline</FormButton>
            </div>
        )
    })

    return (
        <div>
            {battleInvitations.length !== 0
            ? (<>{mappedBattleInvitations}</>)
            : null
            }
        </div>
    )
}

export default Challenge;