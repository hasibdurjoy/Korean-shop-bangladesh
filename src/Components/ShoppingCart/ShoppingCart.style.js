import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "370px",
    maxWidth: "450px",
    color: "#ffcc00",
  },
  card: {
    borderRadius: "10px",
    color: "black",
    backgroundColor: "black",
    height: "80vh",
    padding: "20px 0px",
    overflowY: "auto",
  },
  cardContent: {
    padding: "30px",
  },
}));

export default useStyles;
