import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
const URL = "https://jsonplaceholder.typicode.com/todos/1";

export default function Test() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => fetch(URL).then((res) => res.json()),
    staleTime: 3000, //같은 queryKey로 요청을 보내는 경우, staleTime 동안 캐싱상태로 유지
    //동일한 네트워크요청을 막음!
  });

  console.log(data);

  return (
    <>
      <div>Test Page</div>
      <button onClick={() => router.push(`/`)}>go Home</button>
    </>
  );
}
