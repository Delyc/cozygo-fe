// pages/index.tsx

import React from 'react';
import FloatingLabelInput from '@/components/UI/Input';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <FloatingLabelInput
        id="email"
        label="Email"
      />
      <FloatingLabelInput
        id="password"
        label="Password"
        type="password"
      />
    </div>
  );
};

export default Login;
