import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  loading?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  isPassword = false,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full mb-6">
      <label className="block mb-2 text-gray-700 font-medium bg-white px-1">
  {label}
</label>

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={loading}
          placeholder=""
          className={'peer block w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50'}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
           className="absolute right-3 top-3 text-gray-500 hover:text-black transition disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
