import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { base64Converter } from "./base64Converter";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const useForm = <T>(initState: T, callback: () => void) => {
  const [inputs, setInputs] = useState<T>(initState);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    callback();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    e.persist();
    if (e.target.type === "file") {
      const files = (e.target as HTMLInputElement).files;
      if (files)
        base64Converter(files[0]).then((result) => {
          setInputs((inputs) => ({ ...inputs, [e.target.name]: result }));
        });
    } else {
      setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
    }
  };

  return { handleChange, handleSubmit, inputs };
};

export default useForm;
