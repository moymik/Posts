import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <AppBar 
        position = "fixed"
        sx = {{height:"8vh"}}
    >
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/posts");
          }}
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}
