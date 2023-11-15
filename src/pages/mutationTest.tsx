import {
  MutationFunction,
  useMutation,
  UseBaseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
interface InputProps {
  title: string;
  content: string;
}

const URL = "http://localhost:5000";

export default function MutationTest() {
  const [input, setInput] = useState<InputProps>({ title: "", content: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: (testData: InputProps) => {
      return axios.post(`${URL}/Data`, testData);
    },
  });

  // const postData = () => {
  //   try {
  //     const response = fetch(URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(input),
  //     }).then((res) => res.json());

  //     return response;
  //   } catch (error) {
  //     throw new Error("Error Fetch Post !!");
  //   }
  // };

  return (
    <div>
      <input
        placeholder="title"
        name="title"
        onChange={handleInputChange}
        value={input.title}
      />
      <input
        placeholder="content"
        name="content"
        onChange={handleInputChange}
        value={input.content}
      />
      <button
        onClick={() => {
          mutation.mutate(input);
        }}
      >
        전송
      </button>
    </div>
  );
}
