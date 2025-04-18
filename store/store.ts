import {create} from 'zustand';
export const userStore = create((set) => ({
    sidebarOpen: true,
    setSidebarOpen: () => set((state:any) => ({sidebarOpen: false}))
}))