import React from 'react'
const Dashboard = () => {

  const workflows = [
    { name: 'Customer Data Sync', type: 'CRM Integration', success: 156, error: 2, status: 'Running', time: '2 minutes ago' },
    { name: 'Email Campaign Trigger', type: 'Marketing Automation', success: 89, error: 0, status: 'Paused', time: '1 hour ago' },
    { name: 'Invoice Processing', type: 'Finance Workflow', success: 234, error: 1, status: 'Running', time: '5 minutes ago' },
    { name: 'Social Media Post', type: 'Content Management', success: 12, error: 3, status: 'Error', time: '30 minutes ago' },
  ];

  const activity = [
    { type: 'created', message: 'Customer Data Sync workflow was created', time: '2 hours ago', user: 'JD John Doe' },
    { type: 'success', message: 'Email Campaign Trigger completed 89 tasks', time: '4 hours ago', user: 'S System' },
    { type: 'connected', message: 'Google Sheets integration connected', time: '1 day ago', user: 'JS Jane Smith' },
    { type: 'error', message: 'Social Media Post workflow encountered an error', time: '1 day ago', user: 'S System' },
  ];

  const statusColors = {
    Running: 'bg-green-100 text-green-700',
    Paused: 'bg-yellow-100 text-yellow-700',
    Error: 'bg-red-100 text-red-700',
  };


  return (
    <div>
    <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your workflows.</p>
        </div>
   
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Total Workflows</div>
          <div className="text-3xl font-bold text-gray-800">24</div>
          <div className="text-green-500 text-sm">+12% from last month</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Active Projects</div>
          <div className="text-3xl font-bold text-gray-800">8</div>
          <div className="text-green-500 text-sm">+2 from last month</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Tasks This Month</div>
          <div className="text-3xl font-bold text-gray-800">1,247</div>
          <div className="text-green-500 text-sm">+23% from last month</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">Success Rate</div>
          <div className="text-3xl font-bold text-gray-800">98.2%</div>
          <div className="text-green-500 text-sm">+0.8% from last month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Recent Workflows</h2>
            <button className="text-sm text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {workflows.map((wf) => (
              <div key={wf.name} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{wf.name}</div>
                  <div className="text-sm text-gray-500">{wf.type}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-green-600">{wf.success}</div>
                  <div className="text-sm text-red-600">{wf.error}</div>
                  <div className={`text-sm px-2 py-1 rounded-full ${statusColors[wf.status]}`}>{wf.status}</div>
                </div>
                <div className="text-xs text-gray-400">{wf.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((act, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow">
                <div className="text-sm font-medium capitalize text-gray-700">{act.type.replace('_', ' ')}</div>
                <div className="text-sm text-gray-600">{act.message}</div>
                <div className="text-xs text-gray-400 mt-1">{act.time} • {act.user}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard