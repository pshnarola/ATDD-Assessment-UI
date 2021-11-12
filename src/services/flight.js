import axios from 'axios'
import { BASE_URL, CLIENT_ID, CLIENT_SECERET_ID } from '../config/config'
import _get from 'lodash/get'

const getTokenService = async () => {
    const data = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECERET_ID,
        grant_type: 'client_credentials'
    })
    return await axios.post(`${BASE_URL}/v1/security/oauth2/token`, data)
}

export const getFlightOffersService = async (data) => {
    console.info('---------------------------------')
    console.info('searchData =>', data)
    console.info('---------------------------------')
    let origin = _get(data, "origin", "")
    let destination = _get(data, "destination", "")
    let adults = _get(data, "adults", 1)
    let childs = _get(data, "childs", 0)
    let travelDates = _get(data, "travelDates", [])
    let cabins = _get(data, "cabins", [])
    let finalDestinations = []
    let finalTravellers = []
    let count = 1
    let travellerCount = 1

    cabins = cabins.map(cabin => cabin.value)

    console.info('---------------------------------')
    console.info('cabins =>', cabins)
    console.info('---------------------------------')

    if (adults) {
        for (let ti = 0; ti < adults; ti++) {
            finalTravellers.push({
                "id": `${travellerCount}`,
                "travelerType": "ADULT",
                "fareOptions": [
                    "STANDARD"
                ]
            })
            travellerCount++
        }
    }

    if (childs) {
        for (let ti = 0; ti < childs; ti++) {
            finalTravellers.push({
                "id": `${travellerCount}`,
                "travelerType": "CHILD",
                "fareOptions": [
                    "STANDARD"
                ]
            })
            travellerCount++
        }
    }

    travelDates.forEach((date, di) => {
        if (date) {
            if (date.departureDate) {
                finalDestinations.push({
                    "id": `${count}`,
                    "originLocationCode": origin,
                    "destinationLocationCode": destination,
                    "departureDateTimeRange": {
                        "date": date.departureDate
                    }
                })
                count++
            }
            if (date.returnDate) {
                finalDestinations.push({
                    "id": `${count}`,
                    "originLocationCode": destination,
                    "destinationLocationCode": origin,
                    "departureDateTimeRange": {
                        "date": date.returnDate
                    }
                })
                count++
            }
        }
    })

    let searchCriteria = {
        "flightFilters": {
        }
    }

    if (cabins.length > 0) {
        let cabinsNewList = []
        cabins.forEach((cabin, ci) => {
            cabinsNewList.push(
                {
                    "id": `${ci + 1}`,
                    "cabin": cabin,
                    "coverage": "MOST_SEGMENTS",
                    "originDestinationIds": [...Array(finalDestinations.length)].map((u, i) => `${i + 1}`)
                }
            )
        })
        searchCriteria['flightFilters']["cabinRestrictions"] = cabinsNewList
    }

    console.info('---------------------------------')
    console.info('finalDestinations =>', finalDestinations)
    console.info('finalTravellers =>', finalTravellers)
    console.info('---------------------------------')

    const resp = await getTokenService()
    if (resp.status === 200) {
        let token = resp.data.access_token
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const offerObj = {
            "currencyCode": "USD",
            "originDestinations": finalDestinations,
            "travelers": finalTravellers,
            "sources": [
                "GDS"
            ],
            "searchCriteria": searchCriteria
        }
        return await axios.post(`${BASE_URL}/v2/shopping/flight-offers`, offerObj, { headers })
    }
}