import { useState } from "react";
import api from "../api/axiosConfig";
import CustomerList from "./CustomerList";

const CustomerComponent = ({ load, customers }) => {

    const [id, setId] = useState("");
  const [identityRef, setIdentityRef] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");


  const save = async (event) => {
    event.preventDefault();

    if (id) {
      await api.put(`/update/${identityRef}`, {
        firstname,
        lastname,
        identityRef,
        username,
      });
    } else {
      await api.post("/create", {
        firstname,
        lastname,
        identityRef,
        username,
      });
    }

    alert("Customer Record Saved");


    setId("");
    setFirstname("");
    setLastname("");
    setIdentityRef("");
    setUsername("");
    load();
  };


  const editCustomer = (customer) => {
    setFirstname(customer.firstname);
    setLastname(customer.lastname);
    setIdentityRef(customer.identityRef);
    setUsername(customer.username);
    setId(customer.id);
  };


  const deleteCustomer = async (id) => {
    await api.delete(`/delete/${id}`);
    alert("Customer Details Deleted Successfully");
    load();
  };


  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <input
            type="hidden"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label>Lastname</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Firstname</label>
          <input
            type="text"
            className="form-control"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-4">
            <label>Identity Ref</label>
            <input
              type="text"
              className="form-control"
              value={identityRef}
              onChange={(e) => setIdentityRef(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-4">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              placeholder="Customer Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary m-4" onClick={save}>
          Save
        </button>
      </form>

      <CustomerList
        customers={customers}
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer}
      />
    </div>
  );
};

export default CustomerComponent;
