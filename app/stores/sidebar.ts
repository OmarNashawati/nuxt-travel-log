import type { MapPoint } from "~/lib/types";

// eslint-disable-next-line ts/consistent-type-definitions
export type SidebarItem = {
  id: string;
  label: string;
  icon:string;
  href: string;
  location?: MapPoint | null ;
}

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([])
  const loading = ref(false)


  return {
    sidebarItems,
    loading
  }
}) 