import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing';
import Dashboard from './Components/Dashboard';
import Battle from './Components/Battle';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/battle' component={Battle}/>
    </Switch>
)