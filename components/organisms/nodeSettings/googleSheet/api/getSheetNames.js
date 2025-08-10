

const getSheetNames = async({SheetId}) => {

  
    const result  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google-sheets/rpcSheet?spreadsheetId=${SheetId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })

    


    return result.json();

}

export default getSheetNames