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

export const CHECK_BOOKING = gql`
  mutation busBookingCheck($id: String) {
    busBookingCheck(id: $id) {
      booking {
        id
        status
        statusName
        toPay
        toPaid
      }
    }
  }
`;
