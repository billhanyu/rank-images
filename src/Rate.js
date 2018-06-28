import './Rate.css';
import React, { Component } from 'react';
import { nextEntryForUser, rateEntry } from './api';
const { baseURL } = require('./config');

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      queueEntryId: '',
    };
    this.keyDown = this.keyDown.bind(this);
  }

  componentWillMount() {
    nextEntryForUser(this.props.match.params.userid)
      .then(response => {
        const entry = response.data;
        this.setState({
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
        <h1>left or right? (arrow keys work)</h1>
        {
          this.state.first &&
          <div className='candidate-container'>
            <img
              className='candidate candidate-left'
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
              className='candidate candidate-right'
              src={`${baseURL}/image/${this.state.second}`}
              onClick={() => this.rate(0)}
              alt='right'
            />
          </div>
        }
      </div>
    );
  }
}

export default Rate;
