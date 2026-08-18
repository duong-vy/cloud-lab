require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose'); 
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
    .catch((err) => console.error('❌ Lỗi kết nối MongoDB:', err));

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);


app.get('/api/hello', (req, res) => {
    res.json({ message: "Xác nhận: Backend đang hoạt động thành công!" });
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});


app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi thêm sinh viên", error });
    }
});


app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Trả về dữ liệu mới sau khi update
        );
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật", error });
    }
});


app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa sinh viên thành công" });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi xóa", error });
    }
});




app.listen(PORT, () => {
    console.log(`🚀 Server đang khởi chạy tại địa chỉ: http://localhost:${PORT}`);
});