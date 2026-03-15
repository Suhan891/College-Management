import postJson from "./authorization";


export async function CreateCourse(data) {

  return postJson("/course/create", data)
}