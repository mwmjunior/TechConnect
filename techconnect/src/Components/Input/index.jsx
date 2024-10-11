import React from "react";
import EyeOn from "@mui/icons-material/Visibility";
import EyeOff from "@mui/icons-material/VisibilityOff";

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  styles = "",
  children,
  required,
}) => {
  return (
    <div className={`mb-4 w-full flex flex-col items-center ${styles}`}>
      <div className="relative flex flex-col items-center">
        <label
          className="block text-sm text-black font-comfortaa mb-2"
          htmlFor={id}
          style={{ marginLeft: "27px", width: "100%" }}
        >
          {children}
        </label>

        <div
          className="relative w-[273px] h-[52px]"
          style={{
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            borderRadius: "10px",
          }}
        >
          <input
            className="w-full h-full bg-[#F5F0FA] text-gray-700 rounded-lg shadow-md focus:outline-none transition-all duration-200 pl-[5px]"
            id={id}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            style={{ paddingRight: "5px" }}
          />
        </div>
      </div>
    </div>
  );
};

export const InputLogin = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  styles = "",
  children,
  required,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className={`mb-8 ${styles}`}>
      <label htmlFor={id} className="text-gray-800 text-xs block mb-2">
        {children}
      </label>
      <div className="relative flex items-center">
        <input
          id={id}
          name={id}
          type={showPassword && type === "password" ? "text" : type}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full text-sm border-b border-gray-300 focus:border-gray-800 px-2 py-3 outline-none"
          placeholder={placeholder}
          style={{
            borderBottom: "1px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        />

        {type === "password" && setShowPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            style={{ marginRight: "15px" }}
          >
            {showPassword ? (
              <EyeOn className="h-5 w-5 text-gray-400" /> 
            ) : (
              <EyeOff className="h-5 w-5 text-gray-400" /> 
            )}
          </button>
        )}
      </div>
    </div>
  );
};