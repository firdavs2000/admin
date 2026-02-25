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
    <div className="relative w-full mb-6">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        disabled={loading}
        className={`peer block w-full rounded-md border border-gray-300 bg-white py-3 px-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:opacity-50`}
      />
      <label
        className="absolute left-3 top-3 text-gray-400 text-sm transition-all 
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:top-[-6px] peer-focus:text-blue-500 peer-focus:text-sm bg-white px-1"
      >
        {label}
      </label>

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
  );
};

export default Input;
