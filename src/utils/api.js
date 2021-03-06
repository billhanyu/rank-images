import axios from 'axios';
import { baseURL } from '../config/config';

const instance = axios.create({
  baseURL,
});

export function nextEntryForUser(userid) {
  return instance.get(`/rate/${userid}`);
}

export function rateEntry(userid, queueEntryId, votedFor) {
  return instance.post(`/rate/${userid}`, {
    queueEntryId,
    votedFor,
  });
}

export function allRank() {
  return instance.get(`/rank/all`);
}
