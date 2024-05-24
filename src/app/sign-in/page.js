'use client';

import CommonFormElement from '@/components/common-form-element';
import { signInFormControls, signInInitialFormData } from '../utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { userSignInAction } from '@/actions';

function SignIn() {
  const [signInFormData, setSignInFormData] = useState(signInInitialFormData);
  const router = useRouter();

  async function handleSignInAction() {
    const result = await userSignInAction(signInFormData);
    console.log(result);
    if (result?.success) router.push('/');
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form action={handleSignInAction}>
        {signInFormControls.map((item) => (
          <div key={item.name}>
            <div>{item.label}</div>
            <CommonFormElement
              currentItem={item}
              value={signInFormData[item.name]}
              onChange={(e) =>
                setSignInFormData((prevData) => ({
                  ...prevData,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
        ))}
        <Button type='submit'>Sign In</Button>
      </form>
    </div>
  );
}

export default SignIn;
