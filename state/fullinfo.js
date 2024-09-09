import { defineStore } from 'pinia'
import axios from 'axios'


export const useCounterStore = defineStore('fullinfo', () => {
    const data = ref()
    const contact = ref()
    const contactList = ref()
    function fetchData() {

        axios.get('http://localhost:1337/api/info?populate=*', {
            headers: {
              'accept': 'application/json',
              'Authorization': 'Bearer e60a1d2503e9fa8d9a52cad281e713edf121b7533b0f33585e6269e044f6e6007ba541adea53e433058a8e78708cd6cd70a54f39aad43419387e57eb2b0937413d2d55db700efacf845179d62b91fead8b447478a61e26f51981b88e801a93d103819e53831b58e5946d35d7107af1b7a69cb7495b1604ee20ae7797f6c66f71'
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
    function getContactData() {

      axios.get('http://localhost:1337/api/contact?populate=*', {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer e60a1d2503e9fa8d9a52cad281e713edf121b7533b0f33585e6269e044f6e6007ba541adea53e433058a8e78708cd6cd70a54f39aad43419387e57eb2b0937413d2d55db700efacf845179d62b91fead8b447478a61e26f51981b88e801a93d103819e53831b58e5946d35d7107af1b7a69cb7495b1604ee20ae7797f6c66f71'
          }
        })
        .then(response => {
          console.log(response.data.data.attributes);
          contact.value = response.data.data.attributes
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }
  function getContactList() {

    axios.get('http://localhost:1337/api/contact-lists?populate=*', {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer e60a1d2503e9fa8d9a52cad281e713edf121b7533b0f33585e6269e044f6e6007ba541adea53e433058a8e78708cd6cd70a54f39aad43419387e57eb2b0937413d2d55db700efacf845179d62b91fead8b447478a61e26f51981b88e801a93d103819e53831b58e5946d35d7107af1b7a69cb7495b1604ee20ae7797f6c66f71'
        }
      })
      .then(response => {
        console.log(response.data.data.attributes);
        contactList.value = response.data.data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}


  
    return { data, contact, contactList, fetchData, getContactData, getContactList  }
  })