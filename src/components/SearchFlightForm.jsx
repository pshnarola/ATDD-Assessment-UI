import React from 'react'
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { getFlightOffersService } from '../services/flight';
import { useAppState } from '../context';
import { prepareFlightTableData } from '../helper/helper';
import CustomDropdown from './CustomDropdown';

const CabinsList = [
    { label: 'Economy', value: 'ECONOMY' },
    { label: 'Premium Economy', value: 'PREMIUM_ECONOMY' },
    { label: 'Business', value: 'BUSINESS' },
    { label: 'First', value: 'FIRST' },
]

const SearchFlightForm = () => {
    const { setFlightsOffer, setLoading } = useAppState("flight");
    const formik = useFormik({
        initialValues: {
            origin: '',
            destination: '',
            departureDate: '',
            returnDate: '',
            adults: '',
            childs: '',
            travelDates: [{ departureDate: '', returnDate: '' }],
            cabins: []
        },
        onSubmit: async (values) => {

            let flightsOffers = await getFlightOffersService(values)
            let finilizeData = await prepareFlightTableData(flightsOffers, values.travelDates, values.origin, values.destination)
            setFlightsOffer(finilizeData)

        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formoriginlocation">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control type="text" placeholder="Enter Origin Location" id="origin" name="origin" onChange={formik.handleChange} value={formik.values.origin} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formdestinationocation">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control type="text" placeholder="Enter Destination Location" id="destination" name="destination" onChange={formik.handleChange} value={formik.values.destination} />
                        </Form.Group>
                    </Col>
                    {/* <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formdeparturedate">
                            <Form.Label>Departure Date</Form.Label>
                            <Form.Control type="date" id="departureDate" name="departureDate" onChange={formik.handleChange} value={formik.values.departureDate} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formreturndate">
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control type="date" id="returnDate" name="returnDate" onChange={formik.handleChange} value={formik.values.returnDate} />
                        </Form.Group>
                    </Col> */}

                </Row>
                <FormikProvider value={formik}>
                    <FieldArray
                        name="travelDates"
                        render={arrayHelpers => (
                            <>
                                {formik.values.travelDates.map((travelDate, index) => (
                                    <Row key={index} className="">
                                        <Col xs lg="4">
                                            <Form.Group className="mb-3" controlId={`formdeparturedate${index}`} >
                                                <Form.Label>Departure Date</Form.Label>
                                                <Form.Control type="date" id={`travelDatesdepa${index}`} name={`travelDates[${index}].departureDate`} onChange={formik.handleChange} value={formik.values.travelDates[index].departureDate} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs lg="4">
                                            <Form.Group className="mb-3" controlId={`formreturndate${index}`}>
                                                <Form.Label>Return Date</Form.Label>
                                                <Form.Control type="date" id={`travelDatesreturn${index}`} name={`travelDates[${index}].returnDate`} onChange={formik.handleChange} value={formik.values.travelDates[index].returnDate} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs lg="2">
                                            <Form.Group className="mb-3" controlId={`btn-remove${index}`}>
                                                <Form.Label></Form.Label><br />
                                                {formik.values.travelDates.length > 1 && <Button type="button" className="btn btn-danger" style={{ marginTop: "7px" }} onClick={() => arrayHelpers.remove(index)}>
                                                    -
                                                </Button>}
                                                {formik.values.travelDates.length - 1 === index && <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{ marginTop: "7px", marginLeft: "5px" }}
                                                    onClick={() => arrayHelpers.push({ departureDate: '', returnDate: '' })}
                                                >
                                                    +
                                                </button>}
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                ))}
                            </>
                        )}
                    />
                </FormikProvider>
                <Row>
                    <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formadults">
                            <Form.Label>Adults</Form.Label>
                            <Form.Control type="number" placeholder="Enter Adults" id="adults" name="adults" onChange={formik.handleChange} value={formik.values.adults} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formadults">
                            <Form.Label>Childs</Form.Label>
                            <Form.Control type="number" placeholder="Enter Childs" id="childs" name="childs" onChange={formik.handleChange} value={formik.values.childs} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="4">
                        <Form.Group className="mb-3" controlId="formadults">
                            <Form.Label>Select Cabins</Form.Label>
                            <CustomDropdown placeholder="Select Cabins" name="cabins" options={CabinsList} isMulti={true} onChange={formik.handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-md-center">
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
        </>
    )
}

export default SearchFlightForm
