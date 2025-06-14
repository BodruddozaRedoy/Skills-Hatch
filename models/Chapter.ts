import mongoose, { model, models, Schema } from "mongoose";

const ChapterSchema = new Schema({
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    title: {type: String, required: true},
    lessons:[{type: mongoose.Schema.Types.ObjectId, ref: "Lesson"}],
    quiz: [{type: mongoose.Schema.Types.ObjectId, ref: "Quiz"}]
},{timestamps: true})

export default models.Chapter || model("Chapter", ChapterSchema)
