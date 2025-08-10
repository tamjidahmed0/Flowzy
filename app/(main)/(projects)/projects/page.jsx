'use client'
import { useState, useEffect } from "react";
import DialogComponent from "@/components/atom/Dialog";
import Title from "@/components/atom/Title";
import SubTitle from "@/components/atom/SubTitle";
import SideBar from "@/components/organisms/SideBar";
import getProjects from "@/lib/getProjects";
import Link from "next/link";
import { Calendar } from 'lucide-react'



export default function Projects() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false)
  const [projects, setProjects] = useState([])


  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );





  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getProjects()
        console.log(result)
        setProjects(result)
      } catch (error) {
        console.log(error)
      }
    }


    fetchData()

  }, [])






  return (

    <div className="flex h-screen">


      <SideBar />

      <div className=" flex-1 bg-gray-50 p-6 min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title text={'Projects'} className="text-4xl font-bold" />
            <SubTitle text={'Organize your workflows into projects for better management.'} className="text-gray-500" />

          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800">
            + New Project
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none "
          />

          <DialogComponent open={open} onOpenChange={setOpen} />

        </div>

        {/* Projects Grid */}
    


          {filteredProjects.length !== 0 ?

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProjects.map((project, idx) => (
                <Link
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition"

                  href={`/projects/${project.project_id}`}

                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-lg">{project.name}</h2>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${project.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : project.status === "Paused"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                  {/* Workflows & Created Date */}
                  <div className="flex justify-between items-center text-xs text-gray-400">

                    <span className="flex items-center gap-2"> <Calendar size={18}/>{project.created_at}</span>
                  </div>

                </Link>
              ))}
            </div>

            :


            <div className="flex flex-col items-center justify-center gap-4 ">
                <Title text={'No Projects Available'} className={`text-2xl font-bold`}/>
                <SubTitle text={'Looks like you haven’t created any projects. Click “+ New Project” to get started.'} />
            </div>



          }





     
      </div>

    </div>
  );
}
