import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const URL = "http://localhost:5000/Data";

export default function Test() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => fetch(URL).then((res) => res.json()),
    staleTime: 3000,
    //staleTime 동안 캐싱상태로 유지
    //동일한 queryKey 의 네트워크요청을 막음!
    //캐시된 데이터를 사용하여 렌더링하며, 이는 빠른 응답 속도를 제공!
  });

  console.log(data);

  return (
    <>
      <div>Test Page</div>
      <button onClick={() => router.push(`/`)}>go Home</button>
    </>
  );
}
