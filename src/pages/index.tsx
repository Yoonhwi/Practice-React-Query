import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
const URL = "http://localhost:5000/Data";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const data = fetch(URL).then((res) => res.json());
    console.log(data);
  }, []);

  return (
    <>
      <div>Home Page</div>
      <button onClick={() => router.push(`/test`)}>go Test</button>
    </>
  );
}
