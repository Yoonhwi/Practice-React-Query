import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
const URL = "https://jsonplaceholder.typicode.com/todos/1";

export default function Home() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => fetch(URL).then((res) => res.json()),
    staleTime: 3000,
  });

  return (
    <>
      <div>Home Page</div>
      <button onClick={() => router.push(`/test`)}>go Test</button>
    </>
  );
}
