// import React, { useState, useEffect } from 'react'
// import { IconFileSpreadsheet } from '@tabler/icons-react'
// import  {action } from './lib/actionList'

// /* ৩য় ধাপে দেখানোর আলাদা কম্পোনেন্ট  */
// const SheetDashboard = ({ connectionName }) => (
//   <div className="mt-6 p-4 ">

// <div className="space-y-4">
//   {action.map((value, i) => (
//     <div
//       key={i}
//       className="border border-gray-300 hover:border-blue-500 rounded-xl p-4 transition cursor-pointer shadow-sm hover:shadow-md"
//     >
//       <div className="flex items-start space-x-3">
//         {/* Icon Circle */}
//         <div className="w-10 h-10 min-w-[40px] bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
//           {value.icon}
//         </div>

//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           <p className="font-semibold text-base">{value.label}</p>
//           {value.description && (
//             <p className="text-sm text-gray-500 whitespace-normal break-words max-w-full">
//               {value.description}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   ))}
// </div>



//   </div>
// )

// const GoogleSheet = () => {
//   // const [stage, setStage] = useState('idle')
//   const [stage, setStage] = useState('verified')
//   const [connectionName, setConnectionName] = useState('')




//   useEffect(() => {
//   const handleMessage = (event) => {
//     if (event.data.success) {
//       setStage("verified"); //  verified stage 
//     }
//   };

//   window.addEventListener("message", handleMessage);
//   return () => window.removeEventListener("message", handleMessage);
// }, []);




//   /* ১ম ধাপ: create connection বোতাম  */
//   const handleCreateConnection = () => {
//     setStage('setup')
//   }

//   /* ২য় ধাপ: Google OAuth সিমুলেশন (এখানে তোমার আসল auth কল যাবে) */
//   const handleGoogleSignIn = () => {
//     if (!connectionName.trim()) {
//       alert('Connection name is required')
//       return
//     }
//     // 👉 তোমার async Google OAuth logic এখানে বসাবে
//     // সফল হলে stage 'verified' করো

// const GOOGLE_AUTH_URL = 'http://localhost:9000/api/auth/sheet'

//     const width = 500;
//     const height = 600;
//     const left = window.screenX + (window.outerWidth - width) / 2;
//     const top = window.screenY + (window.outerHeight - height) / 2.5;

//     const popup = window.open(
//       GOOGLE_AUTH_URL,
//       'Google Login',
//       `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes,status=no`
//     );





//     // setStage('verified')
//   }

//   return (
//     <div>
//       {/* <h1 className="mt-4 text-xl font-semibold">Connection*</h1> */}

//       {/* Stage : idle */}
//       {stage === 'idle' && (
//         <button
//           onClick={handleCreateConnection}
//           className="relative border border-gray-300 mt-5 w-full p-3 rounded cursor-pointer flex items-center justify-center gap-2 hover:bg-accent transition-all duration-300"
//         >
//           <IconFileSpreadsheet />
//           Create a connection
//         </button>
//       )}

//       {/* Stage : setup (name + Google sign-in) */}
//       {stage === 'setup' && (
//         <div className="mt-5 space-y-3 animate-fade-in">
//           <input
//             type="text"
//             value={connectionName}
//             onChange={(e) => setConnectionName(e.target.value)}
//             placeholder="Connection name"
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full border flex items-center justify-center gap-2 px-4 py-2 rounded cursor-pointer transition"
//           >
//             {/* <FcGoogle className="text-xl" /> */}
//             Sign in with Google
//           </button>
//         </div>
//       )}

//       {/* Stage : verified ⇒ অন্য কম্পোনেন্ট দেখাও */}
//       {stage === 'verified' && <SheetDashboard connectionName={connectionName} />}
//     </div>
//   )
// }

// export default GoogleSheet







'use client'
import React, { useState, useEffect } from 'react'
import { Wizard, useWizard } from "react-use-wizard";

import CreateConnection from './screen/CreateConnection';



// const Step1 = () => {
//   const { nextStep } = useWizard();
//   const [connectionName, setConnectionName] = useState('')



//   useEffect(() => {
//     const handleMessage = (event) => {
//       if (event.data.success) {
//         nextStep();
//       }
//     };

//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, []);





//   const handleGoogleSignIn = () => {
//     if (!connectionName.trim()) {
//       alert('Connection name is required')
//       return
//     }
  
//     const GOOGLE_AUTH_URL = 'http://localhost:9000/api/auth/sheet'

//     const width = 500;
//     const height = 600;
//     const left = window.screenX + (window.outerWidth - width) / 2;
//     const top = window.screenY + (window.outerHeight - height) / 2.5;

//     window.open(
//       GOOGLE_AUTH_URL,
//       'Google Login',
//       `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes,status=no`
//     );


//   }




//   return (
//     <div>
//       <h2>Step 1</h2>

//         <div className="mt-5 space-y-3 animate-fade-in">
//           <input
//             type="text"
//             value={connectionName}
//             onChange={(e) => setConnectionName(e.target.value)}
//             placeholder="Connection name"
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full border flex items-center justify-center gap-2 px-4 py-2 rounded cursor-pointer transition"
//           >
//             {/* <FcGoogle className="text-xl" /> */}
//             Sign in with Google
//           </button>
//         </div>

//     </div>
//   );
// };




const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  return (
    <div>
      <h2>Step 2</h2>
      {/* <button onClick={previousStep}>Back</button>
      <button onClick={nextStep}>Next</button> */}
    </div>
  );
};

const Step3 = () => {
  const { previousStep } = useWizard();
  return (
    <div>
      <h2>Step 3</h2>
      <button onClick={previousStep}>Back</button>
      <p>You're done!</p>
    </div>
  );
};





const GoogleSheet = () => {






  return (
    <Wizard>
      <CreateConnection />
      <Step2 />
      <Step3 />
    </Wizard>
  )
}

export default GoogleSheet
