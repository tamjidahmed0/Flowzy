import { create } from "zustand";


export const useResponse = create((set)=> ({

    result : {},

    setResult : (data) =>
     set(()=>({
        result : data
     }))

}))