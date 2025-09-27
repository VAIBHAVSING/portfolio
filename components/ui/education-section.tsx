"use client";
import React from 'react';
import { GraduationCap, BookOpen, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  achievements?: readonly string[];
  gpa?: string;
  location?: string;
  logo?: string;
  coursework?: readonly string[];
  type?: 'bachelor' | 'master' | 'phd' | 'certificate' | 'bootcamp';
}

interface EducationSectionProps {
  items?: readonly EducationItem[];
}

export function EducationSection({
  items = [
    {
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'Pune University',
      period: '2022 - 2026',
      description: 'Pursuing Computer Science with focus on software engineering, algorithms, and system design.',
      achievements: [
        'Relevant coursework in Data Structures, Algorithms, and Software Engineering',
        'Active participation in coding competitions and hackathons',
        'Contributing to open source projects and building real-world applications'
      ],
      gpa: '8.5/10',
      location: 'Pune, India',
      logo: '🎓',
      coursework: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Systems', 'Computer Networks', 'Operating Systems'],
      type: 'bachelor'
    }
  ]
}: EducationSectionProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'master':
      case 'phd':
        return Award;
      case 'certificate':
      case 'bootcamp':
        return BookOpen;
      default:
        return GraduationCap;
    }
  };

  return (
    <section id="education" className="py-16 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2 flex items-center gap-3">
            <span className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <GraduationCap className="h-6 w-6 text-blue-500" />
            </span>
            Education
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Academic journey and continuous learning in computer science and technology
          </p>
        </motion.div>
        
        <div className="space-y-6">
          {items.map((item, idx) => {
            const Icon = getIcon(item.type);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: '-40px' }}
                className="group relative rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500/40 hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
                      {(() => {
                        const isUrl = (str: string) => /^https?:\/\//.test(str) || str.startsWith('/');
                        return item.logo && isUrl(item.logo) ? (
                          <Image 
                            src={item.logo} 
                            alt={item.institution} 
                            width={32} 
                            height={32} 
                            className="object-contain rounded-lg" 
                          />
                        ) : item.logo ? (
                          <span className="text-xl select-none" aria-hidden>{item.logo}</span>
                        ) : (
                          <Icon className="h-6 w-6 text-blue-500" />
                        );
                      })()}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-blue-600 transition-colors">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {item.institution}
                          </span>
                          {item.location && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{item.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                          <Calendar className="h-3 w-3" />
                          {item.period}
                        </div>
                        {item.gpa && (
                          <div className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">
                            GPA: {item.gpa}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                        {item.description}
                      </p>
                    )}
                    
                    {item.achievements && (
                      <div className="mb-4">
                        <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-1.5">
                          {item.achievements.map((achievement, i) => (
                            <li key={i} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/60 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.coursework && (
                      <div>
                        <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          Relevant Coursework
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.coursework.map((course) => (
                            <span 
                              key={course} 
                              className="text-xs tracking-wide rounded-md px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}