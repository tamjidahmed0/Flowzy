
const GoogleSheet = async ({
    spreadsheetId,
    sheetName,
    range,
    containHeader,
    nodeId
}) => {

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google-sheets/rpcSheetOutput?spreadsheetId=${spreadsheetId}&sheetName=${sheetName}&containHeader=${containHeader}&range=${range}&nodeId=${nodeId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })


    return result.json();



}

export default GoogleSheet