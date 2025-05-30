const BASE_URL=process.env.REACT_APP_BASE_URL

export const categories={
    CATEGORIES_API:BASE_URL+ "/course/showAllCategories"
}

export const endPoints={
    CONTACT_API:BASE_URL+"/contact/sendinfo",
    VERIFY_API:BASE_URL+"/auth/signup",
    SENDOTP_API:BASE_URL+"/auth/sendotp",
    LOGIN_API:BASE_URL+"/auth/login",
    RESETPASSTOKEN_API:BASE_URL+ "/auth/reset-password-token",
    RESETPASSWORD_API:BASE_URL+ "/auth/reset-password",
    UPDATEPIC_API:BASE_URL+"/profile/updateDisplayPicture",
    PROFILEDETAILS_API:BASE_URL+"/profile/updateProfile"
}
export const coursespoint={
    ENROLLEDCOURSES_API:BASE_URL+"/profile/getEnrolledCourses",
}

export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
  }