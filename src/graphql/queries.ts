import { gql } from '@apollo/client';

export const CREATE_FOODTRUCKER_MUTATION = gql`
  mutation CreateFoodtrucker(
    $firstname: String!
    $lastname: String!
    $email: String!
    $address: String!
    $phone: String!
    $status: FoodtruckerStatus!
    $password: String!
    $foodtruck_name: String!
    $siret_number: String!
  ) {
    createFoodtrucker(
      CreateFoodtruckerInput: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        address: $address
        phone: $phone
        status: $status
        password: $password
        foodtruck_name: $foodtruck_name
        siret_number: $siret_number
      }
    ) {
      _id
      firstname
      lastname
      phone
      address
      status
      foodtruck {
        _id
        foodtruck_name
        siret_number
        created_at
        updated_at
      }
      user {
        _id
        email
      }
    }
  }
`;

export const REGISTER_FOODTRUCKER_SOCIAL_MEDIA = gql`
  mutation registerFoodtruckerSocialMedia(
    $socialMediaUserInput: SocialMediaUserInput!
  ) {
    registerFoodtruckerSocialMedia(
      socialMediaUserInput: $socialMediaUserInput
    ) {
      _id
      firstname
      lastname
      address
      phone
      status
      foodtruck {
        _id
        siret_number
        foodtruck_name
      }
      user {
        role
        email
        _id
      }
    }
  }
`;

export const LOGIN_FOODTRUCKER_MUTATION = gql`
  mutation LoginFoodtrucker(
    $email: String!
    $password: String!
    $role: String!
  ) {
    loginFoodtrucker(
      loginFoodtruckerInput: { email: $email, password: $password, role: $role }
    ) {
      register
      accessToken
      currentUser {
        _id
        email
        role
      }
    }
  }
`;

export const RESET_PASSWORD_GQL = gql`
  query SendResetPassword($email: String!) {
    sendResetPassword(email: $email) {
      email
      url
    }
  }
`;

export const NEW_PASSWORD_GQL = gql`
  mutation newPasswordReset($newPasswordInput: NewPasswordInput!) {
    newPasswordReset(newPasswordInput: $newPasswordInput) {
      _id
      email
      password
      role
    }
  }
`;

export const USER_BY_GOOGLE_ID = gql`
  query GetUserByGoogleId($sub: String!) {
    getUserByGoogleId(sub: $sub) {
      register
      accessToken
      currentUser {
        _id
        email
        googleId
      }
    }
  }
`;
