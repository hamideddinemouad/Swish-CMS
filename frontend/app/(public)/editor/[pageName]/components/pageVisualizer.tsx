

// import Home from "@/app/(tenant)/tenant/page";
// import axios from "axios";
// import { env } from "@/lib/env";
// import { cookies, headers } from "next/headers";
// import { NextRequest } from "next/server";

// export type AccessPayload = {
//   sub: string;
//   email: string;
//   tenantId: string ;
//   tenantSubdomain: string;
//   type: 'access';
// };
// export default async function PageVisualizer({ }) {
//     const header = await headers();
//     const accessToken = (await cookies()).get("accessToken")?.value;
//     const res = await axios.get<AccessPayload>(`${env.API}/auth/me`, { headers: { Cookie: `accessToken=${accessToken}` } });
//     const sub = res.data.tenantSubdomain
    
//     return <div> <Home subdomain={sub}/>  PageVisualizer</div>
// }