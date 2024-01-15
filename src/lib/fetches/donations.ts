import { donorData } from "@/constants/types/donation"


const donationMetadataEndpoint = "/api/mock/metadata"
const donorsEndpoint = "/api/mock/donors"




type metadataRes = {
    gathered : number,
    target : number
}
export const getDonationsMetadata = async () => {
    
    const res = await fetch(donationMetadataEndpoint)
    const json = await res.json()
    return json as metadataRes 
}


/**
 * A function that fetches the given donors
 * Currently it does use a mock API endpoint which does have a Date field for its donors. That means that you have to convert the string date to an actual date object before proceeding
 * It also sorts the donations from latest to earliest
 * @returns 
 */
export const getDonors = async ()=> {
    const res = await fetch(donorsEndpoint)
    const json = await res.json()

    const data = json.donors.map((donor: donorData)=> {
        return {
            ...donor,
            date : new Date(donor.date)
        }
    }).sort((a: donorData, b : donorData) => b.date.getTime() - a.date.getTime());
    return data as donorData[] 
}