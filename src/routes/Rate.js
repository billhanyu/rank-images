import '../css/Rate.css';
import React, { Component } from 'react';
import { nextEntryForUser, rateEntry } from '../utils/api';
const { baseURL } = require('../config/config');
import { Link } from 'react-router-dom';

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first: '',
      second: '',
      queueEntryId: '',
    };
    this.keyDown = this.keyDown.bind(this);
  }

  componentWillMount() {
    nextEntryForUser(this.props.match.params.userid)
      .then(response => {
        const entry = response.data.queue;
        console.log(response.data);
        this.setState({
          username: response.data.username,
          first: entry.first,
          second: entry.second,
          queueEntryId: entry._id,
        }, () => {
          document.addEventListener('keydown', this.keyDown, false);
        });
      })
      .catch(() => {
        alert('Error. Wrong user id?');
      });
  }

  keyDown(event) {
    if (event.keyCode === 37) {
      this.rate(0);
    } else if (event.keyCode === 39) {
      this.rate(1);
    }
  }

  rate(votedFor) {
    rateEntry(this.props.match.params.userid, this.state.queueEntryId, votedFor)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        alert('rating failed');
      });
  }

  render() {
    return (
      <div>
        <h1>Which one is better? (arrow keys work)</h1>
        <h3>Rating as {this.state.username}</h3>
        {
          this.state.first &&
          <div className='candidate-container'>
            <img
              className='candidate'
              src={`${baseURL}/image/${this.state.first}`}
              onClick={() => this.rate(0)}
              alt='left'
            />
          </div>
        }
        {
          this.state.second &&
          <div className='candidate-container'>
            <img
              className='candidate'
              src={`${baseURL}/image/${this.state.second}`}
              onClick={() => this.rate(0)}
              alt='right'
            />
          </div>
        }
        <div className='NavigationLinks'>
          <Link className='NavigationLink' to='/'>Home</Link>
          <Link className='NavigationLink' to='/rank'>Overall Ranking</Link>
        </div>
      </div>
    );
  }
}

export default Rate;
