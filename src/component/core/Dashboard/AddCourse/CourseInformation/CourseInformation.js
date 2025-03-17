import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";

export const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const {course,editCourse}=useSelector((state)=>state.course)
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
     const getCategories=async()=>{
        setLoading(true)
        const response= await fetchCourseCategories();
        
        if(response.length>0){
           setCategories(response);
        }
        setLoading(false)
     }
     getCategories();
     
  },[])

  useEffect(() => {
    if (editCourse && course) {
      setValue("courseName", course.courseName);
      setValue("description", course.courseDescription);
      setValue("price", course.price);
      setValue("category", course.Category);
      setValue("tags",course.Tags)
    }
  }, [editCourse, course, setValue]);
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent form submission
      addTag(input.trim()); // Trim whitespace before adding
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]); // Add only unique tags
    }
    setInput(""); // Clear input field
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index)); // Remove tag at index
  };

  return (
    <div className="text-white p-6 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Course Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Course Name */}
        <div>
          <label className="block text-sm font-medium">Course Name</label>
          <input
            {...register("courseName", { required: "Course Name is required" })}
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          {errors.courseName && (
            <p className="text-red-400 text-sm">{errors.courseName.message}</p>
          )}
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Course Price */}
        <div>
          <label className="block text-sm font-medium">Price ($)</label>
          <input
            {...register("price", { required: "Price is required", min: 0 })}
            type="number"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          {errors.price && (
            <p className="text-red-400 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Course Category Dropdown */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-2 rounded bg-gray-700 text-richblack-700 border border-gray-600"
            defaultValue={editCourse ? course?.category : ""}
          >
            <option value="">Select Category</option>
            {loading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((cat,index) => (
                <option key={index} value={cat._id}>
                  {cat?.Name}
                </option>
              ))
            )}
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* tags */}

        <div className="p-4 bg-gray-800 text-white rounded-md">
            <label className="block mb-2 text-sm font-medium">Enter Tags</label>
      
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-600 rounded bg-gray-700">
              {tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-600 rounded text-white flex items-center">
                  {tag}
                  <button onClick={() => removeTag(index)} className="ml-2 text-xs text-red-400 hover:text-red-600">x</button>
                </span>
              ))}

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter or ,"
                className="flex-1 p-1 bg-transparent outline-none text-white"
              />
            </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};
