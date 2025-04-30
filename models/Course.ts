import mongoose, { Schema, model, models } from 'mongoose';

const CourseSchema = new Schema({
  title: String,
  thumbnail: String,
  ratings: Number,
  price: Number,
  contentCount: Number,
  instructorId: Number,
  instructor: String,
  category: String,
  level: String,
  language: String,
  status: String,
  review: String,
  students: Array
});

export const Course = models.Course || model('Course', CourseSchema);


// {
//     "_id": 1,
//     "title": "Web Development",
//     "thumbnail": "./web-development.png",
//     "ratings": 4.5,
//     "price": 0,
//     "contentCount": 10,
//     "instructorId": 1,
//     "instructor": "Bodruddoza Redoy",
//     "category": "web-development",
//     "level": "beginner",
//     "language": "English",
//     "status": "published",
//     "review": 5
//   }
