"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface FormData {
  prompt_name: string;
  welcome_message: string;
  system_prompt: string;
  required_field: string; // Store it as a string, we'll convert it into an array on submit
}

interface Prompt {
  _id: string;
  prompt_name: string;
  welcome_message: string;
  system_prompt: string;
  required_fields: string[]; // Store it as an array
}

export default function Page() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    prompt_name: "",
    welcome_message: "",
    system_prompt: "",
    required_field: "", // Text to input comma-separated values for array
  });

  const [data, setData] = useState<Prompt[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/prompt/get-all-prompts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.prompts);
    } catch (error: any) {
      toast.error("Failed to fetch prompts.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requiredFieldsArray = formData.required_field
        .split(",")
        .map((field) => field.trim()); // Convert string to an array

      if (isEditing && editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/prompt/update-prompt/${editId}`,
          {
            prompt_name: formData.prompt_name,
            welcome_message: formData.welcome_message,
            system_prompt: formData.system_prompt,
            required_fields: requiredFieldsArray, 
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Prompt updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/prompt/create-prompt`,
          {
            prompt_name: formData.prompt_name,
            welcome_message: formData.welcome_message,
            system_prompt: formData.system_prompt,
            required_fields: requiredFieldsArray, // Send as array
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("Prompt created successfully!");
      }

      setFormData({
        prompt_name: "",
        welcome_message: "",
        system_prompt: "",
        required_field: "", // Clear input field
      });
      setEditId(null);
      setIsEditing(false);
      setShowModal(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error submitting form");
    }
  };

  const handleEdit = (item: Prompt) => {
    setFormData({
      prompt_name: item.prompt_name,
      welcome_message: item.welcome_message,
      system_prompt: item.system_prompt,
      required_field: item.required_fields.join(", "),  
    });
    setEditId(item._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this prompt?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/prompt/delete-prompt/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Prompt deleted successfully!");
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete prompt");
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={() => {
          setFormData({
            prompt_name: "",
            welcome_message: "",
            system_prompt: "",
            required_field: "",
          });
          setEditId(null);
          setIsEditing(false);
          setShowModal(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Prompt
      </button>

      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="relative p-6 rounded-lg shadow-xl w-full max-w-md"
            style={{ backgroundColor: "#1c1c1c" }}
          >
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setEditId(null);
              }}
              className="absolute top-2 right-3 text-white text-2xl hover:text-red-500"
              aria-label="Close"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">
              {isEditing ? "Edit Prompt" : "Create New Prompt"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["prompt_name", "welcome_message", "system_prompt", "required_field"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-white"
                  >
                    {field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  {field.includes("message") || field.includes("prompt") ? (
                    <textarea
                      id={field}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border p-2 rounded bg-[#272727] text-[#A3A3A3]"
                    />
                  ) : (
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      className="w-full border p-2 rounded bg-[#272727] text-[#A3A3A3]"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div
      className="relative p-6 rounded-lg shadow-xl w-full max-w-md"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <button
        onClick={() => {
          setShowModal(false);
          setIsEditing(false);
          setEditId(null);
        }}
        className="absolute top-2 right-3 text-white text-2xl hover:text-red-500"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-xl font-bold mb-4 text-white">
        {isEditing ? "Edit Prompt" : "Create New Prompt"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Prompt Name Field */}
        <div>
          <label htmlFor="prompt_name" className="block text-sm font-medium text-white">
            Prompt Name
          </label>
          <input
            type="text"
            id="prompt_name"
            name="prompt_name"
            value={formData.prompt_name}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-[#272727] text-[#A3A3A3]"
          />
        </div>

        {/* Welcome Message Field */}
        <div>
          <label htmlFor="welcome_message" className="block text-sm font-medium text-white">
            Welcome Message
          </label>
          <textarea
            id="welcome_message"
            name="welcome_message"
            value={formData.welcome_message}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded bg-[#272727] text-[#A3A3A3]"
          />
        </div>

        {/* System Prompt Field */}
        <div>
          <label htmlFor="system_prompt" className="block text-sm font-medium text-white">
            System Prompt
          </label>
          <textarea
            id="system_prompt"
            name="system_prompt"
            value={formData.system_prompt}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded bg-[#272727] text-[#A3A3A3]"
          />
        </div>

        {/* Required Field Field */}
        <div>
          <label htmlFor="required_field" className="block text-sm font-medium text-white">
            Required Field (Comma-separated)
          </label>
          <input
            type="text"
            id="required_field"
            name="required_field"
            value={formData.required_field}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-[#272727] text-[#A3A3A3]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Table */}
      {data.length > 0 && (
        <div className="p-6 bg-[#1C1C1C] rounded-4xl mt-8">
          <h3 className="text-lg font-semibold mb-2 text-white">
            Prompt Entries
          </h3>
          <table className="w-full text-sm text-left text-[#8D8D8D] border-b-2 border-[#303030]">
            <thead className="text-xs uppercase text-[#8D8D8D] bg-[#242424] rounded-2xl">
              <tr>
                <th className="px-6 py-3">Prompt Name</th>
                <th className="px-6 py-3">Welcome Message</th>
                <th className="px-6 py-3">System Prompt</th>
                <th className="px-6 py-3">Required Field</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="rounded-xl border-b-2 border-[#303030]"
                >
                  <td className="px-6 py-3">{item.prompt_name}</td>
                  <td className="px-6 py-3">{item.welcome_message}</td>
                  {/* <td className="px-6 py-3">{item.system_prompt}</td> */}
                  <td className="px-6 py-3 text-sm text-gray-300">
      {item.system_prompt.length > 100
        ? item.system_prompt.slice(0, 100) + "..."
        : item.system_prompt}
    </td>
                  <td className="px-6 py-3">{item.required_fields.join(", ")}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
