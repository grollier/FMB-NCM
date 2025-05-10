import DashboardClient from "@/components/admin/dashboard/dahboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/app/lib/dal";

export default async function Dashboard() {
    const sessionToken = (await cookies()).get("session")?.value

    if (!sessionToken){
        redirect("/auth/login");
    }

    const session = await verifySession(sessionToken)

    if (!session) {
        redirect("/auth/login");
    }

    return <DashboardClient/>;
}