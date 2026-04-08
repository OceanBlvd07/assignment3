import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ["/login", "/register", "/about"];

export default function RouteGuard({ children }) {
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const router = useRouter();

  async function updateAtom() {
    if (!isAuthenticated()) {
      return;
    }

    const favourites = await getFavourites();
    setFavouritesList(favourites);
  }

  useEffect(() => {
    updateAtom();

    const handleRouteChange = (url) => {
      const path = url.split("?")[0];

      if (PUBLIC_PATHS.includes(path)) {
        return;
      }

      if (!isAuthenticated()) {
        router.push("/login");
      }
    };

    handleRouteChange(router.pathname);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return <>{children}</>;
}
