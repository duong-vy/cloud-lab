import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    try {
      // Đã sửa đường dẫn
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`); 
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if (editId) {
        // Đã sửa đường dẫn
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          alert("Cập nhật sinh viên thành công!");
          setEditId(null); 
        }
      } else {
        // Đã sửa đường dẫn
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          alert("Thêm sinh viên thành công!");
        }
      }

      fetchStudents(); 
      setFormData({ studentId: '', name: '', email: '' }); 
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) return;
    
    try {
      // Đã sửa đường dẫn
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert("Xóa thành công!");
        fetchStudents();
      }
    } catch (error) {
      console.error("Lỗi khi xóa sinh viên:", error);
    }
  };

  const handleEdit = (sv) => {
    setFormData({ studentId: sv.studentId, name: sv.name, email: sv.email });
    setEditId(sv._id); 
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>🎓 HỆ THỐNG QUẢN LÝ SINH VIÊN - Phiên Bản 2.0</h2>

      {/* Form Nhập liệu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="MSSV" required style={{ margin: '5px', padding: '8px' }} />
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Họ và Tên" required style={{ margin: '5px', padding: '8px' }} />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={{ margin: '5px', padding: '8px' }} />
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: editId ? '#FF9800' : '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          {editId ? '✏️ Cập Nhật' : '➕ Thêm Sinh Viên'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setFormData({ studentId: '', name: '', email: '' }); }} style={{ padding: '8px 15px', marginLeft: '10px', backgroundColor: '#9e9e9e', color: 'white', border: 'none', cursor: 'pointer' }}>
            Hủy
          </button>
        )}
      </form>

      {/* Hiển thị danh sách */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv._id}>
              <td>{sv.studentId}</td>
              <td>{sv.name}</td>
              <td>{sv.email}</td>
              <td>
                <button onClick={() => handleEdit(sv)} style={{ marginRight: '10px', padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(sv._id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;