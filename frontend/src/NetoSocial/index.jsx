import AuthenticationForm from "./AuthenticationForm";
import { Box } from "@mui/material";

const NetoSocial = () => {
  const infoSection = (
    <section className="info-section">
      <Box
      className="info-section__box"
        sx={{
          width: "75%",
          height: 300,
          backgroundColor: "#d3dae9",
        }}
      >
        <h1>Neto Social</h1>
        <h4>Facebook and VK killer.</h4>
      </Box>
    </section>
  );

  return (
    <div className="neto-social">
      <header className="neto-social__header">
        <h3>Neto Social</h3>
        <AuthenticationForm />
      </header>

      {infoSection}
    </div>
  );
};

export default NetoSocial;
