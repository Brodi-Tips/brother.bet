/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
// Calling Modules JS
import * as tf from '@tensorflow/tfjs';
// import $ from 'jquery';
import * as firebase from 'firebase/app';
import Typed from 'typed.js';
import $ from 'jquery';

// Defining Modules JS
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

// Library CSS
import 'animate.css';

// My Css
import '../css/timeline.css';
import '../css/loader.css';
import '../css/styles.css';

// My Clases Shared
import Api from '@brother.bet/Api';
import Database from '@brother.bet/Database';
import Util from '@brother.bet/Util';
import Fifa from '@brother.bet/Fifa';

// My Clases Frontend
import IData from './Class/IData';
import Environment from './Class/Environment';
import LocalDB from './Class/LocalDb';
import DashTables from './Class/DashTables';
import DashStatistics from './Class/DashStatistics';
import DashTimelines from './Class/DashTimelines';
import Dashboard from './Class/Dashboard';
import Main from './Class/Main';

// Static Components
import tableRanking from '../components/tableRanking.hbs';
import statistics from '../components/statistics.hbs';
import timeline from '../components/timeline.hbs';
import tableLastGames from '../components/tableLastGames.hbs';

// eslint-disable-next-line no-unused-vars

window.main = new Main({
  window,
  tf,
  firebase,
  Typed,
  $,
  Api,
  Database,
  Util,
  Fifa,
  IData,
  Environment,
  LocalDB,
  DashTables,
  DashStatistics,
  DashTimelines,
  Dashboard,
  tableRanking,
  statistics,
  timeline,
  tableLastGames,
});
