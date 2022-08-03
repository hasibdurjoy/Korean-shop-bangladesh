import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  carouselTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "50px",
    marginBottom: "15px",
  },

  displayFlex: {
    display: "flex",
    alignItems: "center",
  },

  productCardRoot: {
    backgroundColor: "white",
    textAlign: "center",
    marginRight: "20px",
    padding: "10px 0",
    cursor: "pointer",
  },

  offCardRoot: {
    display: "inline-block",
    padding: "3px",
    fontSize: "11px",
    borderRadius: "0 50em 50em 0",
    color: "red",
    fontWeight: 600,
    lineHeight: "26px",
    position: "absolute",
    background: "#fff",
    zIndex: 1,
    top: "40px",
    boxShadow:
      "2px 1px 6px 2px rgba(0,0,0,.1),0 4px 4px 0 rgba(0,0,0,.06)!important",
  },

  offPercentButton: {
    height: "30px",
    width: "30px",
    backgroundColor: "red",
    color: "#fff",
    display: "inline-block",
    borderRadius: "50%",
    textAlign: "center",
    marginLeft: "10px",
  },

  productImage: {
    height: "300px",
    padding: "5px",
    borderRadius: "20px",
  },
}));

export default useStyles;
