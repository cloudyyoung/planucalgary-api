
interface CatalogCourseSetProps {
  course_list: string[];
  description: string | null;
  id: string;
  name: string;
  structure: object;
  type: "static" | "dynamic";
}