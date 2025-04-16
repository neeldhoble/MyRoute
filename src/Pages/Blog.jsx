import React, { useState } from 'react';
import { Bike, Smile, Clock, Sun } from 'lucide-react';

const Blog = () => {
  const [language, setLanguage] = useState('en');
  const [blogs, setBlogs] = useState([
    {
      title: {
        en: "Morning Ride through Garden Area",
        mr: "सकाळचा बाग परिसरातील प्रवास"
      },
      body: {
        en: "The ride was peaceful and fresh. Cool breeze and greenery made it perfect!",
        mr: "प्रवास शांत आणि ताजातवाना होता. गार वारा आणि हिरवळ छान वाटली!"
      },
      ride: {
        type: "car",
        duration: "15 mins",
        comfort: "Smooth",
        mood: "Energized",
        weather: "Cool"
      }
    },
    {
      title: {
        en: "Evening Chill Ride with Friends",
        mr: "मित्रांसोबत संध्याकाळचा प्रवास"
      },
      body: {
        en: "Rode around town with friends. Great vibe, perfect weather, and lots of fun!",
        mr: "मित्रांसोबत शहरात फेरफटका मारला. मजा आली आणि हवामानही उत्तम होतं!"
      },
      ride: {
        type: "bike",
        duration: "25 mins",
        comfort: "Very Comfortable",
        mood: "Happy",
        weather: "Breezy"
      }
    }
  ]);

  const [newBlog, setNewBlog] = useState({
    title: { en: '', mr: '' },
    body: { en: '', mr: '' },
    ride: {
      type: '',
      duration: '',
      comfort: '',
      mood: '',
      weather: ''
    }
  });

  const handleAddBlog = () => {
    if (!newBlog.title.en || !newBlog.body.en || !newBlog.ride.type) return;
    setBlogs([newBlog, ...blogs]); // Add new blog to the top
    setNewBlog({
      title: { en: '', mr: '' },
      body: { en: '', mr: '' },
      ride: { type: '', duration: '', comfort: '', mood: '', weather: '' }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-800" style={{ backgroundColor: 'white' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(60, 100, 130)' }}>MyRoute Blog</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="en">English</option>
          <option value="mr">मराठी</option>
        </select>
      </div>

      {/* Render All Blogs in Reverse (Newest First) */}
      {[...blogs].reverse().map((blog, index) => (
        <div key={index} className="shadow-md rounded-lg p-5 mb-6 border" style={{ backgroundColor: 'rgb(168,213,226)', borderColor: '#9dd5e5' }}>
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'rgb(60, 100, 130)' }}>{blog.title[language]}</h2>
          <p className="text-gray-700 mb-4">{blog.body[language]}</p>
          <div className="bg-white border p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-3 text-gray-800">
              {language === 'en' ? "Ride Details" : "प्रवास तपशील"}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Bike className="w-5 h-5 text-blue-700" /><strong>{language === 'en' ? 'Ride Type:' : 'प्रवासाचा प्रकार:'}</strong> {blog.ride.type}</li>
              <li className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-700" /><strong>{language === 'en' ? 'Duration:' : 'कालावधी:'}</strong> {blog.ride.duration}</li>
              <li className="flex items-center gap-2"><Smile className="w-5 h-5 text-blue-700" /><strong>{language === 'en' ? 'Comfort:' : 'सुखद अनुभव:'}</strong> {blog.ride.comfort}</li>
              <li className="flex items-center gap-2"><Smile className="w-5 h-5 text-blue-700" /><strong>{language === 'en' ? 'Mood:' : 'मनस्थिती:'}</strong> {blog.ride.mood}</li>
              <li className="flex items-center gap-2"><Sun className="w-5 h-5 text-blue-700" /><strong>{language === 'en' ? 'Weather:' : 'हवामान:'}</strong> {blog.ride.weather}</li>
            </ul>
          </div>
        </div>
      ))}

      {/* Form to Add New Blog */}
      <div className="shadow-md border p-5 rounded-lg" style={{ backgroundColor: 'rgb(168,213,226)', borderColor: '#9dd5e5' }}>
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'rgb(60, 100, 130)' }}>
          {language === 'en' ? "Add New Ride Experience" : "नवीन प्रवास अनुभव जोडा"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title (English)" className="border p-2 rounded" value={newBlog.title.en} onChange={(e) => setNewBlog({ ...newBlog, title: { ...newBlog.title, en: e.target.value } })} />
          <input type="text" placeholder="Title (Marathi)" className="border p-2 rounded" value={newBlog.title.mr} onChange={(e) => setNewBlog({ ...newBlog, title: { ...newBlog.title, mr: e.target.value } })} />
          <textarea placeholder="Description (English)" className="border p-2 rounded" value={newBlog.body.en} onChange={(e) => setNewBlog({ ...newBlog, body: { ...newBlog.body, en: e.target.value } })} />
          <textarea placeholder="Description (Marathi)" className="border p-2 rounded" value={newBlog.body.mr} onChange={(e) => setNewBlog({ ...newBlog, body: { ...newBlog.body, mr: e.target.value } })} />
          <select className="border p-2 rounded" value={newBlog.ride.type} onChange={(e) => setNewBlog({ ...newBlog, ride: { ...newBlog.ride, type: e.target.value } })}>
            <option value="">Select Ride Type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
          </select>
          <input type="text" placeholder="Duration" className="border p-2 rounded" value={newBlog.ride.duration} onChange={(e) => setNewBlog({ ...newBlog, ride: { ...newBlog.ride, duration: e.target.value } })} />
          <input type="text" placeholder="Comfort" className="border p-2 rounded" value={newBlog.ride.comfort} onChange={(e) => setNewBlog({ ...newBlog, ride: { ...newBlog.ride, comfort: e.target.value } })} />
          <input type="text" placeholder="Mood" className="border p-2 rounded" value={newBlog.ride.mood} onChange={(e) => setNewBlog({ ...newBlog, ride: { ...newBlog.ride, mood: e.target.value } })} />
          <input type="text" placeholder="Weather" className="border p-2 rounded" value={newBlog.ride.weather} onChange={(e) => setNewBlog({ ...newBlog, ride: { ...newBlog.ride, weather: e.target.value } })} />
        </div>
        <button onClick={handleAddBlog} className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
          {language === 'en' ? "Add Ride" : "प्रवास जोडा"}
        </button>
      </div>
    </div>
  );
};

export default Blog;
