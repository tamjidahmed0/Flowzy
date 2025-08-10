'use client'
import React, { useEffect, useState } from 'react';
import { useWizard } from "react-use-wizard";
import getGooglesheetList from '../api/getGooglesheet';
import getSheetNames from '../api/getSheetNames';
import { useFlowStore } from '@/store/useFlowStore';



export default function ConnectionForm() {
    const [connectionName, setConnectionName] = useState('');
    const [searchMethod, setSearchMethod] = useState('spreadsheetId');
    const [driveId, setDriveId] = useState('');
    const [spreadsheetId, setSpreadsheetId] = useState('');
    const [hasHeaders, setHasHeaders] = useState(true);
    const [headerRange, setHeaderRange] = useState('A1:Z1');
    const [limit, setLimit] = useState(2);
    const nodes = useFlowStore((s) => s.nodes);
    const edges = useFlowStore((s) => s.edges);
    const [errors, setErrors] = useState({});
    const [sheetList, setSheetList] = useState([])
    const [isOpenList, setOpenList] = useState(false)
    const [selectedList, setSelectedList] = useState({
        id: null,
        name: '',

    })
    const [message, setMessage] = useState('');

    const { previousStep } = useWizard()

    const [selectedSheet, setSelectedSheet] = useState('');
    const [sheetNames, setSheetNames] = useState([]);

    const updateNodeContent = useFlowStore((s) => s.updateNodeContent);



    console.log(sheetNames, 'jhghj')


    const connectionList = [
        { id: 'conn1', name: 'Google Connection 1' },
        { id: 'conn2', name: 'Google Connection 2' }
    ];


    const handleSelectVariable = (variable) => {
        // Append or set the selected variable expression to your message field
        setMessage((prev) => prev + variable);
    };



    useEffect(() => {

        if (nodes.length > 0) {
            const currentNode = nodes.find((node) => node.type === 'sheet')
            console.log(currentNode, 'current node in watch rows')

            // console.log(selectedSheet)




            updateNodeContent(currentNode.id, {
                sheetId: selectedList.id,
                sheetValue: selectedList.name,
                sheetName: selectedSheet,
                // triggerType: 'watchRows',
                range: ''
            }, 'watchRows');

        }


    }, [selectedSheet, selectedList])

    useEffect(() => {
        if (nodes.length > 0) {
            const currentNode = nodes.find((node) => node.type === 'sheet')
            setSelectedList({ name: currentNode.content.sheetValue, id: currentNode.content.sheetId })

        }




    }, [])




    const validate = () => {
        const newErrors = {};
        if (!connectionName.trim()) newErrors.connectionName = 'Connection name is required.';
        if (!searchMethod) newErrors.searchMethod = 'Search method is required.';
        if (searchMethod === 'spreadsheetId' && !driveId.trim()) newErrors.driveId = 'Drive ID is required.';
        if (searchMethod === 'spreadsheetId' && !spreadsheetId.trim()) newErrors.spreadsheetId = 'Spreadsheet ID is required.';
        if (!headerRange.trim()) newErrors.headerRange = 'Header range is required.';
        if (!limit || limit <= 0) newErrors.limit = 'Limit must be greater than 0.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;


        alert('Form submitted successfully!');
    };



    const handleSheetList = async () => {
        const results = await getGooglesheetList()

        if (results) {
            setSheetList(results)
            setOpenList(true)
        }
    }


    const fetchSheetNames = async (id) => {
        console.log(id, 'from fetch names')
        const result = await getSheetNames({ SheetId: id })
        setSheetNames(result)

        console.log(result)

    }



    return (
        <div className="">

            <button
                className="inline-flex items-center  text-gray-700 cursor-pointer"
                onClick={previousStep}
            >
                {/* Left arrow icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>


            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Connection Dropdown */}
                <div>
                    <label htmlFor="connectionName" className="block font-medium mb-1">
                        Connection <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="connectionName"
                        value={connectionName}
                        onChange={(e) => setConnectionName(e.target.value)}
                        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.connectionName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                            }`}
                    >
                        <option value="" disabled>Select a connection</option>
                        {connectionList.map((conn, i) => (
                            <option key={i} value={conn.id}>{conn.name}</option>
                        ))}
                    </select>
                    {errors.connectionName && (
                        <p className="text-red-500 mt-1 text-sm">{errors.connectionName}</p>
                    )}
                </div>

                {/* Spreadsheet ID Picker */}
                <div>
                    <p className="block font-medium mb-1">
                        Spreadsheet ID <span className="text-red-500">*</span>
                    </p>

                    <div className="relative inline-block">
                        <button
                            onClick={handleSheetList}
                            type="button"
                            className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded cursor-pointer hover:bg-blue-600 transition"
                        >
                            <span>Choose file</span>
                        </button>
                        <span className="ml-2 text-gray-600 font-semibold">
                            /{selectedList.name}
                        </span>

                        {isOpenList && (
                            <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
                                <ul className="divide-y divide-gray-200 text-sm">
                                    {sheetList.map((value, i) => (
                                        <li
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            key={i}
                                            onClick={() => {
                                                setSelectedList({ name: value.name, id: value.id });
                                                setOpenList(false);
                                                fetchSheetNames(value.id); // Fetch sheet names after selecting file
                                            }}
                                        >
                                            📄 {value.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sheet Name Dropdown */}
                {sheetNames.length > 0 && (
                    <div>
                        <label htmlFor="sheetName" className="block font-medium mb-1">
                            Sheet Name <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="sheetName"
                            value={selectedSheet}
                            onChange={(e) => setSelectedSheet(e.target.value)}
                            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.sheetName
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-blue-500'
                                }`}
                        >
                            <option value="" disabled>Select a sheet</option>
                            {sheetNames.map((sheet, idx) => (
                                <option key={idx} value={sheet}>
                                    {sheet.title}
                                </option>
                            ))}
                        </select>
                        {errors.sheetName && (
                            <p className="text-red-500 mt-1 text-sm">{errors.sheetName}</p>
                        )}
                    </div>

                )}


                {/* Table Contains Headers */}
                <div className="flex items-center space-x-3">
                    <input
                        id="hasHeaders"
                        type="checkbox"
                        checked={hasHeaders}
                        onChange={(e) => setHasHeaders(e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="hasHeaders" className="font-medium select-none">
                        Table contains headers
                    </label>
                </div>

                {/* Header Range */}
                <div>
                    <label htmlFor="headerRange" className="block font-medium mb-1">
                        Row with headers <span className="text-gray-500 text-sm">(e.g. A1:Z1)</span>
                    </label>
                    <input
                        id="headerRange"
                        type="text"
                        value={headerRange}
                        onChange={(e) => setHeaderRange(e.target.value)}
                        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.headerRange
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        placeholder="Enter header range"
                    />
                    {errors.headerRange && (
                        <p className="text-red-500 mt-1 text-sm">{errors.headerRange}</p>
                    )}
                </div>

                {/* Limit Input */}
                <div>
                    <label htmlFor="limit" className="block font-medium mb-1">
                        Limit <span className="text-gray-500 text-sm">(max results per execution cycle)</span>
                    </label>
                    <input
                        id="limit"
                        type="number"
                        value={limit}
                        min={1}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${errors.limit
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                            }`}
                        placeholder="Enter limit"
                    />
                    {errors.limit && (
                        <p className="text-red-500 mt-1 text-sm">{errors.limit}</p>
                    )}
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </form>

        </div>
    );
}
