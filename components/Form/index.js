import AddForm from "../AddForm";
import UpdateForm from "../UpdateForm";
import { useSelector } from "react-redux";
import { useReducer } from "react";

const Form = () => {
  const dataCollect = (state, e) => {
    return {
      ...state,
      [e.target.name]: e.target.value,
    };
  };
  const [formData, setFormData] = useReducer(dataCollect, {});

  const formId = useSelector((state) => state.app.client.formId);
  return (
    <div className={`bg-white w-full py-5`}>
      {formId
        ? UpdateForm({ formData, setFormData, formId })
        : AddForm({ formData, setFormData })}
    </div>
  );
};

export default Form;
