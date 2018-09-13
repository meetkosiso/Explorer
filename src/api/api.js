import axios from "axios";

export default {
  block: {
    fetch: () => axios.get('/api/block').then(response => response.data),
    search: value => axios.get(`/api/block/${value}`).then(response => response.data)
  }
}
