//this file provides inadequate queries which are not generated by amplify

export const getUserWithEnrolledCourses = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      phone_number
      enrolledCourses {
        items {
          course {
            category
            id
            title
            tutor
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const listCoursesWithEnrollees = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        subtitle
        category
        images
        price
        language
        tutor
        tutorWho
        relatedSkills
        courseObjectives
        duration
        framework
        prerequisites
        level
        time
        syllabus {
          topic
          description
          duration
        }
        enrollees {
          items {
            user {
              email
              id
              phone_number
              name
              updatedAt
              createdAt
            }
            courseId
            createdAt
            id
            tutor
            updatedAt
            userId
          
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getCourseWithEnrollees = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
        title
        subtitle
        category
        images
        price
        language
        tutor
        tutorWho
        relatedSkills
        courseObjectives
        duration
        framework
        prerequisites
        level
        time
        syllabus {
          topic
          description
          duration
        }
      enrollees {
        items {
          user {
            id
            email
            phone_number
            name
            
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
