import React, { Component } from 'react';
import '../css/RankEntry.css';
import likeIcon from '../assets/like.png';

const { baseURL } = require('../config/config');

class RankEntry extends Component {
  render() {
    return (
      <div className='RankEntryContainer'>
        <img
          className='RankEntryImage'
          src={`${baseURL}/image/${this.props.id}`}
          alt={this.props.id}
        />
        <div className='VoteNumberDisplay'>
          <img
            className='likeIcon'
            src={likeIcon}
            alt='like'
          />
          <span className='RankEntryVote'>{this.props.votes}</span>
        </div>
      </div>
    );
  }
}

export default RankEntry;
