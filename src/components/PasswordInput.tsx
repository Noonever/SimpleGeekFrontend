import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

interface PasswordInputProps {
    password: string,
    handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage: string | null,
    autoFocus?: boolean,
    isNew?: boolean,
    confirmPassword?: boolean,
}

export const PasswordInput = ({ password, handlePassword, errorMessage, autoFocus, isNew, confirmPassword }: PasswordInputProps) => {
    
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={showPassword ? "text" : "password"}
            label={confirmPassword ? "Подтвердите пароль" : "Пароль"}
            autoComplete={isNew ? "new-password" : "current-password"}
            value={password}
            onChange={handlePassword}
            helperText={errorMessage}
            required={true}
            autoFocus={autoFocus}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
                sx: {
                    backgroundColor: errorMessage ? "rgba(255, 0, 0, 0.1)" : "transparent",
                }
            }}
            fullWidth
            sx={{
                minWidth: 412,
                ".MuiFormHelperText-root": {
                    color: "typography.attention",
                }
                
            }}
        />
    );
};