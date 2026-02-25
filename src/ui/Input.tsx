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
  placeholder,
  value,
  onChange,
  isPassword = false,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col mb-4 relative bg-slate-50">
      <label className="mb-1 text-gray-700 bg-slate-50">{label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={loading}
        className={`bg-slate-50 border border-gray-300 rounded-md py-2 px-3 pr-${isPassword ? '10' : '2'} focus:outline-none focus:ring-2 focus:ring-blue-500 w-full`}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading} 
          className="absolute right-3 top-[38px] text-gray-500 hover:text-black transition disabled:opacity-50"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
