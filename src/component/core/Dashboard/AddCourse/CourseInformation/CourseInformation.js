import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { useDispatch,useSelector } from "react-redux";
import {setCourse, setStep} from "../../../../../reducer/Slices/courseSlice"


export const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch=useDispatch()
  const step = useSelector((state) => state.course);

useEffect(() => {
  console.log("Step updated to:", step);
}, [step]);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const {token}=useSelector((state)=>state.auth)
  const {course,editCourse}=useSelector((state)=>state.course)
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);
  const [preview, setPreview] = useState(course?.thumbnail||"");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // If you want to store the file or its URL in course.thumbnail
      dispatch(setCourse({ ...course, thumbnail: imageUrl }));
    }
  };

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
      setValue("category", course.Categoryid);
      setValue("tags",course.Tags);
      setValue("thumbnail", course.thumbnail)

    }
    console.log("THE COURSE IS ,",course);
    
  }, [editCourse, course, setValue]);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  
    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("WhatYouWillLearn", data.courseBenefits);
    formData.append("Categoryid", data.Categoryid); // Assuming this is a category ID
    formData.append("tag",data.tag)
  
    // Handle file upload safely
    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnailImage", data.thumbnail[0]); // ✅ real file
    } else {
      console.log("No thumbnail file selected");
    }
  
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
     
      
      dispatch(setCourse(result.data));
  
    }
    setLoading(false);
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
            {...register("courseDescription", { required: "Description is required" })}
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
            {...register("Categoryid", { required: "Category is required" })}
            className="w-full p-2 rounded bg-gray-700 text-richblack-700 border border-gray-600"
            defaultValue={editCourse ? course?.category : ""}
          >
            <option value="">Select Category</option>
            {loading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories?.map((cat,index) => (
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

      {/* thumbnail */}

      <div className="flex flex-col items-start gap-2">
        <img
          src={preview}
          alt="Course Thumbnail"
          className="w-64 h-40 object-cover rounded-md border"
        />
      <input
            type="file"
            accept="image/*"
            {...register("thumbnail", { required: "Thumbnail is required" })} // Register file input here
            onChange={handleImageChange}
          />
    </div>

    {/* Benifits of the course */}
    <div>
          <label className="block text-sm courseBenefits font-medium">BENIFITS OF COURSE</label>
          <textarea id="courseBenefits" 
            placeholder="enter the benefits"
            {...register("WhatWillYouLearn", { required: "true" })}
            className="w-full p-2 rounded bg-gray-700 text-black border border-gray-600"
          />
          {errors.courseBenefits && (
            <p className="text-red-400 text-sm">{errors.courseBenefits.message}</p>
          )}
        </div>
        

        {/* Submit Button */}
        <div>

        <button
          type="submit"  
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
        >
          Submit Course
        </button>
        </div>
        
      </form>
    </div>
  );
};
