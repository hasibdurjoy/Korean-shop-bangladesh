import { Card } from "@material-ui/core";
import { Button, CardContent, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { postFunction } from "../../Api/CallApis";
import useAuth from "../../hooks/useAuth";
import { clearTheCart } from "../../Utilities/FakeDatabase";
import MessageModal from "../Shared/MessageModal/MessageModal";

const ConfirmOrderModal = ({
  cart,
  subtotal,
  handleConfirmOrderClose,
  handleConfirmOrderOpen,
}) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [modalText, setModalText] = useState("");
  const [open, setOpen] = useState(false);
  const handleSuccessModalOpen = (text) => {
    setModalText(text);
    setOpen(true);
  };

  const onSubmit = (data) => {
    const booking = {
      userId: user.uid,
      displayName: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      products: cart,
      totalPrice: subtotal,
      status: "pending",
    };
    handleConfirmOrderClose();

    Swal.fire({
      title: "Do you want to confirm orders",
      showDenyButton: true,
      confirmButtonText: "Yes Confirm Order",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await postFunction(
            "https://dry-tundra-71318.herokuapp.com/orders",
            booking
          );
          if (res.status === 200 || 201) {
            handleConfirmOrderClose();
            clearTheCart();
            handleSuccessModalOpen("Booked Successfully");
            Swal.fire("Thank you!", "Successfully placed Order!", "success");
            reset();
          }
        } catch (error) {
          console.log(error);
        }
      } else if (result.isDenied) {
        handleConfirmOrderOpen();
      }
    });
  };

  return (
    <div>
      <Card style={{ width: "500px" }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              label="name"
              id="outlined-basic"
              type="texts"
              variant="outlined"
              value={user.displayName}
              sx={{ width: "100%", backgroundColor: "white", mb: 1 }}
            />

            <TextField
              {...register("email")}
              label="E-mail"
              id="outlined-basic"
              type="texts"
              variant="outlined"
              value={user.email}
              sx={{ width: "100%", backgroundColor: "white", mb: 1 }}
            />

            <TextField
              {...register("address")}
              required
              label="Address"
              id="outlined-basic"
              type="texts"
              variant="outlined"
              sx={{ width: "100%", backgroundColor: "white", mb: 1 }}
            />

            <TextField
              {...register("phone")}
              required
              label="Phone"
              id="outlined-basic"
              type="number"
              variant="outlined"
              sx={{ width: "100%", backgroundColor: "white", mb: 1 }}
            />

            {/* <TextField
              {...register("productName")}
              value={product.name}
              id="outlined-basic"
              type="texts"
              name="name"
              variant="outlined"
              sx={{ width: "100%", backgroundColor: "white", mb: 1 }}
            /> */}

            <TextField
              value={`$ ${subtotal}`}
              id="outlined-basic"
              type="texts"
              {...register("price")}
              variant="outlined"
              sx={{ width: "100%", backgroundColor: "white", mb: 1 }}
            />

            <Button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#F63E7B",
                padding: "10px",
              }}
              sx={{ my: 2, mx: "auto" }}
            >
              Confirm Order
            </Button>
          </form>
        </CardContent>
      </Card>
      <MessageModal
        open={open}
        setOpen={setOpen}
        modalText={modalText}
      ></MessageModal>
    </div>
  );
};

export default ConfirmOrderModal;
