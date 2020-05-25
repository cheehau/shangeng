import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import logo from './logo.svg';
import './App.css';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import rules from './data/dizigui.json'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Up from '@material-ui/icons/ThumbUp';
import Down from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const DIARY_KEY = 'DIARY_KEY';
const DIZHIGUI = 'DIZHIGUI';

function App() {

  const level = ["#ffffff", "#414a4c", "#3b444b", "#353839", "#232b2b", "#0e1111"]

  const diary = JSON.parse(window.localStorage.getItem(DIARY_KEY)) || "{}";
  const dateObject = new Date();
  const date = dateObject.getFullYear()+'-'+(dateObject.getMonth()+1)+'-'+dateObject.getDate();
  const [today, setToday] = useState(date);
  const [checkedList, setCheckedList] = useState([...Array(rules.length).keys()].map(e => diary[DIZHIGUI] && diary[DIZHIGUI][e] || 0));
  
  const handleChange = (i, score) => {
    if(checkedList[i] + score < 0 || checkedList[i] + score > level.length) {
      return;
    }
    checkedList[i] = checkedList[i] + score;
    setCheckedList([
      ...checkedList,
    ]);
  };

  const updateDiary = (date, checklist) => {
    try {
      const retrieve = window.localStorage.getItem(DIARY_KEY);
      const diary = retrieve && JSON.parse(retrieve) || "{}";
      diary[DIZHIGUI] = checklist;
      window.localStorage.setItem(DIARY_KEY, JSON.stringify(diary))
    } catch(e) {
      window.localStorage.setItem(DIARY_KEY, JSON.stringify({}))
    }

  }

  useEffect(() => {
    updateDiary(today, checkedList)
  }, [checkedList]);

  useEffect(() => {
    updateDiary(today, checkedList)
  }, []);

  const CardCheckList = ({ rule, checklistIndex }) => <Card>
    <CardContent>
      <div>
      { rule.rule }
      </div>
      {
        [...Array(checkedList[checklistIndex]).keys()]
        .map(e => <FiberManualRecordIcon />)
      }
      
    </CardContent>
    <CardActions>
      <IconButton
        onClick={() => handleChange(checklistIndex, -1)}
      >
        <Up />
      </IconButton>
      
      <IconButton
        onClick={() => handleChange(checklistIndex, 1)}
      >
        <Down />
      </IconButton>
    </CardActions>
    </Card>
  return (
    <Grid container xs={12} spacing={2} justify="center" alignItems="center" >
      <Grid item xs={9}>
      <Grid container xs={12} spacing={2}>
        {
          rules.map((r, i) => <Grid xs={12} md={4} item><CardCheckList 
            key={i}
            checklistIndex={i}
            rule={r}
          /></Grid>)
        }
        </Grid>
        </Grid>
      </Grid>
  );
}

export default App;
