import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import SpeedDial, { SpeedDialProps } from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { RiRobot2Line } from "react-icons/ri";
import ChatGptIcon from "./chatgptIcon";
import Draw from "./drawer";
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const actions = [
  { icon: <ChatGptIcon />, name: "GPT" },
  { icon: <SaveIcon />, name: "Save" },
];
type Anchor = "right";
export default function SupportChat() {
  const [direction, setDirection] =
    React.useState<SpeedDialProps["direction"]>("up");
  const [hidden, setHidden] = React.useState(false);

  const handleDirectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDirection(
      (event.target as HTMLInputElement).value as SpeedDialProps["direction"]
    );
  };

  const handleHiddenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHidden(event.target.checked);
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
      setHidden(!hidden);
    };
  const hanlderOnlickOpenDrawer = () => {};
  return (
    <>
      <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
        <Box sx={{ position: "relative", mt: 3, height: 320 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            hidden={hidden}
            icon={<RiRobot2Line />}
            direction={direction}
          >
            {actions.map((action) => (
              //   if (index == 0) {
              //     return (
              //       <>
              //         <SpeedDialAction
              //           key={action.name}
              //           icon={action.icon}
              //           tooltipTitle={action.name}
              //           onClick={toggleDrawer("right", true)}
              //         />
              //       </>
              //     );
              //   }

              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={
                  action.name == "GPT"
                    ? toggleDrawer("right", true)
                    : hanlderOnlickOpenDrawer
                }
              />
            ))}
          </StyledSpeedDial>
        </Box>
      </Box>
      <Draw toggleDrawer={toggleDrawer} state={state} />
    </>
  );
}
