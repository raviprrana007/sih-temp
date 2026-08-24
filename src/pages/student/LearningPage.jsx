import { useState, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import SearchBar from '../../components/ui/SearchBar';
import ProgressBar from '../../components/ui/ProgressBar';
import { Tabs } from '../../components/ui/Tabs';
import { courses, certifications } from '../../data/courses';
import { BookOpen, Star, Users, Clock, Award, ExternalLink } from 'lucide-react';

const CATEGORIES = ['All', 'Backend', 'Frontend', 'Full Stack', 'Cloud', 'DevOps', 'AI/ML', 'Fundamentals', 'Soft Skills', 'Database', 'Architecture'];

export default function LearningPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [tab, setTab] = useState('courses');
  const [enrolled, setEnrolled] = useState(new Set(courses.filter(c => c.enrolled).map(c => c.id)));

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === 'All' || c.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const enrolledCourses = courses.filter(c => enrolled.has(c.id));

  return (
    <DashboardLayout>
      <Topbar title="Learning Programs" />
      <div className="p-6 animate-fade-in">
        <Tabs
          tabs={[
            { id: 'courses', label: 'All Courses' },
            { id: 'enrolled', label: 'My Learning', count: enrolledCourses.length },
            { id: 'certifications', label: 'Certifications', count: certifications.length },
          ]}
          active={tab}
          onChange={setTab}
          className="mb-6"
        />

        {tab === 'courses' && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." className="flex-1" />
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${category === cat ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600 hover:border-primary-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(course => (
                <CourseCard key={course.id} course={course} isEnrolled={enrolled.has(course.id)} onEnroll={() => setEnrolled(prev => { const n = new Set(prev); n.add(course.id); return n; })} />
              ))}
            </div>
          </>
        )}

        {tab === 'enrolled' && (
          <div className="space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="card p-16 text-center">
                <BookOpen size={40} className="text-surface-300 mx-auto mb-3" />
                <p className="text-surface-600 font-semibold">No courses enrolled yet</p>
                <p className="text-sm text-surface-400 mt-1">Browse courses and enroll to start learning</p>
              </div>
            ) : (
              enrolledCourses.map(course => (
                <div key={course.id} className="card p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: course.providerColor }}>
                    {course.provider[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-surface-900 mb-0.5">{course.title}</h3>
                    <p className="text-xs text-surface-500 mb-2">{course.provider} · {course.duration}</p>
                    <ProgressBar value={course.progress || 0} showLabel height="md" />
                  </div>
                  <button className="btn-primary py-1.5 text-xs flex-shrink-0">
                    Continue <ExternalLink size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'certifications' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map(cert => (
              <div key={cert.id} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                    <Award size={20} className="text-amber-500" />
                  </div>
                  <span className="badge-success">Active</span>
                </div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">{cert.name}</h3>
                <p className="text-xs text-surface-500 mb-1">{cert.provider}</p>
                <p className="text-xs text-surface-400">Earned: {cert.date}</p>
                <p className="text-xs text-surface-400 font-mono mt-0.5">ID: {cert.credentialId}</p>
                {cert.score && <span className="badge-warning mt-2 inline-block">{cert.score}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function CourseCard({ course, isEnrolled, onEnroll }) {
  return (
    <div className="card card-hover p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: course.providerColor }}>
          {course.provider[0]}
        </div>
        <span className={`badge ${course.difficulty === 'Beginner' ? 'badge-success' : course.difficulty === 'Intermediate' ? 'badge-warning' : 'badge-danger'}`}>
          {course.difficulty}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-display font-semibold text-surface-900 mb-0.5 leading-snug">{course.title}</h3>
        <p className="text-xs text-surface-500">{course.provider}</p>
      </div>

      <div className="flex items-center gap-3 text-xs text-surface-500">
        <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" />{course.rating}</span>
        <span className="flex items-center gap-1"><Users size={11} />{(course.students / 1000).toFixed(0)}k</span>
        <span className="flex items-center gap-1"><Clock size={11} />{course.duration}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {course.skills.slice(0, 3).map(s => <span key={s} className="badge-neutral">{s}</span>)}
      </div>

      {isEnrolled ? (
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-surface-500">Progress</span>
            <span className="font-semibold text-primary-600">{course.progress || 0}%</span>
          </div>
          <ProgressBar value={course.progress || 0} color="primary" height="md" />
          <button className="btn-primary w-full mt-3 py-2 text-xs justify-center">Continue Learning</button>
        </div>
      ) : (
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-surface-100">
          <div>
            <span className="text-sm font-bold text-surface-900">{course.price}</span>
            {course.originalPrice && <span className="text-xs text-surface-400 line-through ml-1.5">{course.originalPrice}</span>}
          </div>
          <button onClick={onEnroll} className="btn-primary py-1.5 text-xs">Enroll Now</button>
        </div>
      )}
    </div>
  );
}
