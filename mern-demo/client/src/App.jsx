import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  // CÂU 47: Gọi API GET để lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // CÂU 48: Xử lý thay đổi dữ liệu trong Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CÂU 49: Xử lý Gửi dữ liệu POST /api/students
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert("Thêm sinh viên thành công!");
        fetchStudents(); 
        setFormData({ studentId: '', name: '', email: '' }); 
      }
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>🎓 HỆ THỐNG QUẢN LÝ SINH VIÊN</h2>

      {/* Form Nhập liệu (Câu 48) */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="MSSV" required style={{ margin: '5px', padding: '8px' }} />
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Họ và Tên" required style={{ margin: '5px', padding: '8px' }} />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={{ margin: '5px', padding: '8px' }} />
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          ➕ Thêm Sinh Viên
        </button>
      </form>

      {/* Hiển thị danh sách (Câu 47) */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv._id}>
              <td>{sv.studentId}</td>
              <td>{sv.name}</td>
              <td>{sv.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;