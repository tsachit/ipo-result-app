import axios from 'axios';
import waterfall from 'async/waterfall';

export const fetchCompanies = (callback) => {
  axios
    .get('https://iporesult.cdsc.com.np/result/companyShares/fileUploaded')
    .then((res) => {
      if(res.status === 200) {
        callback(res.data.body);
      }
    })
    .catch((err) => console.log(err));
};

export const regenerateCaptcha = async captchaIdentifier => {
  const response = await axios({
    method: 'post',
    url: `https://iporesult.cdsc.com.np/result/captcha/reload/${captchaIdentifier}`,
    headers: { }
  });

  return response?.data?.body;
};

export const decodeCaptcha = async captcha => {
  const response = await axios({
    method: 'post',
    url: 'https://sachit-app-server.herokuapp.com/captcha/base64decode',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ captcha })
  });

  return response?.data?.code;
};

// const fetchCaptcha = async (companyShareId, boid, retries = 3) => {
//   try {
//     const { captchaIdentifier, captcha } = await regenerateCaptcha(`${companyShareId}_${boid}`);
//     const userCaptcha = await decodeCaptcha(captcha);
//   } catch (error) {
//     awa
//   }
// };

const checkAxiosConfig = async (companyShareId, boid) => {
  const { captchaIdentifier, captcha } = await regenerateCaptcha(`${companyShareId}_${boid}`);
  const userCaptcha = await decodeCaptcha(captcha);

  return {
    method: 'post',
    url: 'https://iporesult.cdsc.com.np/result/result/check',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({companyShareId, boid, captchaIdentifier, userCaptcha})
  };
};

const checkSingleResult = async (index, newUsers, companyShareId, setResult, callback) => {
  const user = newUsers[index];
  const configs = await checkAxiosConfig(companyShareId, user.boid);
  axios(configs)
  .then((res) => {
    if (res.data && res.status === 200) {
      const message = res.data.message === 'Invalid Captcha Provided. Please try again' ? 'Server busy. Please check later' : res.data.message;
      newUsers[index] = {...user, message};
      setResult(newUsers.filter(user => user.message));
      callback();
    }
  })
  .catch((err) => {
    newUsers[index] = {...user, message: 'Invalid BOID number, result not found' };
    setResult(newUsers.filter(user => user.message));
    callback();
  });
};

export const checkResult = async (companyShareId, users, setResult) => {
  const newUsers = [...users];
  waterfall(newUsers.map((_, index) => (callback) => checkSingleResult(index, newUsers, companyShareId, setResult, callback)));
};
