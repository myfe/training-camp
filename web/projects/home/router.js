import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from '@maoyan/tangdao';

import RootView from './root-view';

import PageHome from './home/index';
import LearnMaterials from './learn-materials/index';
import ExerciseOne from './exercise/one/index';
import ExerciseTwo from './exercise/two/index';
import Page404NotFound from '../../component/404';

const baseUrl = '/trainingcamp';
// eslint-disable-next-line react/prop-types
function RouterConfig() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={baseUrl} render={() => (<Redirect to={`${baseUrl}/home`} />)} />
        <Route path={`${baseUrl}/home`} render={() => (<RootView path={`${baseUrl}/home`} Component={PageHome} />)} />
        <Route path={`${baseUrl}/learnmaterials`} render={() => (<RootView path={`${baseUrl}/learnmaterials`} Component={LearnMaterials} />)} />
        <Route path={`${baseUrl}/exercise/one`} render={() => (<RootView path={`${baseUrl}/exercise/one`} Component={ExerciseOne} />)} />
        <Route path={`${baseUrl}/exercise/two`} render={() => (<RootView path={`${baseUrl}//exercise/two`} Component={ExerciseTwo} />)} />
        <Route render={() => (<RootView path="/404" Component={Page404NotFound} />)} />
      </Switch>
    </BrowserRouter>
  );
}

export default RouterConfig;
