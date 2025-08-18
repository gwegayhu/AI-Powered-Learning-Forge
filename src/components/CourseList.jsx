import React, { useState } from 'react';
import courses from '../sample-data/courses.json'; // Adjust the path if needed

function CourseList() {
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div>
      <h2>Available Courses</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map(course => (
          <li
            key={course.id}
            style={{
              margin: '1rem 0',
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: '8px',
              cursor: 'pointer',
              background: selectedCourseId === course.id ? '#f5f7fa' : '#fff',
              display: 'flex',
              alignItems: 'center'
            }}
            onClick={() => setSelectedCourseId(course.id)}
          >
            <img
              src={course.image}
              alt={course.title}
              style={{
                width: 120,
                height: 90,
                objectFit: 'cover',
                borderRadius: '8px',
                marginRight: '1rem'
              }}
            />
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {course.title}
              </div>
              <div style={{ color: '#555' }}>
                {course.category} | Level: {course.level} | Duration: {course.duration}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div
          style={{
            marginTop: '2rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            background: '#fafbfc'
          }}
        >
          <h3>{selectedCourse.title}</h3>
          <img
            src={selectedCourse.image}
            alt={selectedCourse.title}
            style={{
              width: 200,
              height: 150,
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
          <p>
            <strong>Category:</strong> {selectedCourse.category}
          </p>
          <p>
            <strong>Level:</strong> {selectedCourse.level}
          </p>
          <p>
            <strong>Duration:</strong> {selectedCourse.duration}
          </p>
          <p>
            <strong>Price:</strong> ${selectedCourse.price}{' '}
            <span style={{ textDecoration: 'line-through', color: '#888' }}>
              ${selectedCourse.originalPrice}
            </span>
          </p>
          <p>
            <strong>Enrolled Students:</strong> {selectedCourse.enrolledStudents}
          </p>
          <p>
            <strong>Rating:</strong> {selectedCourse.rating} / 5
          </p>
          <p>
            <strong>Description:</strong> {selectedCourse.description}
          </p>
          <div>
            <strong>Tags:</strong> {selectedCourse.tags && selectedCourse.tags.join(', ')}
          </div>
          {selectedCourse.modules && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Modules:</h4>
              <ul>
                {selectedCourse.modules.map(m => (
                  <li key={m.id}>
                    <strong>{m.title}</strong>
                    <ul>
                      {m.lessons.map(l => (
                        <li key={l.id}>
                          {l.title} ({l.type}, {l.duration})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedCourse.assessments && (
            <div style={{ marginTop: '1rem' }}>
              <h4>Assessments:</h4>
              <ul>
                {selectedCourse.assessments.map(a => (
                  <li key={a.id}>
                    <strong>{a.title}</strong>
                    <ul>
                      {a.questions.map((q, idx) => (
                        <li key={idx}>
                          {q.question}
                          <ul>
                            {q.options.map((opt, i) => (
                              <li key={i} style={{ fontWeight: i === q.correct ? 'bold' : 'normal' }}>
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.2rem',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => alert('Enrollment functionality coming soon!')}
          >
            Enroll Now
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseList;