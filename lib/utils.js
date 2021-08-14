import axios from 'axios';

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

export const checkResult = (data, callback) => {
  axios({
    method: 'post',
    url: 'https://iporesult.cdsc.com.np/result/result/check',
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
  .then((res) => {
    if (res.data && res.status === 200) {
      callback(res.data.message);
    }
  })
  .catch((err) => {
    console.log(err);
    callback('Something went wrong, try again later');
  });
};