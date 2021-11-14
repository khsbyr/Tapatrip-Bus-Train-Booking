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

// mutation {
//   busBookingCheck(refNumber:"202111090484", contactPhone:"99119911") {
//     booking {
//       id
//       status
//       statusName
//       toPay
//       toPaid
//     }
//   }
// }

// export const BUS_BOOKING_CHECK = gql`
//   mutation busPassenger($documentNumber: String!) {
//     busPassenger(documentNumber: $documentNumber) {
//       passenger {
//         firstName
//         lastName
//         gender
//         genderName
//         documentNumber
//         isChild
//         id
//       }
//     }
//   }
// `;

export const BUS_BOOKING = gql`
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
