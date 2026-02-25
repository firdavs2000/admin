import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean; // boolean qilish yaxshiroq
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled, loading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full p-2 border-2 text-white rounded-lg transition
                  bg-gradient-to-r from-purple-500 to-blue-500
                  hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                  flex justify-center items-center`}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
         
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
