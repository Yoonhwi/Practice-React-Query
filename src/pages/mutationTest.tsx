import { Loader } from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
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
    mutationFn: (data: InputProps) => {
      return axios.post(`${URL}/Data`, data);
    },
  });

  return (
    <div>
      {mutation.isPending ? (
        /** isPending or ` status === 'pending' ` mutation이 현재 실행중 */
        <Loader />
      ) : (
        <>
          {mutation.isError
            ? /** isError or ` status === 'error' ` mutation에 에러가 발생*/
              console.log(`Error:${mutation.error.message}`)
            : /** mutation.status가 error일때 mutation의 error객체 사용가능  */
              null}
          {mutation.isSuccess
            ? /** isSuccess or ` status === 'success'`
          mutation은 성공적으로 완료되었으며, 데이터를 사용할 수 있다.
          */ (console.log("post success"),
              console.log("data:", mutation.data.data),
              mutation.reset())
            : /** mutation.status가 success 일때 mutation의 data객체 사용가능 */
              null}
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
        </>
      )}
    </div>
  );
}
