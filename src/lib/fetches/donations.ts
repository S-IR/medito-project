import { donationData, donorData } from '@/constants/types/donation'

const donationMetadataEndpoint = '/api/mock/metadata'
const donorsEndpoint = '/api/mock/donors'
const newDonorEndpoint = '/api/mock/new-donations'

export type donationsMetadataRes = {
  gathered: number
  target: number
}

/**
 * Gets metadata information about the donation goal
 * Keep in mind that these types are meant to be mock
 * @returns 
 */
export const getDonationsMetadata = async () => {
  const res = await fetch(donationMetadataEndpoint)
  const json = await res.json()
  return json as donationsMetadataRes
}

/**
 * A function that fetches the given donors
 * Currently it does use a mock API endpoint which does have a Date field for its donors. That means that you have to convert the string date to an actual date object before proceeding
 * It also sorts the donations from latest to earliest
 * @returns
 */
export const getDonors = async () => {
  const res = await fetch(donorsEndpoint)
  const json = await res.json()

  const data = json.donors
    .map((donor: donorData) => {
      return {
        ...donor,
        date: new Date(donor.date),
      }
    })
    .sort((a: donorData, b: donorData) => b.date.getTime() - a.date.getTime())
  return data as donorData[]
}

//this sets the milliseconds needed before getNewDonor should run
export const getNewDonorDelayMS = 5 * 1000

//this variable just makes sure that the request does not go through on the first call when the function is called (when a component renders for the first time)
let isFistRun = true

/**
 * Gets a new donation detail from an API.
 * Keep in mind that these types are meant to be mock
 * Also keep in mind that we need to convert the date from a string into a date object after it comes through as JSON from an API
 */
export async function getNewDonor(): Promise<{
  donation: null | donationData
}> {
  if (isFistRun) {
    isFistRun = false
    return { donation: null }
  }

  const res = await fetch(newDonorEndpoint)
  const json = (await res.json()) as { donation: null | donationData }
  if (!json) return { donation: null }
  if (!json.donation) return { donation: null }
  return {
    donation: {
      ...json.donation,
      fromDonor: {
        ...json.donation.fromDonor,
        date: new Date(json.donation.fromDonor.date),
      },
    },
  }
}
