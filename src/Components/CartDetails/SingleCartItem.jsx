import { Button, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { Trash } from "phosphor-react";

const SingleCartItem = ({ item, handleRemove }) => {
  const [quantity, setQuantity] = useState(item.orderQuantity);
  return (
    <TableRow>
      <TableCell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
            <img
              src={item.img}
              alt=""
              style={{ height: "80px", width: "80px" }}
            />
          </div>
          <h6>{item.title}</h6>
        </div>
      </TableCell>
      <TableCell>
        <h6>{item.discountPrice}</h6>
      </TableCell>
      <TableCell>
        <h6>0</h6>
      </TableCell>
      <TableCell>
        <h6>
          <Button
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
            }}
          >
            -
          </Button>
          {quantity}
          <Button
            onClick={() => {
              quantity < 5 && setQuantity(quantity + 1);
            }}
          >
            +
          </Button>
        </h6>
      </TableCell>
      <TableCell>
        <h6>{quantity * parseInt(item.discountPrice)}</h6>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          onClick={() => {
            handleRemove(item.id);
          }}
        >
          <Trash size={32} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SingleCartItem;
