import { create } from "zustand";


export const useNodeSettings = create((set) => ({


    nodeType: '',
    isNodeSettingOpen: false,


    setNodeType: (type) =>
        set(() => ({
            nodeType: type,
        })),


    setNodeSettingOpen: (value) =>
        set(() => ({

            isNodeSettingOpen: value

        }))




}))
