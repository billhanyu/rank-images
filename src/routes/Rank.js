import React, { Component } from 'react';
import { allRank } from '../utils/api';
import RankEntry from '../components/RankEntry';
// import RankPagination from '../components/RankPagination';
const { entriesPerPage } = require('../config/config');
import { Link } from 'react-router-dom';
import '../css/Rank.css';

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      current: 1,
      total: 1,
    };
  }

  componentWillMount() {
    console.log(window.location);
    allRank()
      .then(response => {
        console.log(response.data);
        this.setState({
          entries: response.data,
          total: Math.ceil(response.data.length / entriesPerPage),
        });
      })
      .catch(() => {
        alert('error retrieving ranks');
      });
  }

  render() {
    return (
      <div>
        <h1>Overall Ranking</h1>
        <div className='LinkInRankContainer'>
          <Link to='/'>Home</Link>
        </div>
        {
          this.state.entries.map((entry, idx) => {
            return (
              <RankEntry
                key={idx}
                {...entry}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Rank;
