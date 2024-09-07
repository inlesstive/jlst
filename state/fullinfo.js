import { defineStore } from 'pinia'
import axios from 'axios'


export const useCounterStore = defineStore('fullinfo', () => {
    const data = ref()
    function fetchData() {
        axios.get('https://strapi.cap.obet-hg.ru/api/info?populate=*', {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer b925908d3f7a605e39b3c0b4b7207c4bba78a999689b22577cff87bc18d56dca94605d4bb30c7858f9800502b3f796645c2e356f414b3f1b9ad657d19a1f7588146aacdc9d656c4640a6f744b16c53a09c0bddf8a2cc8075a536277be7427fce2235816cea4fdf29ea68b494331f5a2bfd3b3bf4a23dc7de62c0570c5b161ee3'
            }
          })
          .then(response => {
            console.log(response.data.data.attributes);
            data.value = response.data.data.attributes
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  
    return { data, fetchData }
  })