'use client'
import React from 'react'
import { action } from '../lib/actionList'
import { motion } from "framer-motion";
import { useWizard } from "react-use-wizard";

const ActionLists = () => {

const {goToStep} = useWizard()


const handleChoice = async (type) =>{

    switch (type) {
        case 'watch_rows':
            goToStep(2)
        

    }


}




    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}

            className="mt-6 p-4 "

        >

            <div className="space-y-4">
                {action.map((value, i) => (
                    <div
                        key={i}
                        onClick={()=> handleChoice(value.type)}
                        className="border border-gray-300 hover:border-blue-500 rounded-xl p-4 transition cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-start space-x-3">
                            {/* Icon Circle */}
                            <div className="w-10 h-10 min-w-[40px] bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                                {value.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-base">{value.label}</p>
                                {value.description && (
                                    <p className="text-sm text-gray-500 whitespace-normal break-words max-w-full">
                                        {value.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </motion.div>
    )
}

export default ActionLists