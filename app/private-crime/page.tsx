import { redirect } from "next/navigation";

// Canonical redirect (avoid duplicate indexable content)
export default function Page() {
  redirect("/privatecrime");
}
