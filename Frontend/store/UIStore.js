import { create } from "zustand";
import { devtools } from 'zustand/middleware';


export const useUIStore = create(
    devtools(
        (set, get) => ({
            activeTab: "Home",

            setActiveTab: (activeTab) => set({activeTab})
        }),
        {
            name: "ui-store"
        }
    )
)
