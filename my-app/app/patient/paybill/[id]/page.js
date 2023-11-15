"use client";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  // const { data } = router.query.state;
  console.log(router);
  return <div>My Post: {params.id}</div>;
}
