import _chunk from 'lodash/chunk'

export const prepareFlightTableData = (data, travelDates = [], origin, destination) => {
    let flightOffers = [];
    if (data.status === 200) {
        let allData = data.data;
        const { data: flightOfferData } = data.data
        let finalDestinations = []
        let count = 1

        travelDates.forEach((date, di) => {
            if (date) {
                if (date.departureDate) {
                    finalDestinations.push({
                        "id": `${count}`,
                        "originLocationCode": origin,
                        "destinationLocationCode": destination,
                        "date": date.departureDate
                    })
                    count++
                }
                if (date.returnDate) {
                    finalDestinations.push({
                        "id": `${count}`,
                        "originLocationCode": destination,
                        "destinationLocationCode": origin,
                        "date": date.returnDate
                    })
                    count++
                }
            }
        })

        console.info('---------------------------------')
        console.info('flightOfferData =>', flightOfferData)
        console.info('helper finalDestinations =>', finalDestinations)
        console.info('---------------------------------')

        flightOfferData.forEach(flight => {

            let flightId = flight.id
            let outboundAirline = ""
            let outboundFlight = ""
            let outboundOrigin = ""
            let outboundDestination = ""
            let outboundDate = ""
            let outboundCabin = ""
            let outboundEquipment = ""
            let returnAirline = ""
            let returnFlight = ""
            let returnOrigin = ""
            let returnDestination = ""
            let returnDate = ""
            let returnCabin = ""
            let returnEquipment = ""
            let offerPrice = ""

            offerPrice = `${flight['price']['grandTotal']} ${flight['price']['currency']}`
            let newitineraries = _chunk(flight['itineraries'], 2)
            console.info('---------------------------------')
            console.info('newitineraries =>', newitineraries)
            console.info('---------------------------------')
            for (let itinerariesIndex = 0; itinerariesIndex < newitineraries.length; itinerariesIndex++) {
                const flight_itineries = newitineraries[itinerariesIndex];
                let flag = 0
                for (let fi = 0; fi < flight_itineries.length; fi++) {
                    const fiItem = flight_itineries[fi];
                    console.info('---------------------------------')
                    console.info('fiItem =>', fiItem)
                    console.info('---------------------------------')

                    if (flight_itineries[0]['segments'].length === 1 && flight_itineries[1]['segments'].length === 1) {
                        if (fi === 0) {
                            const flight_segments = fiItem['segments'][0];
                            outboundAirline = flight_segments['carrierCode']
                            outboundFlight = flight_segments['number']
                            outboundOrigin = flight_segments['departure']['iataCode']
                            outboundDestination = flight_segments['arrival']['iataCode']
                            outboundDate = flight_segments['departure']['at']
                            outboundCabin = ""
                            outboundEquipment = flight_segments['aircraft']['code']

                            let travelPriceList = flight['travelerPricings']

                            if (travelPriceList.length > 0) {
                                let fareDetails = travelPriceList[0]['fareDetailsBySegment']
                                if (fareDetails.length > 0) {
                                    outboundCabin = fareDetails[0]['cabin']
                                }
                            }
                            flag = 1
                        }
                        else if (flight_itineries[1] && flight_itineries[1]['segments'].length === 1) {
                            const flight_segments = fiItem['segments'][0];
                            returnAirline = flight_segments['carrierCode']
                            returnFlight = flight_segments['number']
                            returnOrigin = flight_segments['departure']['iataCode']
                            returnDestination = flight_segments['arrival']['iataCode']
                            returnDate = flight_segments['departure']['at']
                            returnCabin = ""
                            returnEquipment = flight_segments['aircraft']['code']

                            let travelPriceList = flight['travelerPricings']

                            if (travelPriceList.length > 0) {
                                let fareDetails = travelPriceList[0]['fareDetailsBySegment']
                                if (fareDetails.length > 0) {
                                    returnCabin = fareDetails[0]['cabin']
                                }
                            }
                            flag = 1

                        }
                    }
                }


                if (flag === 1) {
                    flightOffers.push({
                        flightId,
                        outboundAirline,
                        outboundFlight,
                        outboundOrigin,
                        outboundDestination,
                        outboundDate,
                        outboundCabin,
                        outboundEquipment,
                        returnAirline,
                        returnFlight,
                        returnOrigin,
                        returnDestination,
                        returnDate,
                        returnCabin,
                        returnEquipment,
                        offerPrice
                    })
                }
            }

        })
    }

    console.info('---------------------------------')
    console.info('helper file_flightOffers =>', flightOffers)
    console.info('---------------------------------')

    return flightOffers
}