import axios from 'axios';
import parallel from 'async/parallel';

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


export const checkResult = async (companyShareId, users, setResult) => {
  const requests = await users.map(async user => {
    const configs = await checkAxiosConfig(companyShareId, user.boid);
    return await axios(configs)
    .then((res) => {
      if (res.data && res.status === 200) {
        return {...user, message: res.data.message };
      }
    })
    .catch((err) => {
      return {...user, message: 'Invalid BOID number, result not found' };
    });
  });

  axios.all(requests)
    .then((responses) => {
      setResult(responses);
    })
    .catch(errors => {
      console.log(errors);
    });
};
