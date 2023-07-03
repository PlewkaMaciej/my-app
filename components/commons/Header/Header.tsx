import { useMediaQuery } from "@mui/material";
import { DesktopHeader } from "./DesktopHeader/DesktopHeader";
import { MobileHeader } from "./MobileHeader/MobileHeader";
import { theme } from "@/pages/_app";

export const Header = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down(1300));

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};
