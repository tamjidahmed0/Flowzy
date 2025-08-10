'use client'
import React, { useEffect, useState } from 'react'
import { FileDown, FileUp, RotateCcw, Play, Menu, Save, } from 'lucide-react'
import { useFlowStore } from '@/store/useFlowStore';
import { NodeMetaData } from '@/data/NodeMetaData';
import { useNodeSettings } from '@/store/useNodeSettings';
import RunFlow from '@/lib/RunFlow';
import { Toaster, toast } from 'sonner';
import { useResponse } from '@/store/useResponse';
import { useParams } from 'next/navigation';
import singleProject from '@/lib/singleProject';
import { useRouter } from 'next/navigation';
import updateProject from '@/lib/updateProject';


const Header = () => {
  const clearAll = useFlowStore((state) => state.clearAll);
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const setFlow = useFlowStore((state) => state.setFlow);

  const isOpen = useNodeSettings((s) => s.setNodeSettingOpen);

  const [loading, setLoading] = useState(false)

  const { setResult } = useResponse()

  const router = useRouter()


  const { project_id } = useParams()



  useEffect(() => {

    const fetchFlow = async () => {

      const flow = await singleProject({ project_id })
      console.log(flow, 'flow from getFlow')


      if (flow.status !== 404) {
        document.title = flow.name.length > 10
          ? flow.name.slice(0, 15) + '...'
          : flow.name;

        if ((flow.nodes && flow.edges) !== null) {
          const newNodes = await Promise.all(
            flow?.nodes.map((node) => NodeMetaData(node))
          );

          setFlow(newNodes, flow.edges);
        }


      } else {
        router.push('/projects')
      }





    }


    fetchFlow()


    return () => clearAll()



  }, [])









  const importFlowFromJSON = async (file) => {



    try {
      const text = await file.text();
      const { nodes, edges } = JSON.parse(text);
      if (!nodes && !edges) return toast.error('Invalid File!')

      const newNodes = await Promise.all(
        nodes.map((node) => NodeMetaData(node))
      );



      setFlow(newNodes, edges);
      isOpen(false)
      toast.success('Flowprint imported successfully')
    } catch (error) {
      toast.error('Something went wrong')
    }




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
    toast.success('Flowprint exported successfully')
  };




  const handleRunFlow = async () => {


    setLoading(true)

    try {
      const result = await RunFlow({ nodes: nodes, edges: edges })

      setResult(result)

      // console.log(result.executionStatus)
      if (result.success) {
        toast.success('Workflow executed successfully', {
          position: 'bottom-right'
        })
      } else {
        toast.error("Your workflow has some issues and can't run until they're fixed. Please review and resolve them first", {
          position: 'bottom-right'
        })
      }



    } catch (error) {

      toast.error('Something went wrong!')

    } finally {
      setLoading(false)
    }




  }



  const saveFlow = async (nodes, edges) => {
    // const result = await SaveFlow({ nodes, edges })
    const result = await updateProject({project_id, nodes, edges})
    

    if (result.status === 201) {
      toast.success(result.msg)
    } else {
      toast.error(result.msg)
    }

  }



  return (
    <header className=" text-white border-b border-gray-200 md:py-5 md:px-10 py-2 px-5 flex justify-between items-center">

      <div className='flex items-center gap-2'>
        <Toaster position="top-center" richColors />

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
          onClick={() => {
            clearAll()
            isOpen(false)

          }}
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
          onClick={() => saveFlow(nodes, edges)}
          disabled={nodes.length === 0}
          className={`border text-black font-semibold border-gray-300 rounded-md md:px-4 md:py-2 px-2 py-1 flex items-center gap-2 transition-all duration-200
          ${nodes.length === 0
              ? 'opacity-50 pointer-events-none'
              : 'hover:bg-green-50 hover:border-green-200 hover:text-green-700 cursor-pointer'}`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            <Save className="w-full h-full" />
          </div>
          <span className="md:flex hidden">Save flow</span>
        </button>



        <button
          onClick={handleRunFlow}
          disabled={nodes.length === 0 || loading}
          className={`font-semibold border-gray-300 rounded-md md:px-4 md:py-2 px-2 py-1 flex items-center bg-gradient-to-r from-green-500 to-green-600 transition-all duration-200
            ${nodes.length === 0 || loading
              ? 'opacity-50 pointer-events-none'
              : 'hover:from-green-600 hover:to-green-700 cursor-pointer'}`}
        >
          <div className="w-5 h-5 md:w-6 md:h-6">
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Play className="w-full h-full text-white" />
            )}
          </div>
          <span className="md:flex hidden text-white">Run Flow</span>
        </button>





      </div>
    </header>
  )
}

export default Header