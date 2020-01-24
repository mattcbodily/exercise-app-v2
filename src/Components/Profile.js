import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Profile = props => {
    const [member, setMember] = useState({});

    useEffect(() => {
        axios.get('/api/user')
        .then(res => setMember(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div></div>
    )
}

export default Profile;