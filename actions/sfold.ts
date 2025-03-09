"use server"

export const getSfold = async (sequence: string) => {
    const url = process.env.SFOLD_LINK
    console.log(url)
    try {
        const fullUrl = `${url}run?${new URLSearchParams({ sequence, name: "mygene" })}`
        console.log(fullUrl)
        const res = await fetch(fullUrl, {
            method: "GET"
        })
        const data = await res.json()
        return data
    } catch (e) {
        console.error("Error fetching sfold url: " + e)
        throw new Error("Error fetching sfold url")
    }
}

export const getOligo = async () => {
    const url = process.env.SFOLD_LINK
    console.log(url)
    try {
        const fullUrl = `${url}fetch_output/oligo`
        console.log(fullUrl)
        const res = await fetch(fullUrl, {
            method: "GET"
        })
        console.log(res)
        const data = await res.json()
        console.log(data)
        return data.oligo
    } catch (e) {
        console.error("Error fetching sfold url: " + e)
        throw new Error("Error fetching sfold url")
    }
}