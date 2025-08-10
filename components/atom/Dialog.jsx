'use client'

import createProject from "@/lib/createProject";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DialogComponent({ open, onOpenChange }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter()

  const handleCreate = async () => {
 
    const result = await createProject({ projectName, description })

    if (result.status === 201) {
      router.push(`projects/${result.project_id}`)
    }




  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg">
          {/* Title & Description */}
          <Dialog.Title className="text-lg font-bold mb-1">
            Create New Project
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Create a new project to organize your workflows and collaborate with your team.
          </Dialog.Description>

          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="projectName">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-black resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
            </Dialog.Close>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer"
            >
              Create Project
            </button>
          </div>

          {/* Close Button (Top Right) */}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              aria-label="Close"
            >
              ✖
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
