import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";


export async function GET(request: Request) {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.redirectUri,
  });

  return redirect(authUrl);
}
