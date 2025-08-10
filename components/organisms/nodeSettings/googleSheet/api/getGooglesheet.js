

const getGooglesheetList = async() => {

  
    const result  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/google-sheets/listSpreadsheets`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },

    })

    


    return result.json();

}

export default getGooglesheetList