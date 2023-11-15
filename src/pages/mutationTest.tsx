import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
interface inputProps {
  title: string;
  content: string;
}

const URL = "http://localhost:5000/Data";

export default function MutationTest() {
  const [input, setInput] = useState<inputProps>({ title: "", content: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const mutation = useMutation<void, Error, inputProps>(
    async (data: inputProps) => {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
    },
    {
      onSuccess: () => {
        // 성공 시 수행할 작업
        console.log("Data submitted successfully");
        // 여기에 추가적으로 원하는 동작을 수행할 수 있습니다.
      },
    }
  );

  const onClickSubmit = () => {
    console.log(input);
  };
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
      <button onClick={() => onClickSubmit()}>전송</button>
    </div>
  );
}
