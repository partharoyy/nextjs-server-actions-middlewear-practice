'use client';

import CommonFormElement from '@/components/common-form-element';
import { signUpFormControls, signUpInitialFormData } from '../utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { userSignupAction } from '@/actions';

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState(signUpInitialFormData);

  const router = useRouter();

  const signUpButtonActive = () => {
    return Object.keys(signUpFormData).every((key) => signUpFormData[key].trim() !== '');
  };

  const handleSignUpAction = async () => {
    const userData = await userSignupAction(signUpFormData);

    if (userData?.data) router.push('/sign-in');

    console.log(userData?.data);
  };

  return (
    <div>
      <h1>Signup</h1>
      <form action={handleSignUpAction}>
        {signUpFormControls.map((item) => (
          <div key={item.name}>
            <label>{item.label}</label>
            <CommonFormElement
              currentItem={item}
              type={item.type}
              name={item.name}
              label={item.label}
              value={signUpFormData[item.name]}
              onChange={(e) =>
                setSignUpFormData((prevData) => ({
                  ...prevData,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
        ))}
        <Button type='submit' disabled={!signUpButtonActive()} className='disabled:opacity-60'>
          SignUp
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
