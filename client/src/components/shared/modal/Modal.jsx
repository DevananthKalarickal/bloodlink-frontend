import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status set to "pending"
  const { user } = useSelector((state) => state.auth);

  // Handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity || !location || !status) {
        return alert("Please provide all fields.");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        status,
        quantity,
        location,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      console.log(error);
      window.location.reload();
    }
  };

  // Effect to update status when inventory type is changed
  useEffect(() => {
    if (inventoryType === "in") {
      setStatus("Pending"); // Set "pending" when Donate (in) is selected
    }
  }, [inventoryType]);

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content border-0 shadow-lg rounded-3">
            <div className="modal-header bg-danger text-white">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Blood Type: &nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value="in"
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="in" className="form-check-label">
                    Donate
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    value="out"
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="out" className="form-check-label">
                    Request
                  </label>
                </div>
              </div>
              <select
                className="form-select border-danger mb-3"
                aria-label="Select Blood Group"
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{
                  boxShadow: bloodGroup ? "none" : "0 0 5px rgba(255, 0, 0, 0.5)",
                }}
              >
                <option value="">Select Blood Group</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
              </select>
              <select
                className="form-select border-danger mb-3"
                aria-label="Select Status"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                style={{
                  boxShadow: status ? "none" : "0 0 5px rgba(255, 0, 0, 0.5)",
                }}
              >
                <option value="">Select Status</option>
                <option value="urgent">Urgent</option>
                <option value="normal">Normal</option>
                <option value="resolved">Resolved</option>
                <option value="Pending">Pending</option> {/* Added Pending as an option */}
              </select>
              <InputType
                labelText="Donor Email"
                labelFor="donorEmail"
                inputType="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                customStyle={{ borderColor: email ? "" : "red" }}
              />
              <InputType
                labelText="Quantity (ML)"
                labelFor="quantity"
                inputType="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                customStyle={{ borderColor: quantity ? "" : "red" }}
              />
              <InputType
                labelText="Location"
                labelFor="location"
                inputType="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                customStyle={{ borderColor: location ? "" : "red" }}
              />
            </div>
            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-outline-danger rounded-pill px-4 py-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill px-4 py-2 shadow-sm"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
