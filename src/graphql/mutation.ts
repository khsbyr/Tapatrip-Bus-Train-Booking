import { gql } from '@apollo/client';

export const BUS_PASSENGER = gql`
  mutation busPassenger($documentNumber: String!) {
    busPassenger(documentNumber: $documentNumber) {
      passenger {
        firstName
        lastName
        gender
        genderName
        documentNumber
        isChild
        id
      }
    }
  }
`;

export const BUS_BOOKING_CHECK = gql`
  mutation busBookingCheck($refNumber: String!, $contactPhone: String!) {
    busBookingCheck(refNumber: $refNumber, contactPhone: $contactPhone) {
      booking {
        id
        status
        statusName
        toPay
        toPaid
        createdAt
        id
        schedule {
          id
          code
          leaveDate
          driverPhone
          adultTicket
          childTicket
          startStopName
          leaveTime
          endStopName
          directionId
          directionName
          bus {
            modelName
            seatCount
            plateNumber
            transporter {
              name
            }
          }
          insurance {
            name
          }
          locationEnd {
            id
            distance
            estimatedDuration
            locationStop {
              id
              name
              location {
                id
                name
              }
            }
            locationEnd {
              id
              location {
                id
                name
              }
              type
              name
            }
          }
        }
        pax {
          seat
        }
        refNumber
      }
    }
  }
`;

export const BUS_BOOKING_CHECK_ID = gql`
  mutation busBookingCheckById($id: ID!) {
    busBookingCheckById(id: $id) {
      booking {
        id
        payment
      }
    }
  }
`;

export const BUS_BOOKING_CREATE = gql`
  mutation busBooking(
    $schedule: String!
    $contactName: String!
    $contactDialNumber: Int
    $contactPhone: String!
    $contactEmail: String!
    $isCompany: Boolean
    $companyRegister: String!
    $pax: [BookingPaxSerializerInput]!
  ) {
    busBooking(
      input: {
        schedule: $schedule
        contactName: $contactName
        contactDialNumber: $contactDialNumber
        contactPhone: $contactPhone
        contactEmail: $contactEmail
        isCompany: $isCompany
        companyRegister: $companyRegister
        pax: $pax
      }
    ) {
      toPay
      schedule
      statusName
      refNumber
      clientMutationId
    }
  }
`;
