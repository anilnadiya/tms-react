import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountryList } from '../redux/Thunk/ClientModule/ClientThunk';
import PhoneInput from 'react-country-phone-input';


const PhoneNumberInput = () => {
  const { country } = useSelector((state) => state.root.ClientModule);
  console.log('country: ', country);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CountryList());
  }, [dispatch]);
  const [phone, setPhone] = useState('');

  return (
        <PhoneInput
        value={phone}
        onChange={(phone) => setPhone(phone)}
        />
  );
};

export default PhoneNumberInput;
