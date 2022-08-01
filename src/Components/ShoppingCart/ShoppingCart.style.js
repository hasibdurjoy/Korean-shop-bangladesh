import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "370px",
    maxWidth: "450px",
    color: "#ffcc00",
    backgroundColor: "red",
    "& .MuiFormHelperText-root": {},
  },
  card: {
    borderRadius: "10px",
    color: "black",
  },
  cardContent: {
    backgroundColor: "red",
    padding: "30px",
  },
}));

export default useStyles;
