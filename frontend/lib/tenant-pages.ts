import axios from "axios";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";

export function isAxiosNotFound(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export async function fetchTenantPage<T>(subdomain: string | null, pageName: string) {
  if (!subdomain) {
    notFound();
  }

  try {
    const response = await axios.get<T>(`${env.API}/pages/${subdomain}/${pageName}`);
    return response.data;
  } catch (error) {
    if (isAxiosNotFound(error)) {
      notFound();
    }

    throw error;
  }
}
