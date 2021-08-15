import Validator from 'validator';
import { isEmpty, isEqual } from 'lodash';

export const isFieldValid = (field, value, validation, errors, setErrors) => {
  const data = { [field]: value };
  const fieldError = validation(data);
  const formErrors = {...errors, ...fieldError};
  if(isEmpty(fieldError)) {
    delete formErrors[field];
  }

  if (isEmpty(formErrors)) {
    const newErrors = { ...errors };
    for (const field in data) {
      delete newErrors[field];
    }
    if (!isEqual(errors, newErrors)) {
      setErrors(newErrors);
    }
    return true;
  }

  if (!isEqual(errors, formErrors)) {
    setErrors(formErrors);
  }
  return false;
};

export const isFormValid = (data, validation, errors, setErrors) => {
  const formErrors = validation(data);
  if (isEmpty(formErrors)) {
    const newErrors = { ...errors };
    for (const field in data) {
      delete newErrors[field];
    }
    if (!isEqual(errors, newErrors)) {
      setErrors(newErrors);
    }
    return true;
  }

  if (!isEqual(errors, formErrors)) {
    setErrors(formErrors);
  }
  return false;
};

export const userValidation = (data) => {
  const errors = {};

  if ('name' in data) {
    data.name = !isEmpty(data.name) ? data.name : '';
    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
    }
  }

  if ('boid' in data) {
    data.boid = !isEmpty(data.boid) ? data.boid : '';
    if (Validator.isEmpty(data.boid)) {
      errors.boid = 'BOID field is required';
    }
    if (!Validator.isNumeric(data.boid)) {
      errors.boid = 'BOID field should be numbers only';
    }
    if (!Validator.isLength(data.boid, {min:16, max: 16})) {
      errors.boid = 'BOID should be 16 digit';
    }
  }

  return errors;
};

export const checkValidation = (data) => {
  const errors = {};

  if ('companyShareId' in data) {
    data.companyShareId = data.companyShareId.toString();
    data.companyShareId = !isEmpty(data.companyShareId) ? data.companyShareId : '';
    if (Validator.isEmpty(data.companyShareId)) {
      errors.companyShareId = 'Server busy, try again later';
    }
  }

  if ('boid' in data) {
    data.boid = data.boid.toString();
    data.boid = !isEmpty(data.boid) ? data.boid : '';
    console.log('------>', data, data.boid, Validator.isNumeric(data.boid));
    if (Validator.isEmpty(data.boid)) {
      errors.boid = 'BOID field is required, create from settings.';
    }
    if (!Validator.isNumeric(data.boid)) {
      errors.boid = 'BOID field should be numbers only';
    }
  }

  return errors;
};
