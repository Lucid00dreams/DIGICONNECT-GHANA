"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_1 = require("../services/storage");
const auditLogger_1 = require("../services/auditLogger");
const router = (0, express_1.Router)();
// ─── INITIAL FALLBACK COURSES ───────────────────────────────────────────────
const DEFAULT_COURSES = [
    {
        id: "coding",
        title: "Foundations of Web Development & Basic Coding",
        slug: "web-development-foundations",
        badge: "Professional Certificate",
        category: "Coding & Web",
        headline: "Build modern, responsive websites and interactive web applications from scratch with HTML5, CSS3, and JavaScript.",
        description: "Designed specifically for aspiring software developers and young creators in Ghana. This hands-on course takes you from foundational web architecture through to writing responsive CSS and dynamic JavaScript event listeners with live interactive browser sandboxes in every module.",
        instructorName: "Patrick Paul",
        instructorTitle: "Lead Technology Instructor & Director",
        instructorAvatar: "/images/testimonials/participant-1.jpg",
        organization: "DigiConnect Ghana Academy",
        durationWeeks: 4,
        totalModules: 3,
        estimatedHours: 6,
        level: "Beginner",
        language: "English",
        rating: 4.9,
        reviewsCount: 48,
        enrolledStudentsCount: 184,
        skillsGained: [
            "Semantic HTML5",
            "CSS Grid & Flexbox",
            "Mobile-First Responsive Design",
            "JavaScript ES6+",
            "DOM Manipulation",
            "Web Sandbox Debugging",
        ],
        prerequisites: ["No prior coding experience required • Basic computer literacy"],
        accentColor: "blue",
        certificateEnabled: true,
        syllabus: [
            {
                week: 1,
                title: "Web Architecture & HTML5 Essentials",
                description: "How the web works, client-server models, semantic markup, and launching your first webpage.",
                hours: 2,
            },
            {
                week: 2,
                title: "Modern CSS Styling, Flexbox & Responsive Layouts",
                description: "Visual design, layout systems, mobile viewports, and CSS custom variables.",
                hours: 2,
            },
            {
                week: 3,
                title: "Interactive JavaScript & DOM Event Listeners",
                description: "Event-driven scripting, dynamic UI manipulation, and browser interactivity.",
                hours: 2,
            },
        ],
        lessons: [],
    },
    {
        id: "cybersecurity",
        title: "Applied Cybersecurity & Defensive Threat Analysis",
        slug: "applied-cybersecurity-defense",
        badge: "Security Specialization",
        category: "Cybersecurity",
        headline: "Deconstruct real-world cyber threats: detect phishing, evaluate password entropy, and defend against database injection attacks.",
        description: "Step into the role of a digital defender. Learn how malicious actors craft social engineering exploits and develop practical skills to defend corporate credentials and web databases using industry-standard OWASP best practices.",
        instructorName: "Kwame Osei-Tutu",
        instructorTitle: "Cyber Defense Specialist",
        instructorAvatar: "/images/testimonials/participant-2.jpg",
        organization: "DigiConnect Ghana Academy",
        durationWeeks: 4,
        totalModules: 3,
        estimatedHours: 6,
        level: "Beginner to Intermediate",
        language: "English",
        rating: 4.9,
        reviewsCount: 36,
        enrolledStudentsCount: 142,
        skillsGained: [
            "Phishing Forensic Analysis",
            "Social Engineering Detection",
            "Password Entropy & 2FA",
            "SQL Injection Mitigation",
            "OWASP Top 10 Hygiene",
        ],
        prerequisites: ["Basic familiarity with internet browsing and web security principles"],
        accentColor: "red",
        certificateEnabled: true,
        syllabus: [
            {
                week: 1,
                title: "Social Engineering & Phishing Email Forensic Analysis",
                description: "Deconstructing lookalike domains, deceptive headers, and urgent coercion.",
                hours: 2,
            },
            {
                week: 2,
                title: "Cryptographic Entropy & Authentication Hardening",
                description: "Mathematical entropy, dictionary attacks, brute-force timelines, and 2FA.",
                hours: 2,
            },
            {
                week: 3,
                title: "Web Application Database Defense & SQLi Neutralization",
                description: "Analyzing tautology injections and implementing parameterized queries.",
                hours: 2,
            },
        ],
        lessons: [],
    },
    {
        id: "digital-literacy",
        title: "Digital Workplace Productivity & Cloud Collaboration",
        slug: "digital-workplace-productivity",
        badge: "Foundational Certificate",
        category: "Digital Literacy",
        headline: "Master essential cloud productivity tools, collaborative workspaces, professional digital communication, and data hygiene.",
        description: "Designed to prepare students and career entrants for modern digital office environments across Africa and global remote teams. Covers cloud workspaces, document collaboration, spreadsheets, and digital privacy.",
        instructorName: "Akosua Mensah",
        instructorTitle: "Digital Workforce Specialist",
        instructorAvatar: "/images/testimonials/participant-3.jpg",
        organization: "DigiConnect Ghana Academy",
        durationWeeks: 3,
        totalModules: 2,
        estimatedHours: 4,
        level: "Beginner",
        language: "English",
        rating: 4.8,
        reviewsCount: 29,
        enrolledStudentsCount: 98,
        skillsGained: [
            "Cloud Workspaces & Storage",
            "Data Hygiene & Spreadsheets",
            "Document Versioning",
            "Remote Team Etiquette",
        ],
        prerequisites: ["None"],
        accentColor: "green",
        certificateEnabled: true,
        syllabus: [
            {
                week: 1,
                title: "Cloud Workspaces & Document Versioning",
                description: "Organizing collaborative cloud folders, access controls, and real-time editing.",
                hours: 2,
            },
            {
                week: 2,
                title: "Data Management & Digital Productivity Workflows",
                description: "Spreadsheet fundamentals, formulas, survey form collection, and privacy hygiene.",
                hours: 2,
            },
        ],
        lessons: [],
    },
    {
        id: "python",
        title: "Python for Problem Solving & Automation",
        slug: "python-problem-solving",
        badge: "High Demand Track",
        category: "Programming",
        headline: "Learn the world's most versatile programming language to automate routine workflows, parse files, and solve real-world problems.",
        description: "An approachable and practical introduction to Python. Write scripts to automate repetitive tasks, manipulate data collections, and build algorithmic problem-solving confidence.",
        instructorName: "Patrick Paul",
        instructorTitle: "Lead Technology Instructor & Director",
        instructorAvatar: "/images/testimonials/participant-1.jpg",
        organization: "DigiConnect Ghana Academy",
        durationWeeks: 4,
        totalModules: 2,
        estimatedHours: 5,
        level: "Beginner",
        language: "English",
        rating: 4.9,
        reviewsCount: 54,
        enrolledStudentsCount: 210,
        skillsGained: [
            "Python 3 Syntax",
            "Control Flow & Loops",
            "File & Data Processing",
            "Scripting Automation",
        ],
        prerequisites: ["None • Recommended to take Basic Web Coding first"],
        accentColor: "yellow",
        certificateEnabled: true,
        syllabus: [
            {
                week: 1,
                title: "Python Syntax, Variables & Dynamic Typing",
                description: "Core syntax, data types, console I/O, and writing first Python automation script.",
                hours: 2.5,
            },
            {
                week: 2,
                title: "Control Flow, Loops & Data Structures",
                description: "Conditionals, iteration loops, lists, dictionaries, and file processing.",
                hours: 2.5,
            },
        ],
        lessons: [],
    },
];
// Helper to ensure LMS arrays exist in DB
async function getOrInitLMSData() {
    const db = await storage_1.StorageService.getDatabase();
    let updated = false;
    if (!db.lmsCourses || db.lmsCourses.length === 0) {
        db.lmsCourses = DEFAULT_COURSES;
        updated = true;
    }
    if (!db.lmsStudents) {
        db.lmsStudents = [];
        updated = true;
    }
    if (!db.lmsCertificates) {
        db.lmsCertificates = [];
        updated = true;
    }
    if (!db.lmsCertificateSettings) {
        db.lmsCertificateSettings = {
            signerName: "Patrick Paul",
            signerTitle: "Lead Technology Director & Founder",
            signatureUrl: "",
            autoApproveOnCompletion: false,
            institutionName: "DigiConnect Ghana Academy",
            accreditationText: "Authorized Verification Authority for Digital Technology Qualifications",
        };
        updated = true;
    }
    if (!db.lmsSessions) {
        db.lmsSessions = [];
        updated = true;
    }
    if (updated) {
        await storage_1.StorageService.updateDatabase((database) => {
            database.lmsCourses = db.lmsCourses;
            database.lmsStudents = db.lmsStudents;
            database.lmsCertificates = db.lmsCertificates;
            database.lmsCertificateSettings = db.lmsCertificateSettings;
            database.lmsSessions = db.lmsSessions;
        });
    }
    return db;
}
// ─── COURSES ENDPOINTS ──────────────────────────────────────────────────────
// GET /api/lms/courses - List all active courses
router.get("/courses", async (_req, res) => {
    try {
        const db = await getOrInitLMSData();
        res.json({
            success: true,
            count: db.lmsCourses.length,
            data: db.lmsCourses,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// GET /api/lms/courses/:id - Single course
router.get("/courses/:id", async (req, res) => {
    try {
        const db = await getOrInitLMSData();
        const course = db.lmsCourses.find((c) => c.id === req.params.id || c.slug === req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, error: "Course not found" });
        }
        res.json({ success: true, data: course });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/courses - Create or update course from Connect Hub
router.post("/courses", async (req, res) => {
    try {
        const courseData = req.body;
        if (!courseData.id || !courseData.title) {
            return res.status(400).json({ success: false, error: "Course id and title are required" });
        }
        let savedCourse = null;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsCourses)
                db.lmsCourses = DEFAULT_COURSES;
            const index = db.lmsCourses.findIndex((c) => c.id === courseData.id);
            if (index >= 0) {
                db.lmsCourses[index] = { ...db.lmsCourses[index], ...courseData };
                savedCourse = db.lmsCourses[index];
            }
            else {
                db.lmsCourses.push(courseData);
                savedCourse = courseData;
            }
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, { action: "save_lms_course", courseId: courseData.id });
        res.json({ success: true, message: "Course saved successfully", data: savedCourse });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// DELETE /api/lms/courses/:id - Remove course
router.delete("/courses/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsCourses)
                return;
            db.lmsCourses = db.lmsCourses.filter((c) => c.id !== courseId);
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, { action: "delete_lms_course", courseId });
        res.json({ success: true, message: `Course ${courseId} deleted` });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ─── STUDENTS & PROGRESS ENDPOINTS ──────────────────────────────────────────
// GET /api/lms/students - List all registered students and their progress
router.get("/students", async (_req, res) => {
    try {
        const db = await getOrInitLMSData();
        res.json({
            success: true,
            count: db.lmsStudents.length,
            data: db.lmsStudents,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/students - Register or update a student
router.post("/students", async (req, res) => {
    try {
        const studentData = req.body;
        if (!studentData.email || !studentData.name) {
            return res.status(400).json({ success: false, error: "Student email and name are required" });
        }
        let savedStudent = null;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsStudents)
                db.lmsStudents = [];
            const index = db.lmsStudents.findIndex((s) => s.id === studentData.id || s.email.toLowerCase() === studentData.email.toLowerCase());
            if (index >= 0) {
                db.lmsStudents[index] = {
                    ...db.lmsStudents[index],
                    ...studentData,
                    lastActive: new Date().toISOString(),
                };
                savedStudent = db.lmsStudents[index];
            }
            else {
                const newStudent = {
                    id: studentData.id || `student-${Date.now().toString(36)}`,
                    name: studentData.name,
                    email: studentData.email,
                    avatar: studentData.avatar,
                    provider: studentData.provider || "email",
                    role: "student",
                    createdAt: studentData.createdAt || new Date().toISOString(),
                    lastActive: new Date().toISOString(),
                    completedLessonIds: studentData.completedLessonIds || [],
                    enrolledCourseIds: studentData.enrolledCourseIds || ["coding"],
                    currentTrackId: studentData.currentTrackId || "coding",
                    certificateClaimed: studentData.certificateClaimed || false,
                    xp: studentData.xp || 0,
                    streakDays: studentData.streakDays || 1,
                };
                db.lmsStudents.unshift(newStudent);
                savedStudent = newStudent;
            }
        });
        res.json({ success: true, data: savedStudent });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/progress - Log lesson/lab completion & award XP
router.post("/progress", async (req, res) => {
    try {
        const { studentId, studentEmail, lessonId, xpAward } = req.body;
        if (!lessonId) {
            return res.status(400).json({ success: false, error: "lessonId is required" });
        }
        let updatedRecord = null;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsStudents)
                db.lmsStudents = [];
            const student = db.lmsStudents.find((s) => s.id === studentId || (studentEmail && s.email.toLowerCase() === studentEmail.toLowerCase()));
            if (student) {
                if (!student.completedLessonIds.includes(lessonId)) {
                    student.completedLessonIds.push(lessonId);
                    student.xp = (student.xp || 0) + (xpAward || 100);
                }
                student.lastActive = new Date().toISOString();
                updatedRecord = student;
            }
        });
        res.json({ success: true, message: "Progress updated", data: updatedRecord });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/enroll - Enroll / unenroll student
router.post("/enroll", async (req, res) => {
    try {
        const { studentId, studentEmail, courseId, action } = req.body;
        if (!courseId) {
            return res.status(400).json({ success: false, error: "courseId is required" });
        }
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsStudents)
                db.lmsStudents = [];
            const student = db.lmsStudents.find((s) => s.id === studentId || (studentEmail && s.email.toLowerCase() === studentEmail.toLowerCase()));
            if (student) {
                if (!student.enrolledCourseIds)
                    student.enrolledCourseIds = [];
                if (action === "unenroll") {
                    student.enrolledCourseIds = student.enrolledCourseIds.filter((c) => c !== courseId);
                }
                else {
                    if (!student.enrolledCourseIds.includes(courseId)) {
                        student.enrolledCourseIds.push(courseId);
                    }
                }
                student.lastActive = new Date().toISOString();
            }
        });
        res.json({ success: true, message: `Course ${action === "unenroll" ? "unenrolled" : "enrolled"} successfully` });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ─── CERTIFICATES ENDPOINTS ─────────────────────────────────────────────────
// GET /api/lms/certificates - All certificates
router.get("/certificates", async (req, res) => {
    try {
        const db = await getOrInitLMSData();
        const studentQuery = req.query.student;
        let certs = db.lmsCertificates || [];
        if (studentQuery) {
            const q = studentQuery.toLowerCase().trim();
            certs = certs.filter((c) => c.studentId === studentQuery || c.studentEmail.toLowerCase() === q);
        }
        res.json({ success: true, count: certs.length, data: certs });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/certificates/request - Student requests credential
router.post("/certificates/request", async (req, res) => {
    try {
        const { studentId, studentName, studentEmail, courseId, courseTitle } = req.body;
        if (!courseId || !studentName) {
            return res.status(400).json({ success: false, error: "courseId and studentName are required" });
        }
        const db = await getOrInitLMSData();
        const settings = db.lmsCertificateSettings || {
            signerName: "Patrick Paul",
            signerTitle: "Lead Technology Director",
            signatureUrl: "",
            autoApproveOnCompletion: false,
            institutionName: "DigiConnect Ghana Academy",
            accreditationText: "Authorized Verification Authority",
        };
        const isAutoApproved = settings.autoApproveOnCompletion;
        const certId = `DCG-CERT-${courseId.toUpperCase().slice(0, 4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const verificationCode = `DCG-VERIFY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        const newCert = {
            id: certId,
            studentId: studentId || `student-${Date.now().toString(36)}`,
            studentName,
            studentEmail: studentEmail || "student@example.com",
            courseId,
            courseTitle: courseTitle || "Professional Specialization",
            status: isAutoApproved ? "approved" : "pending_approval",
            completionDate: new Date().toISOString().split("T")[0],
            approvedDate: isAutoApproved ? new Date().toISOString().split("T")[0] : undefined,
            approvedBy: isAutoApproved ? settings.signerName : undefined,
            signerName: settings.signerName,
            signerTitle: settings.signerTitle,
            signatureUrl: isAutoApproved ? settings.signatureUrl : undefined,
            verificationCode,
        };
        await storage_1.StorageService.updateDatabase((database) => {
            if (!database.lmsCertificates)
                database.lmsCertificates = [];
            database.lmsCertificates.unshift(newCert);
        });
        res.json({ success: true, message: "Certificate generated", data: newCert });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/certificates/approve - Admin approves certificate
router.post("/certificates/approve", async (req, res) => {
    try {
        const { certificateId, signerName, signatureUrl } = req.body;
        if (!certificateId) {
            return res.status(400).json({ success: false, error: "certificateId is required" });
        }
        let approvedCert = null;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsCertificates)
                return;
            const cert = db.lmsCertificates.find((c) => c.id === certificateId);
            if (cert) {
                cert.status = "approved";
                cert.approvedDate = new Date().toISOString().split("T")[0];
                cert.approvedBy = signerName || db.lmsCertificateSettings?.signerName || "Academic Board";
                if (signerName)
                    cert.signerName = signerName;
                if (signatureUrl)
                    cert.signatureUrl = signatureUrl;
                approvedCert = cert;
            }
        });
        if (!approvedCert) {
            return res.status(404).json({ success: false, error: "Certificate not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, { action: "approve_certificate", certificateId });
        res.json({ success: true, message: "Certificate approved", data: approvedCert });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/certificates/reject - Admin rejects certificate
router.post("/certificates/reject", async (req, res) => {
    try {
        const { certificateId, reason } = req.body;
        if (!certificateId) {
            return res.status(400).json({ success: false, error: "certificateId is required" });
        }
        let rejectedCert = null;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsCertificates)
                return;
            const cert = db.lmsCertificates.find((c) => c.id === certificateId);
            if (cert) {
                cert.status = "rejected";
                cert.rejectionReason = reason || "Practical lab requirements incomplete";
                rejectedCert = cert;
            }
        });
        if (!rejectedCert) {
            return res.status(404).json({ success: false, error: "Certificate not found" });
        }
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, { action: "reject_certificate", certificateId, reason });
        res.json({ success: true, message: "Certificate rejected", data: rejectedCert });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ─── SETTINGS ENDPOINTS ─────────────────────────────────────────────────────
// GET /api/lms/settings
router.get("/settings", async (_req, res) => {
    try {
        const db = await getOrInitLMSData();
        res.json({ success: true, data: db.lmsCertificateSettings });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/settings
router.post("/settings", async (req, res) => {
    try {
        const settings = req.body;
        let saved = null;
        await storage_1.StorageService.updateDatabase((db) => {
            db.lmsCertificateSettings = {
                ...(db.lmsCertificateSettings || {
                    signerName: "Patrick Paul",
                    signerTitle: "Lead Technology Director",
                    signatureUrl: "",
                    autoApproveOnCompletion: false,
                    institutionName: "DigiConnect Ghana Academy",
                    accreditationText: "Authorized Verification Authority",
                }),
                ...settings,
                lastUpdated: new Date().toISOString(),
            };
            saved = db.lmsCertificateSettings;
        });
        auditLogger_1.auditLogger.log("ADMIN_ACTION", req, { action: "update_lms_settings" });
        res.json({ success: true, message: "Settings saved", data: saved });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ─── MENTORSHIP SESSIONS ENDPOINTS ──────────────────────────────────────────
// GET /api/lms/sessions
router.get("/sessions", async (_req, res) => {
    try {
        const db = await getOrInitLMSData();
        res.json({ success: true, count: db.lmsSessions.length, data: db.lmsSessions });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// POST /api/lms/sessions
router.post("/sessions", async (req, res) => {
    try {
        const sessionData = req.body;
        const newSession = {
            ...sessionData,
            id: sessionData.id || `session-${Date.now().toString(36)}`,
            status: "confirmed",
            createdAt: sessionData.createdAt || new Date().toISOString(),
        };
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsSessions)
                db.lmsSessions = [];
            db.lmsSessions.unshift(newSession);
        });
        res.json({ success: true, message: "Session booked successfully", data: newSession });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// PATCH /api/lms/sessions/:id
router.patch("/sessions/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const sessionId = req.params.id;
        let updatedSession = null;
        await storage_1.StorageService.updateDatabase((db) => {
            if (!db.lmsSessions)
                return;
            const s = db.lmsSessions.find((sess) => sess.id === sessionId);
            if (s) {
                s.status = status;
                updatedSession = s;
            }
        });
        res.json({ success: true, message: "Session status updated", data: updatedSession });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// ─── BI-DIRECTIONAL MASTER SYNC ENDPOINT ────────────────────────────────────
// POST /api/lms/sync - Connect Hub & Student Portal Master Sync
router.post("/sync", async (req, res) => {
    try {
        const { clientCourses, clientStudents, clientCertificates, clientSettings, clientSessions } = req.body;
        const db = await getOrInitLMSData();
        await storage_1.StorageService.updateDatabase((database) => {
            // 1. Sync courses: merge client courses if supplied
            if (Array.isArray(clientCourses) && clientCourses.length > 0) {
                const existingMap = new Map(database.lmsCourses.map((c) => [c.id, c]));
                clientCourses.forEach((c) => {
                    existingMap.set(c.id, { ...existingMap.get(c.id), ...c });
                });
                database.lmsCourses = Array.from(existingMap.values());
            }
            // 2. Sync students: merge students by email or id
            if (Array.isArray(clientStudents) && clientStudents.length > 0) {
                const existingStudentMap = new Map(database.lmsStudents.map((s) => [s.email.toLowerCase(), s]));
                clientStudents.forEach((s) => {
                    const key = (s.email || s.id).toLowerCase();
                    const prev = existingStudentMap.get(key);
                    if (prev) {
                        existingStudentMap.set(key, {
                            ...prev,
                            ...s,
                            completedLessonIds: Array.from(new Set([...(prev.completedLessonIds || []), ...(s.completedLessonIds || [])])),
                            enrolledCourseIds: Array.from(new Set([...(prev.enrolledCourseIds || []), ...(s.enrolledCourseIds || [])])),
                            xp: Math.max(prev.xp || 0, s.xp || 0),
                        });
                    }
                    else {
                        existingStudentMap.set(key, s);
                    }
                });
                database.lmsStudents = Array.from(existingStudentMap.values());
            }
            // 3. Sync certificates: merge by id
            if (Array.isArray(clientCertificates) && clientCertificates.length > 0) {
                const existingCertMap = new Map(database.lmsCertificates.map((c) => [c.id, c]));
                clientCertificates.forEach((c) => {
                    existingCertMap.set(c.id, { ...existingCertMap.get(c.id), ...c });
                });
                database.lmsCertificates = Array.from(existingCertMap.values());
            }
            // 4. Sync settings: preserve recent
            if (clientSettings) {
                database.lmsCertificateSettings = {
                    ...database.lmsCertificateSettings,
                    ...clientSettings,
                };
            }
            // 5. Sync sessions: merge by id
            if (Array.isArray(clientSessions) && clientSessions.length > 0) {
                const existingSessionMap = new Map(database.lmsSessions.map((s) => [s.id, s]));
                clientSessions.forEach((s) => {
                    existingSessionMap.set(s.id, { ...existingSessionMap.get(s.id), ...s });
                });
                database.lmsSessions = Array.from(existingSessionMap.values());
            }
        });
        // Return the latest canonical database state
        const syncedDb = await storage_1.StorageService.getDatabase();
        res.json({
            success: true,
            message: "LMS bidirectional synchronization completed successfully",
            timestamp: new Date().toISOString(),
            data: {
                courses: syncedDb.lmsCourses,
                students: syncedDb.lmsStudents,
                certificates: syncedDb.lmsCertificates,
                settings: syncedDb.lmsCertificateSettings,
                sessions: syncedDb.lmsSessions,
            },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
// GET /api/lms/stats - Live Analytics for Connect Hub Dashboard
router.get("/stats", async (_req, res) => {
    try {
        const db = await getOrInitLMSData();
        const students = db.lmsStudents || [];
        const certs = db.lmsCertificates || [];
        const sessions = db.lmsSessions || [];
        const courses = db.lmsCourses || [];
        const totalStudents = students.length;
        const totalCertificatesApproved = certs.filter((c) => c.status === "approved").length;
        const pendingCertificates = certs.filter((c) => c.status === "pending_approval").length;
        const totalSessions = sessions.length;
        const completedSessions = sessions.filter((s) => s.status === "completed").length;
        const totalXP = students.reduce((acc, s) => acc + (s.xp || 0), 0);
        res.json({
            success: true,
            data: {
                totalCourses: courses.length,
                totalStudents,
                totalCertificatesApproved,
                pendingCertificates,
                totalSessions,
                completedSessions,
                totalXP,
                activeStreaksCount: students.filter((s) => (s.streakDays || 0) > 1).length,
            },
        });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.default = router;
