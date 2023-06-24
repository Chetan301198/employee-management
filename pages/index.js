import { useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import Form from "../components/Form";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "../redux/reducer";
export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm);

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(toggleChangeAction());
  };
  return (
    <section className="container mx-auto py-5">
      <h1 className="text-xl md:text-5xl text-center font-bold py-10">
        Employee Management
      </h1>
      <div className="flex justify-between py-5 border-b">
        <div className="left flex gap-3">
          <button
            onClick={handleAdd}
            className="flex bg-blue-500 py-2 px-4 border rounded-md text-white hover:bg-gray-50 hover:text-blue-500 hover:border-blue-500"
          >
            <HiUserAdd size={25} className="mr-2" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
      {visible && <Form />}
      <Table />
    </section>
  );
}
