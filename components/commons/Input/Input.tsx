import {
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface CustomTextFieldProps {
  label: string;
  error: string;
  isError: boolean;
  type?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CustomTextField = ({
  label,
  error,
  isError,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  ...rest
}: CustomTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#888888",
            },
          },
          "& .MuiFormLabel-root": {
            "&.Mui-focused": {
              color: "#888888",
            },
          },
        }}
        label={capitalizeFirstLetter(label)}
        name={name}
        error={isError}
        type={showPassword ? "text" : type}
        InputProps={
          type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleClickShowPassword}>
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />
      {isError && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};
