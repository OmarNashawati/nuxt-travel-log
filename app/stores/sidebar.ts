// eslint-disable-next-line ts/consistent-type-definitions
export type SidebarItem = {
  id: string;
  label: string;
  icon:string;
  href: string;
}

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([])
  const loading = ref(false)


  return {
    sidebarItems,
    loading
  }
}) 