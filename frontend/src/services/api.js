const BASE_URL = import.meta.env.VITE_API_URL;

export async function createCourse(courseId, courseName) {
  const res = await fetch(`${BASE_URL}/course/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course_id: courseId, course_name: courseName }),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}

export async function uploadFile(file, courseId) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("course_id", courseId);
  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload file");
  return res.json();
}

export async function getFilesByCourse(sessionCode) {
  const res = await fetch(`${BASE_URL}/files/${sessionCode}`);
  if (!res.ok) throw new Error("Failed to fetch files");
  return res.json();
}

export async function getFile(fileId) {
  const res = await fetch(`${BASE_URL}/file/${fileId}`);
  if (!res.ok) throw new Error("Failed to fetch file");
  return res.json();
}
