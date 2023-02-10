/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
