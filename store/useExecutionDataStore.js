// store/executionDataStore.js or .ts
import { create } from 'zustand';

const useExecutionDataStore = create((set, get) => ({
  executionData: {},

  pushNodeExecutionData: (nodeId, jsonData) => {
    const newEntry = {
      json: jsonData,
      headers: Object.keys(jsonData),
      timestamp: Date.now(),
    };

    set((state) => ({
      executionData: {
        ...state.executionData,
        [nodeId]: newEntry,
      },
    }));
  },

  getExecutionDataByNodeId: (nodeId) => get().executionData[nodeId],
}));

export default useExecutionDataStore;
