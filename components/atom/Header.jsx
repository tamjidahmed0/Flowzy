'use client'
import React, { useEffect } from 'react'
import { FileDown, FileUp, RotateCcw, Play, Menu } from 'lucide-react'
import { useFlowStore } from '@/store/useFlowStore';
import { NodeMetaData } from '@/data/NodeMetaData';
import RunFlow from '@/lib/RunFlow';



const Header = () => {
  const clearAll = useFlowStore((state) => state.clearAll);
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);

  const setFlow = useFlowStore((state) => state.setFlow);









  const importFlowFromJSON = async (file) => {
    const text = await file.text();
    const { nodes, edges } = JSON.parse(text);
    if (!nodes && !edges) return console.log('invalid json')

    const newNodes = await Promise.all(
      nodes.map((node) => NodeMetaData(node))
    );



    console.log(newNodes, 'newnodes')


    setFlow(newNodes, edges);
  };



  const exportFlowToJSON = (nodes, edges) => {
    const cleanedNodes = nodes.map(({ icon, color, ...rest }) => rest);
    const flowData = {
      nodes: cleanedNodes,
      edges,
    };


    const json = JSON.stringify(flowData, null, 2); // pretty print
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow.json';
    a.click();

    URL.revokeObjectURL(url);
  };




  const handleRunFlow = async() =>{

    const result = await RunFlow({nodes: nodes, edges: edges})

    console.log(nodes, edges)

    console.log(await result)
    console.log('run')



  }






  return (
    <header className=" text-white border-b border-gray-200 md:py-5 md:px-10 py-2 px-5 flex justify-between items-center">

      <div className='flex items-center gap-2'>

        <div className="lg:hidden md:block w-5 h-5 md:w-6 md:h-6 text-black">
          <Menu className="w-full h-full" />
        </div>
        <h1 className="text-[15px] md:text-2xl text-black font-bold">Flowzy</h1>
      </div>


      <div className="mt-2 flex md:gap-4 gap-2">


        <label
          htmlFor="file-input"
          className="border text-black font-semibold border-gray-300 rounded-md md:px-4 md:py-2 px-2 py-1 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 cursor-pointer transition-all duration-200"
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            <FileDown className="w-full h-full" />
          </div>
          <span className="md:flex hidden">Import</span>
        </label>

        <input
          id="file-input"
          type="file"
          accept="application/json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // handle file here, e.g. importFlowFromJSON(file)
              console.log(file);
              importFlowFromJSON(file)
              e.target.value = "";
            }
          }}
          className="hidden"
        />




        <button
          onClick={() => exportFlowToJSON(nodes, edges)}
          disabled={nodes.length === 0}
          className={`border text-black font-semibold border-gray-300 rounded-md md:px-4 md:py-2 px-2 py-1 flex items-center gap-2 transition-all duration-200
          ${nodes.length === 0
              ? 'opacity-50 pointer-events-none'
              : 'hover:bg-green-50 hover:border-green-200 hover:text-green-700 cursor-pointer'}`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            <FileUp className="w-full h-full" />
          </div>
          <span className="md:flex hidden">Export</span>
        </button>






        <button
          onClick={() => clearAll()}
          disabled={nodes.length === 0}
          className={`border text-black font-semibold border-gray-300 rounded-md md:px-4 md:py-2 px-2 py-1 flex items-center gap-2 transition-all duration-200
          ${nodes.length === 0 ? 'pointer-events-none opacity-50' : 'hover:bg-red-50 hover:border-red-200 hover:text-red-700'}`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6 ">
            <RotateCcw className="w-full h-full" />
          </div>
          <span className='md:flex hidden'>Clear All</span>
        </button>


        <button
        onClick={handleRunFlow}

          disabled={nodes.length === 0}
          className={`font-semibold border-gray-300 rounded-md md:px-4 md:py-2 px-2 py-1 flex items-center bg-gradient-to-r from-green-500 to-green-600 transition-all duration-200 ${nodes.length === 0
            ? 'opacity-50 pointer-events-none'
            : 'hover:from-green-600 hover:to-green-700 cursor-pointer'}`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            <Play className="w-full h-full text-white" />
          </div>
          <span className="md:flex hidden text-white">Run Flow</span>
        </button>




      </div>
    </header>
  )
}

export default Header