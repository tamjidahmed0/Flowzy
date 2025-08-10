'use client'
import { useEffect } from "react";
import { Tabs } from "radix-ui";
import Title from "@/components/atom/Title";
import SubTitle from "@/components/atom/SubTitle";
import { IconJumpRope, IconWorld, IconShield, IconBrandGoogleFilled } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import ValidateToken from "@/lib/validateToken";


export default function Home() {

  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')


  useEffect(() => {


    const validation = async () => {
      if (accessToken !== null) {
        await ValidateToken({ accessToken })
      }




    }


    validation()


  }, [accessToken])








  return (

      <div className="grid grid-cols-2 items-center min-h-screen bg-gray-100 px-80">

        {/* Left Section */}
        <div className="flex flex-col justify-center ">
          <Title text="Flozwy" className="text-3xl font-bold mb-4" />
          <SubTitle
            text="Build powerful automations that connect your favorite apps and services"
            className="text-xl text-gray-700 mb-4"
          />

          <div className="mt-8">

            <div className="flex  items-center gap-4 mb-6">
              <div className="bg-[#d1fae5] w-8 h-8 flex items-center justify-center rounded-lg">
                <IconJumpRope className="text-green-500   " />
              </div>
              <div>
                <Title text="Visual Workflow Builder" className=" font-semibold mb-2" />

                <SubTitle
                  text="Create workflows with a simple drag-and-drop interface"
                  className="text-gray-600"
                />
              </div>
            </div>


            <div className="flex  items-center gap-4 mb-6">
              <div className="bg-[#dbeafe] w-8 h-8 flex items-center justify-center rounded-lg">
                <IconWorld className="text-blue-500   " />
              </div>
              <div>
                <Title text="1000+ Integrations" className=" font-semibold mb-2" />

                <SubTitle
                  text="Connect with all your favorite tools and services"
                  className="text-gray-600"
                />
              </div>
            </div>



            <div className="flex  items-center gap-4 mb-6">
              <div className="bg-[#f3e8ff] w-8 h-8 flex items-center justify-center rounded-lg">
                <IconShield className="text-purple-500   " />
              </div>
              <div>
                <Title text="Enterprise Security" className=" font-semibold mb-2" />

                <SubTitle
                  text="Built with security in mind, ensuring your data is safe"
                  className="text-gray-600"
                />
              </div>
            </div>




          </div>




        </div>

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-md overflow-hidden">

            {/* Header with title & subtitle */}
            <div className="py-6 px-6  border-gray-200">
              <h2 className="text-2xl font-bold text-center">Create Account</h2>
              <p className="text-sm text-gray-500 text-center mt-1">
                Sign up to get started!
              </p>
            </div>

            <Tabs.Root className="w-full" defaultValue="tab2">
              {/* Tab List with gray background */}
              <Tabs.List className="flex rounded-lg bg-gray-200 p-1 mx-10">
                <Tabs.Trigger
                  value="tab1"
                  className="flex-1 rounded-lg py-3 text-center text-sm font-medium cursor-pointer select-none 
                data-[state=active]:bg-white  transition-colors"
                >
                  Sign In
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="tab2"
                  className="flex-1 rounded-lg py-3 text-center text-sm font-medium cursor-pointer select-none  
                data-[state=active]:bg-white  transition-colors"
                >
                  Sign Up
                </Tabs.Trigger>
              </Tabs.List>

              {/* Sign In Form */}
              <Tabs.Content value="tab1" className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black  text-white py-2 rounded font-medium"
                  >
                    Sign In
                  </button>
                  <div className="text-center text-sm text-gray-500">Or continue with</div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex cursor-pointer items-center justify-center w-full border border-gray-300 py-2 rounded hover:bg-gray-50"
                    >
                      <IconBrandGoogleFilled className="mr-2 text-xl" />
                      Google
                    </button>

                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By signing in, you agree to our{' '}
                    <span className="underline cursor-pointer text-blue-500">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="underline cursor-pointer text-blue-500">
                      Privacy Policy
                    </span>.
                  </p>
                </form>
              </Tabs.Content>

              {/* Sign Up Form */}
              <Tabs.Content value="tab2" className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black  text-white py-2 rounded font-medium"
                  >
                    Create Account
                  </button>
                  <div className="text-center text-sm text-gray-500">Or continue with</div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        window.location.href = 'http://localhost:9000/api/auth/google/account';
                      }}
                      type="button"
                      className="flex cursor-pointer items-center justify-center w-full border border-gray-300 py-2 rounded hover:bg-gray-50"
                    >

                      <IconBrandGoogleFilled className="mr-2 text-xl" />
                      Google
                    </button>

                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By signing up, you agree to our{' '}
                    <span className="underline cursor-pointer text-blue-500">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="underline cursor-pointer text-blue-500">
                      Privacy Policy
                    </span>.
                  </p>
                </form>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>

      </div>

  );
}
