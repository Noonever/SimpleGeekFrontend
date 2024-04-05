import { TextField } from "@mui/material";

interface BaseInputProps {
    type?: string,
    label?: string,
    autoComplete?: string,
    autoFocus?: boolean,
    placeholder?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage: string | null,
}

export const BaseInput = ({ type, label, autoComplete, autoFocus, placeholder, value, onChange, errorMessage }: BaseInputProps) => {

    return (
        <TextField
            type={type}
            label={label}
            value={value}
            onChange={onChange}
            helperText={errorMessage}
            required={true}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            InputProps={{
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