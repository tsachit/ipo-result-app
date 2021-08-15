import axios from 'axios';
import parallel from 'async/parallel';

export const fetchCompanies = (callback) => {
  axios
    .get('https://iporesult.cdsc.com.np/result/companyShares/fileUploaded')
    .then((res) => {
      if(res.status === 200) {
        callback(res.data.body)
      }
    })
    .catch((err) => console.log(err));
};


const checkAxiosConfig = (companyShareId, boid) => ({
  method: 'post',
  url: 'https://iporesult.cdsc.com.np/result/result/check',
  headers: {
    'Content-Type': 'application/json',
  },
  data: JSON.stringify({companyShareId, boid})
});


export const checkResult = async (companyShareId, users, setResult) => {
  const requests = users.map(user => 
    axios(checkAxiosConfig(companyShareId, user.boid))
    .then((res) => {
      if (res.data && res.status === 200) {
        return {...user, message: res.data.message };
      }
    })
    .catch((err) => {
      return {...user, message: 'Invalid BOID number, result not found' }
    })
  );
  axios.all(requests)
    .then((responses) => {
      setResult(responses);
    })
    .catch(errors => {
      console.log(errors);
    });
};
