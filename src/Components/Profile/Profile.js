import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Img} from './ProfileStyles';

const Profile = props => {
    const [member, setMember] = useState({});

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setMember(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <Img src={member.user_image} alt={member.username}/>
        </Container>
    )
}

export default Profile;