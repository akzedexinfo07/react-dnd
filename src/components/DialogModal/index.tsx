import { useState } from "react";

type MyDialogProps = {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>; // Use MutableRefObject
};

const MyDialog: React.FC<MyDialogProps> = ({ dialogRef }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here (e.g., send data to server)
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setFormData({ name: "", email: "" });
  };

  return (
    <dialog ref={dialogRef} className="dialogEl p-4 rounded-xl">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <button onClick={handleSubmit} className="bg-blue-300 p-2 rounded">
          Submit
        </button>
      </div>
    </dialog>
  );
};

export default MyDialog;
