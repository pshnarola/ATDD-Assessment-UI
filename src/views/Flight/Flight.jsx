import React from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import DataTable from '../../components/DataTable'
import SearchFlightForm from '../../components/SearchFlightForm'
import { useAppState } from '../../context'

const Flight = () => {
    const { flightsOffer, loading } = useAppState("flight");

    console.info('---------------------------------')
    console.info('flightsList =>', flightsOffer)
    console.info('---------------------------------')
    return (
        <div className="flight-container d-fl">
            <Container className="p-5">
                <Row className="justify-content-md-center">
                    <Col xs lg="12">
                        <Card>
                            <Card.Header>Search Flight Offer</Card.Header>
                            <Card.Body>
                                <SearchFlightForm />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs lg="12" className="mt-5">
                        <DataTable data={flightsOffer} loading={loading} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Flight