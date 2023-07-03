import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  text: string;
}

export const CustomButton = ({
  text,
  disabled,
  ...rest
}: CustomButtonProps) => {
  return (
    <Button
      sx={{
        background: disabled
          ? "rgba(180, 180, 180, 0.5)"
          : "rgba(90, 127, 128, 1)",
        color: "#ffffff",
        width: "100%",
        mt: 2,
        "&:hover": {
          background: disabled
            ? "rgba(180, 180, 180, 0.5)"
            : "rgba(70, 107, 108, 1)",
        },
      }}
      disabled={disabled}
      {...rest}
    >
      {text}
    </Button>
  );
};
