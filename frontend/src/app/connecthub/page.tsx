"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DeviceMediaUploader, isVideoMedia } from "@/components/ui/DeviceMediaUploader";
import {
  getStore,
  saveStore,
  AppStore,
  ApplicationSubmission,
  ContactSubmission,
  InvolvementSubmission,
  GalleryItem,
  NewsPost,
  DCGEvent,
  TeamMember,
  Partner,
  HistoryMilestone,
  Resource,
  Testimonial,
  Program,
  addGalleryImage,
  removeGalleryImage,
  addNewsPost,
  removeNewsPost,
  addEvent,
  removeEvent,
  addApplication,
  updateApplicationStatus,
  removeApplication,
  addTeamMember,
  updateTeamMember,
  removeTeamMember,
  addPartner,
  updatePartner,
  removePartner,
  addHistoryMilestone,
  updateHistoryMilestone,
  removeHistoryMilestone,
  addProgram,
  updateProgram,
  removeProgram,
  addResource,
  updateResource,
  removeResource,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
} from "@/lib/store";
import {
  loginAdmin,
  verifyAdminSession,
  logoutAdmin,
  fetchLMSStats,
  syncLMSMaster,
  saveLMSCourse,
  deleteLMSCourse,
} from "@/lib/api";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  HeartHandshake,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Lock,
  ArrowRight,
  RefreshCw,
  X,
  Menu,
  Send,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  UploadCloud,
  Camera,
  Upload,
  Loader2,
  Check,
  Newspaper,
  FileText,
  Download,
  FileSpreadsheet,
  UserCheck,
  UserX,
  MessageCircle,
  CheckSquare,
  Square,
  UserPlus,
  ChevronDown,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Edit,
  Award,
  Building2,
  History,
  Bookmark,
  Quote,
  Video,
  Shield,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkle,
} from "lucide-react";
import {
  getAllLessons,
  getBookedSessions,
  updateSessionStatus,
  INITIAL_MENTORS,
  MentorshipSession,
  getAllLMSUsers,
  adminToggleUserLesson,
  adminDeleteUser,
  LMSUser,
  getAllCourses,
  getCourseById,
  saveCourse,
  deleteCourse,
  syncLMSWithBackendServer,
  getCertificateSettings,
  saveCertificateSettings,
  getAllCertificates,
  saveAllCertificates,
  adminApproveCertificate,
  adminRejectCertificate,
  adminUploadSignature,
  requestCourseCertificate,
  getCourseProgress,
  CertificateRecord,
  CertificateSettings,
  DEFAULT_OFFICIAL_SIGNATURE,
  Course,
} from "@/lib/lmsStore";
import { CertificateModal } from "@/components/digihub/CertificateModal";

export default function ConnectHubPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "applications"
    | "messages"
    | "inquiries"
    | "gallery"
    | "news"
    | "programs"
    | "resources"
    | "events"
    | "team"
    | "partners"
    | "history"
    | "stories"
    | "impact"
    | "settings"
    | "digihub"
  >("overview");

  // DIGIHub LMS & Mentorship state
  const [lmsSessions, setLmsSessions] = useState<MentorshipSession[]>(() => getBookedSessions());
  const [lmsStatusFilter, setLmsStatusFilter] = useState<"all" | "confirmed" | "completed" | "cancelled">("all");
  const [lmsUsers, setLmsUsers] = useState<LMSUser[]>(() => getAllLMSUsers());
  const [selectedLmsStudent, setSelectedLmsStudent] = useState<LMSUser | null>(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [studentFilter, setStudentFilter] = useState<"all" | "in-progress" | "certified" | "google" | "email">("all");

  // Certificate Authority & Faculty Signatures state
  const [certSettings, setCertSettings] = useState<CertificateSettings>(() => getCertificateSettings());
  const [allCertificates, setAllCertificates] = useState<CertificateRecord[]>(() => getAllCertificates());
  const [certStatusFilter, setCertStatusFilter] = useState<"all" | "pending_approval" | "approved" | "rejected">("all");
  const [certSearchQuery, setCertSearchQuery] = useState("");
  const [selectedCertToPreview, setSelectedCertToPreview] = useState<CertificateRecord | null>(null);
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false);
  const signatureFileInputRef = useRef<HTMLInputElement>(null);

  // Form state for editing certificate signatory settings
  const [sigFormName, setSigFormName] = useState(certSettings.signerName);
  const [sigFormTitle, setSigFormTitle] = useState(certSettings.signerTitle);
  const [sigFormInstitution, setSigFormInstitution] = useState(certSettings.institutionName);
  const [sigFormUrl, setSigFormUrl] = useState(certSettings.signatureUrl);
  const [sigAutoApprove, setSigAutoApprove] = useState(certSettings.autoApproveOnCompletion);

  // LMS Cloud Sync & Course Management state
  const [isLmsSyncing, setIsLmsSyncing] = useState(false);
  const [lmsCloudSyncStatus, setLmsCloudSyncStatus] = useState<string>("Ready to sync with LMS Cloud Engine");
  const [lmsBackendStats, setLmsBackendStats] = useState<any>(null);
  const [allCoursesState, setAllCoursesState] = useState<Course[]>(() => getAllCourses());
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({
    id: "",
    title: "",
    category: "Coding & Web" as Course["category"],
    description: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "All Levels" | "Beginner to Intermediate",
    durationWeeks: 4,
    estimatedHours: 12,
    instructorName: "DigiConnect Faculty",
    instructorTitle: "Lead Technical Instructor",
    skillsGained: "Programming, Web Sandbox, Problem Solving",
  });

  // Central store state
  const [store, setStoreState] = useState<AppStore>(getStore());
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Selected item modals
  const [selectedApp, setSelectedApp] = useState<ApplicationSubmission | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<ContactSubmission | null>(null);
  const [selectedInq, setSelectedInq] = useState<InvolvementSubmission | null>(null);

  // New gallery image modal state
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [newImageForm, setNewImageForm] = useState({
    src: "",
    category: "Workshops",
    caption: "",
  });

  // Device gallery image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const quickFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFileSize, setSelectedFileSize] = useState<string>("");
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [deviceImagePreview, setDeviceImagePreview] = useState<string>("");
  const [imageSourceMode, setImageSourceMode] = useState<"device" | "preset">("device");

  // Filter & Search states for Applications
  const [appSearch, setAppSearch] = useState("");
  const [appFilter, setAppFilter] = useState<string>("all");
  const [appProgramFilter, setAppProgramFilter] = useState<string>("all");
  const [appExperienceFilter, setAppExperienceFilter] = useState<string>("all");
  const [appEducationFilter, setAppEducationFilter] = useState<string>("all");
  const [appSortBy, setAppSortBy] = useState<"newest" | "oldest" | "name_asc" | "name_desc">("newest");
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);

  // Manual Applicant Entry Modal
  const [showAddAppModal, setShowAddAppModal] = useState(false);
  const [newManualAppForm, setNewManualAppForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "21",
    location: "Accra",
    programOfInterest: "coding-technology",
    educationLevel: "undergraduate",
    digitalExperience: "beginner",
    motivation: "",
    notes: "",
  });

  // Notes state for selected application
  const [appNotesDraft, setAppNotesDraft] = useState("");

  // News management state
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newNewsForm, setNewNewsForm] = useState({
    title: "",
    category: "Bootcamps",
    author: "DigiConnect Editorial",
    readTime: "3 min read",
    excerpt: "",
    content: "",
    image: "",
  });
  const newsFileInputRef = useRef<HTMLInputElement>(null);
  const [newsImagePreview, setNewsImagePreview] = useState<string>("");
  const [isUploadingNewsImage, setIsUploadingNewsImage] = useState<boolean>(false);

  // Events management state
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventForm, setNewEventForm] = useState({
    title: "",
    category: "bootcamp" as "workshop" | "bootcamp" | "meetup" | "conference" | "hackathon",
    date: "",
    time: "10:00 AM – 3:00 PM GMT",
    location: "Accra Digital Centre & Online",
    description: "",
    image: "",
    status: "upcoming" as "upcoming" | "past",
    ctaText: "Register Free",
    ctaLink: "/join",
  });

  // Team Member modal state
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "",
    department: "Leadership",
    bio: "",
    image: "/images/testimonials/participant-1.jpg",
    specialty: "",
    linkedin: "#",
    twitter: "#",
  });

  // Partner modal state
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerForm, setPartnerForm] = useState({
    name: "",
    role: "",
    category: "Tech",
    location: "Accra, Ghana",
    website: "https://digiconnectghana.org",
    logo: "",
  });

  // History Milestone modal state
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<HistoryMilestone | null>(null);
  const [milestoneForm, setMilestoneForm] = useState({
    year: "2026",
    badge: "Scale & Impact",
    title: "",
    description: "",
    achievementsText: "",
  });

  // Resource modal state
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [resourceForm, setResourceForm] = useState({
    title: "",
    category: "Digital Skills",
    type: "Guide" as "Guide" | "Toolkit" | "Syllabus" | "E-Book",
    description: "",
    readTime: "10 min read",
    level: "Beginner" as "Beginner" | "Intermediate" | "All Levels",
    downloadUrl: "/resources",
    image: "",
  });

  // Testimonial modal state
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingStory, setEditingStory] = useState<Testimonial | null>(null);
  const [storyForm, setStoryForm] = useState({
    name: "",
    role: "",
    quote: "",
    program: "Coding & Technology",
    location: "Accra",
    image: "/images/testimonials/participant-1.jpg",
    rating: 5,
  });

  // Program modal state
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [newProgramForm, setNewProgramForm] = useState({
    number: "06",
    title: "",
    shortTitle: "",
    slug: "",
    duration: "8 Weeks",
    audience: "Youth & High School Leavers",
    description: "",
    skillsText: "HTML, CSS, Web Basics",
    color: "blue",
    highlightsText: "Hands-on projects, Industry mentorship, Certificate",
    prerequisites: "Basic literacy & passion to learn",
    image: "",
  });

  useEffect(() => {
    // Check server session securely
    verifyAdminSession()
      .then((res) => {
        if (res.authenticated) {
          setIsAuthenticated(true);
          sessionStorage.setItem("dcg_connecthub_auth", "true");
        } else {
          setIsAuthenticated(false);
          sessionStorage.removeItem("dcg_connecthub_auth");
        }
      })
      .catch(() => {
        const session = sessionStorage.getItem("dcg_connecthub_auth");
        if (session === "true") {
          setIsAuthenticated(true);
        }
      });

    const syncStore = () => {
      setStoreState(getStore());
      setLmsSessions(getBookedSessions());
      setLmsUsers(getAllLMSUsers());
      setAllCertificates(getAllCertificates());
    };
    const syncSessions = () => {
      setLmsSessions(getBookedSessions());
    };
    const syncUsers = () => {
      setLmsUsers(getAllLMSUsers());
    };
    const syncCerts = () => {
      setAllCertificates(getAllCertificates());
    };
    const syncCourses = () => {
      setAllCoursesState(getAllCourses());
    };
    const syncCertSettings = () => {
      const s = getCertificateSettings();
      setCertSettings(s);
      setSigFormName(s.signerName);
      setSigFormTitle(s.signerTitle);
      setSigFormInstitution(s.institutionName);
      setSigFormUrl(s.signatureUrl);
      setSigAutoApprove(s.autoApproveOnCompletion);
    };
    const handleLMSCloudSynced = (e: Event) => {
      syncUsers();
      syncCerts();
      syncCourses();
      syncSessions();
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.message) {
        setLmsCloudSyncStatus(customEvent.detail.message);
      }
    };

    // Initial background sync with LMS backend server
    syncLMSWithBackendServer()
      .then((res) => {
        setLmsCloudSyncStatus(res.message);
        syncUsers();
        syncCerts();
        syncCourses();
        syncSessions();
      })
      .catch(() => {
        setLmsCloudSyncStatus("Local cache active (offline ready)");
      });

    // Fetch initial backend stats
    fetchLMSStats()
      .then((res) => {
        if (res?.data) setLmsBackendStats(res.data);
      })
      .catch(() => {});

    window.addEventListener("digiconnect_store_updated", syncStore);
    window.addEventListener("digihub_sessions_updated", syncSessions);
    window.addEventListener("digihub_users_updated", syncUsers);
    window.addEventListener("digihub_certificates_updated", syncCerts);
    window.addEventListener("digihub_courses_updated", syncCourses);
    window.addEventListener("digihub_cloud_synced", handleLMSCloudSynced);
    window.addEventListener("digihub_cert_settings_updated", syncCertSettings);
    window.addEventListener("storage", syncStore);
    return () => {
      window.removeEventListener("digiconnect_store_updated", syncStore);
      window.removeEventListener("digihub_sessions_updated", syncSessions);
      window.removeEventListener("digihub_users_updated", syncUsers);
      window.removeEventListener("digihub_certificates_updated", syncCerts);
      window.removeEventListener("digihub_courses_updated", syncCourses);
      window.removeEventListener("digihub_cloud_synced", handleLMSCloudSynced);
      window.removeEventListener("digihub_cert_settings_updated", syncCertSettings);
      window.removeEventListener("storage", syncStore);
    };
  }, []);

  // Keep selected student dossier synchronized with latest user data
  useEffect(() => {
    if (selectedLmsStudent) {
      const refreshed = lmsUsers.find((u) => u.id === selectedLmsStudent.id);
      if (refreshed) {
        setSelectedLmsStudent(refreshed);
      }
    }
  }, [lmsUsers]);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleSyncLMSMaster = async () => {
    setIsLmsSyncing(true);
    setLmsCloudSyncStatus("Synchronizing all LMS records with cloud engine...");
    try {
      const res = await syncLMSWithBackendServer();
      setLmsCloudSyncStatus(res.message);
      setAllCoursesState(getAllCourses());
      setLmsUsers(getAllLMSUsers());
      setAllCertificates(getAllCertificates());
      setLmsSessions(getBookedSessions());
      const statsRes = await fetchLMSStats().catch(() => null);
      if (statsRes?.data) setLmsBackendStats(statsRes.data);
      triggerToast(res.message || "LMS synced successfully with Cloud Server!");
    } catch {
      setLmsCloudSyncStatus("Local cache active (offline ready)");
      triggerToast("Working in local offline mode");
    } finally {
      setIsLmsSyncing(false);
    }
  };

  const handleOpenCreateCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      id: "course-" + Date.now(),
      title: "",
      category: "Coding & Web",
      description: "",
      level: "Beginner",
      durationWeeks: 4,
      estimatedHours: 12,
      instructorName: "DigiConnect Faculty",
      instructorTitle: "Lead Technical Instructor",
      skillsGained: "Modern Web, Interactive Labs, Digital Resilience",
    });
    setShowCourseModal(true);
  };

  const handleOpenEditCourse = (c: Course) => {
    setEditingCourse(c);
    setCourseForm({
      id: c.id,
      title: c.title,
      category: c.category,
      description: c.description,
      level: c.level,
      durationWeeks: c.durationWeeks,
      estimatedHours: c.estimatedHours,
      instructorName: c.instructorName,
      instructorTitle: c.instructorTitle,
      skillsGained: c.skillsGained.join(", "),
    });
    setShowCourseModal(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) return;

    const validCategory: "Coding & Web" | "Cybersecurity" | "Digital Literacy" | "Programming" =
      courseForm.category === "Cybersecurity"
        ? "Cybersecurity"
        : courseForm.category === "Digital Literacy"
        ? "Digital Literacy"
        : courseForm.category === "Programming"
        ? "Programming"
        : "Coding & Web";

    const validLevel: "Beginner" | "Intermediate" | "All Levels" | "Beginner to Intermediate" =
      courseForm.level === "Intermediate"
        ? "Intermediate"
        : courseForm.level === "All Levels"
        ? "All Levels"
        : courseForm.level === "Beginner to Intermediate"
        ? "Beginner to Intermediate"
        : "Beginner";

    const courseToSave: Course = {
      id: editingCourse ? editingCourse.id : (courseForm.id.trim() || `course-${Date.now()}`),
      title: courseForm.title.trim(),
      slug: editingCourse?.slug || courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      badge: editingCourse?.badge || "Industry Standard",
      category: validCategory,
      headline: editingCourse?.headline || courseForm.description.slice(0, 80),
      description: courseForm.description.trim(),
      level: validLevel,
      durationWeeks: Number(courseForm.durationWeeks) || 4,
      estimatedHours: Number(courseForm.estimatedHours) || 10,
      totalModules: editingCourse?.totalModules || editingCourse?.lessons?.length || 4,
      language: "English",
      rating: editingCourse?.rating || 4.9,
      reviewsCount: editingCourse?.reviewsCount || 48,
      enrolledStudentsCount: editingCourse?.enrolledStudentsCount || 120,
      instructorName: courseForm.instructorName.trim() || "DigiConnect Faculty",
      instructorTitle: courseForm.instructorTitle.trim() || "Lead Instructor",
      instructorAvatar:
        editingCourse?.instructorAvatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      organization: "DigiConnect Ghana Digital Academy",
      skillsGained: courseForm.skillsGained.split(",").map((s) => s.trim()).filter(Boolean),
      prerequisites: editingCourse?.prerequisites || ["Basic smartphone or computer familiarity"],
      accentColor:
        editingCourse?.accentColor ||
        (validCategory === "Cybersecurity" ? "red" : validCategory === "Programming" ? "yellow" : "blue"),
      certificateEnabled: true,
      syllabus: editingCourse?.syllabus || [
        { week: 1, title: "Foundations & Ghanaian Real-World Use Cases", description: "Core concepts and local context", hours: 3 },
        { week: 2, title: "Interactive Hands-on Practice Labs", description: "Browser sandboxes and code challenges", hours: 4 },
        { week: 3, title: "Industry Problem Solving & Optimization", description: "African tech landscape deployment", hours: 3 },
        { week: 4, title: "Capstone Assessment & Certification", description: "Final exam and faculty verification", hours: 2 },
      ],
      lessons: editingCourse?.lessons || [],
    };

    saveCourse(courseToSave);
    setAllCoursesState(getAllCourses());
    setShowCourseModal(false);
    triggerToast(`Course "${courseToSave.title}" saved and synced!`);

    saveLMSCourse(courseToSave).catch(() => {});
  };

  const handleDeleteCourse = (courseId: string, courseTitle: string) => {
    if (window.confirm(`Are you sure you want to delete course "${courseTitle}"?`)) {
      deleteCourse(courseId);
      setAllCoursesState(getAllCourses());
      triggerToast(`Course "${courseTitle}" removed.`);
      deleteLMSCourse(courseId).catch(() => {});
    }
  };

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Prevent background scrolling when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError("");

    try {
      const res = await loginAdmin(authEmail.trim(), authPassword);
      if (res.success) {
        sessionStorage.setItem("dcg_connecthub_auth", "true");
        setIsAuthenticated(true);
        setAuthError("");
      } else {
        setAuthError("Invalid credentials. Please verify your admin email and password.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch {
      // ignore
    }
    sessionStorage.removeItem("dcg_connecthub_auth");
    sessionStorage.removeItem("dcg_token");
    setIsAuthenticated(false);
  };

  // Process photo or video selected from device gallery
  const handleProcessFile = async (file: File) => {
    const isImg = file.type.startsWith("image/");
    const isVid = file.type.startsWith("video/") || /\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name);
    if (!isImg && !isVid) {
      alert("Please choose a valid photo or video from your device (JPEG, PNG, WebP, MP4, WebM, MOV, etc.).");
      return;
    }

    const sizeKb = Math.round(file.size / 1024);
    const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
    setSelectedFileName(file.name);
    setSelectedFileSize(sizeStr);

    // Instant local preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setDeviceImagePreview(dataUrl);
      setNewImageForm((prev) => ({ ...prev, src: dataUrl }));
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setNewImageForm((prev) => ({ ...prev, src: data.url }));
          setDeviceImagePreview(data.url);
        }
      }
    } catch (err) {
      console.warn("Upload endpoint notice: continuing with local data preview", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDeviceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleQuickUploadSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
      setShowAddImageModal(true);
    }
  };

  // Application Action Handlers
  const openAppReview = (app: ApplicationSubmission) => {
    setSelectedApp(app);
    setAppNotesDraft(app.notes || "");
  };

  const updateAppStatus = (
    id: string,
    newStatus: ApplicationSubmission["status"],
    notes?: string
  ) => {
    updateApplicationStatus(id, newStatus, notes);
    const updatedStore = getStore();
    setStoreState(updatedStore);
    if (selectedApp?.id === id) {
      setSelectedApp({
        ...selectedApp,
        status: newStatus,
        ...(notes !== undefined ? { notes } : {}),
      });
    }
    triggerToast(`Application marked as ${newStatus.replace("_", " ")}!`);
  };

  const handleDeleteApp = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete the application for "${name}"?`)) {
      removeApplication(id);
      const updatedStore = getStore();
      setStoreState(updatedStore);
      setSelectedAppIds((prev) => prev.filter((item) => item !== id));
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
      triggerToast(`Application for ${name} removed.`);
    }
  };

  const handleBatchStatusUpdate = (status: ApplicationSubmission["status"]) => {
    if (selectedAppIds.length === 0) return;
    const storeData = getStore();
    storeData.applications = storeData.applications.map((app) =>
      selectedAppIds.includes(app.id) ? { ...app, status } : app
    );
    saveStore(storeData);
    setStoreState(storeData);
    triggerToast(
      `Updated ${selectedAppIds.length} applicant(s) to ${status.replace("_", " ")}.`
    );
    setSelectedAppIds([]);
  };

  const handleBatchDelete = () => {
    if (selectedAppIds.length === 0) return;
    if (
      confirm(
        `Are you sure you want to permanently delete ${selectedAppIds.length} selected applications?`
      )
    ) {
      const storeData = getStore();
      storeData.applications = storeData.applications.filter(
        (app) => !selectedAppIds.includes(app.id)
      );
      saveStore(storeData);
      setStoreState(storeData);
      triggerToast(`Deleted ${selectedAppIds.length} application(s).`);
      setSelectedAppIds([]);
    }
  };

  const handleSaveAppNotes = (id: string) => {
    const current = store.applications.find((a) => a.id === id);
    if (!current) return;
    updateApplicationStatus(id, current.status, appNotesDraft);
    const updatedStore = getStore();
    setStoreState(updatedStore);
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, notes: appNotesDraft });
    }
    triggerToast("Internal admissions notes saved successfully!");
  };

  const handleAddManualApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newManualAppForm.fullName.trim() ||
      !newManualAppForm.email.trim() ||
      !newManualAppForm.phone.trim()
    ) {
      alert("Please enter the candidate's full name, email, and phone number.");
      return;
    }
    addApplication({
      fullName: newManualAppForm.fullName.trim(),
      email: newManualAppForm.email.trim(),
      phone: newManualAppForm.phone.trim(),
      age: newManualAppForm.age || "21",
      location: newManualAppForm.location || "Accra",
      programOfInterest: newManualAppForm.programOfInterest,
      educationLevel: newManualAppForm.educationLevel,
      digitalExperience: newManualAppForm.digitalExperience,
      motivation:
        newManualAppForm.motivation.trim() ||
        "Registered manually via ConnectHub Admissions desk.",
      notes: newManualAppForm.notes.trim() || undefined,
    });
    setStoreState(getStore());
    setShowAddAppModal(false);
    setNewManualAppForm({
      fullName: "",
      email: "",
      phone: "",
      age: "21",
      location: "Accra",
      programOfInterest: "coding-technology",
      educationLevel: "undergraduate",
      digitalExperience: "beginner",
      motivation: "",
      notes: "",
    });
    triggerToast("Applicant registered and added to cohort review!");
  };

  const getWhatsAppUrl = (phone: string, applicantName: string) => {
    let clean = phone.replace(/[^\d]/g, "");
    if (clean.startsWith("0")) {
      clean = "233" + clean.substring(1);
    } else if (clean.startsWith("+")) {
      clean = clean.substring(1);
    } else if (!clean.startsWith("233")) {
      clean = "233" + clean;
    }
    const text = encodeURIComponent(
      `Hello ${applicantName}, this is the DigiConnect Ghana Admissions Team reaching out regarding your cohort application. We are reviewing your submission and would like to connect!`
    );
    return `https://wa.me/${clean}?text=${text}`;
  };

  const exportApplicationsToCSV = (appsToExport: ApplicationSubmission[]) => {
    if (appsToExport.length === 0) {
      alert("No applications match the current criteria to export.");
      return;
    }
    const headers = [
      "Application ID",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Age",
      "City / Location",
      "Program Slug",
      "Education Level",
      "Digital Experience",
      "Submission Date",
      "Decision Status",
      "Admissions Notes",
      "Motivation Statement",
    ];

    const rows = appsToExport.map((a) => [
      `"${a.id}"`,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.email.replace(/"/g, '""')}"`,
      `"${a.phone.replace(/"/g, '""')}"`,
      `"${a.age}"`,
      `"${a.location.replace(/"/g, '""')}"`,
      `"${a.programOfInterest.replace(/"/g, '""')}"`,
      `"${a.educationLevel.replace(/"/g, '""')}"`,
      `"${a.digitalExperience.replace(/"/g, '""')}"`,
      `"${a.date}"`,
      `"${a.status}"`,
      `"${(a.notes || "").replace(/"/g, '""')}"`,
      `"${(a.motivation || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `DigiConnect_Applications_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Exported ${appsToExport.length} applicant(s) to CSV!`);
  };

  const updateMsgStatus = (id: string, newStatus: ContactSubmission["status"]) => {
    const updated = { ...store };
    updated.messages = updated.messages.map((m) =>
      m.id === id ? { ...m, status: newStatus } : m
    );
    saveStore(updated);
    setStoreState(updated);
    if (selectedMsg?.id === id) {
      setSelectedMsg({ ...selectedMsg, status: newStatus });
    }
    triggerToast("Message status updated!");
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    const imgSrc = newImageForm.src || deviceImagePreview;
    if (!imgSrc || !newImageForm.caption.trim()) {
      alert("Please select a photo from your device and provide a descriptive caption.");
      return;
    }
    addGalleryImage({
      src: imgSrc,
      alt: newImageForm.caption,
      category: newImageForm.category,
      caption: newImageForm.caption,
    });
    setStoreState(getStore());
    setShowAddImageModal(false);
    setDeviceImagePreview("");
    setSelectedFileName("");
    setSelectedFileSize("");
    setNewImageForm({
      src: "",
      category: "Workshops",
      caption: "",
    });
    triggerToast("Photo published live to Community Gallery!");
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Are you sure you want to remove this image from the gallery?")) {
      removeGalleryImage(id);
      setStoreState(getStore());
      triggerToast("Image removed from gallery.");
    }
  };

  const handleProcessNewsFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setNewsImagePreview(base64);
      setNewNewsForm((prev) => ({ ...prev, image: base64 }));
    };
    reader.readAsDataURL(file);

    try {
      setIsUploadingNewsImage(true);
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setNewNewsForm((prev) => ({ ...prev, image: data.url }));
        }
      }
    } catch {
      // FileReader base64 serves as resilient fallback
    } finally {
      setIsUploadingNewsImage(false);
    }
  };

  const handleAddNewsPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsForm.title.trim() || !newNewsForm.excerpt.trim() || !newNewsForm.content.trim()) {
      alert("Please provide the article title, excerpt, and full content.");
      return;
    }
    addNewsPost({
      title: newNewsForm.title.trim(),
      category: newNewsForm.category,
      author: newNewsForm.author.trim() || "DigiConnect Editorial",
      readTime: newNewsForm.readTime.trim() || "3 min read",
      excerpt: newNewsForm.excerpt.trim(),
      content: newNewsForm.content.trim(),
      image: newNewsForm.image || newsImagePreview || "/images/gallery/gallery-2.jpg",
    });
    setStoreState(getStore());
    setShowAddNewsModal(false);
    setNewsImagePreview("");
    setNewNewsForm({
      title: "",
      category: "Bootcamps",
      author: "DigiConnect Editorial",
      readTime: "3 min read",
      excerpt: "",
      content: "",
      image: "",
    });
    triggerToast("News story published live to website!");
  };

  const handleDeleteNewsPost = (id: string) => {
    if (confirm("Are you sure you want to delete this story?")) {
      removeNewsPost(id);
      setStoreState(getStore());
      triggerToast("News story removed.");
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventForm.title.trim() || !newEventForm.date.trim() || !newEventForm.location.trim()) {
      alert("Please provide the event title, date, and location.");
      return;
    }
    addEvent({
      title: newEventForm.title.trim(),
      category: newEventForm.category as "workshop" | "bootcamp" | "meetup" | "conference" | "hackathon",
      date: newEventForm.date.trim(),
      time: newEventForm.time.trim(),
      location: newEventForm.location.trim(),
      description: newEventForm.description.trim() || "Join DigiConnect Ghana for this empowering digital session.",
      image: newEventForm.image.trim() || undefined,
      status: newEventForm.status,
      registrationUrl: newEventForm.ctaLink.trim() || "/join",
    });
    setStoreState(getStore());
    setShowAddEventModal(false);
    setNewEventForm({
      title: "",
      category: "bootcamp",
      date: "",
      time: "10:00 AM – 3:00 PM GMT",
      location: "Accra Digital Centre & Online",
      description: "",
      image: "",
      status: "upcoming",
      ctaText: "Register Free",
      ctaLink: "/join",
    });
    triggerToast("New event published live to platform!");
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      removeEvent(id);
      setStoreState(getStore());
      triggerToast("Event removed from schedule.");
    }
  };

  const handleSaveContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    saveStore(store);
    setStoreState(getStore());
    triggerToast("Contact & organizational details saved live across the platform!");
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    saveStore(store);
    setStoreState(getStore());
    triggerToast("Impact statistics updated live across the platform!");
  };

  // ─── Team Handlers ──────────────────────────────────────────
  const handleOpenAddTeamModal = () => {
    setEditingTeamMember(null);
    setTeamForm({
      name: "",
      role: "",
      department: "Leadership",
      bio: "",
      image: "/images/testimonials/participant-1.jpg",
      specialty: "",
      linkedin: "#",
      twitter: "#",
    });
    setShowTeamModal(true);
  };

  const handleOpenEditTeamModal = (m: TeamMember) => {
    setEditingTeamMember(m);
    setTeamForm({
      name: m.name,
      role: m.role,
      department: m.department || "Leadership",
      bio: m.bio || "",
      image: m.image || "/images/testimonials/participant-1.jpg",
      specialty: m.specialty || "",
      linkedin: m.linkedin || "#",
      twitter: m.twitter || "#",
    });
    setShowTeamModal(true);
  };

  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name.trim() || !teamForm.role.trim()) {
      alert("Please provide the member's full name and role.");
      return;
    }
    if (editingTeamMember) {
      updateTeamMember(editingTeamMember.id, {
        name: teamForm.name.trim(),
        role: teamForm.role.trim(),
        department: teamForm.department,
        bio: teamForm.bio.trim(),
        image: teamForm.image.trim(),
        specialty: teamForm.specialty.trim(),
        linkedin: teamForm.linkedin.trim(),
        twitter: teamForm.twitter.trim(),
      });
      triggerToast("Team member profile updated live!");
    } else {
      addTeamMember({
        name: teamForm.name.trim(),
        role: teamForm.role.trim(),
        department: teamForm.department,
        bio: teamForm.bio.trim(),
        image: teamForm.image.trim() || "/images/testimonials/participant-1.jpg",
        specialty: teamForm.specialty.trim(),
        linkedin: teamForm.linkedin.trim() || "#",
        twitter: teamForm.twitter.trim() || "#",
      });
      triggerToast("New team member added live!");
    }
    setStoreState(getStore());
    setShowTeamModal(false);
  };

  const handleDeleteTeamMember = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      removeTeamMember(id);
      setStoreState(getStore());
      triggerToast("Team member removed.");
    }
  };

  // ─── Partner Handlers ───────────────────────────────────────
  const handleOpenAddPartnerModal = () => {
    setEditingPartner(null);
    setPartnerForm({
      name: "",
      role: "",
      category: "Tech",
      location: "Accra, Ghana",
      website: "https://digiconnectghana.org",
      logo: "",
    });
    setShowPartnerModal(true);
  };

  const handleOpenEditPartnerModal = (p: Partner) => {
    setEditingPartner(p);
    setPartnerForm({
      name: p.name,
      role: p.role || "",
      category: p.category || "Tech",
      location: p.location || "Accra, Ghana",
      website: p.website || "https://digiconnectghana.org",
      logo: p.logo || "",
    });
    setShowPartnerModal(true);
  };

  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name.trim() || !partnerForm.role.trim()) {
      alert("Please enter partner name and partnership role.");
      return;
    }
    if (editingPartner) {
      updatePartner(editingPartner.id, {
        name: partnerForm.name.trim(),
        role: partnerForm.role.trim(),
        category: partnerForm.category,
        location: partnerForm.location.trim(),
        website: partnerForm.website.trim(),
        logo: partnerForm.logo.trim() || editingPartner.logo || "/images/partners/default.svg",
      });
      triggerToast("Partner updated live!");
    } else {
      addPartner({
        name: partnerForm.name.trim(),
        role: partnerForm.role.trim(),
        category: partnerForm.category,
        location: partnerForm.location.trim(),
        website: partnerForm.website.trim(),
        logo: partnerForm.logo.trim() || "/images/partners/default.svg",
      });
      triggerToast("New partner added live!");
    }
    setStoreState(getStore());
    setShowPartnerModal(false);
  };

  const handleDeletePartner = (id: string) => {
    if (confirm("Are you sure you want to remove this partner?")) {
      removePartner(id);
      setStoreState(getStore());
      triggerToast("Partner removed.");
    }
  };

  // ─── Milestone Handlers ─────────────────────────────────────
  const handleOpenAddMilestoneModal = () => {
    setEditingMilestone(null);
    setMilestoneForm({
      year: new Date().getFullYear().toString(),
      badge: "Major Milestone",
      title: "",
      description: "",
      achievementsText: "",
    });
    setShowMilestoneModal(true);
  };

  const handleOpenEditMilestoneModal = (m: HistoryMilestone) => {
    setEditingMilestone(m);
    setMilestoneForm({
      year: m.year,
      badge: m.badge,
      title: m.title,
      description: m.description,
      achievementsText: (m.achievements || []).join("\n"),
    });
    setShowMilestoneModal(true);
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.year.trim() || !milestoneForm.title.trim()) {
      alert("Please provide the milestone year and title.");
      return;
    }
    const achievements = milestoneForm.achievementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingMilestone) {
      updateHistoryMilestone(editingMilestone.id, {
        year: milestoneForm.year.trim(),
        badge: milestoneForm.badge.trim(),
        title: milestoneForm.title.trim(),
        description: milestoneForm.description.trim(),
        achievements,
      });
      triggerToast("Milestone updated live!");
    } else {
      addHistoryMilestone({
        year: milestoneForm.year.trim(),
        badge: milestoneForm.badge.trim(),
        title: milestoneForm.title.trim(),
        description: milestoneForm.description.trim(),
        achievements,
      });
      triggerToast("New milestone added to history timeline!");
    }
    setStoreState(getStore());
    setShowMilestoneModal(false);
  };

  const handleDeleteMilestone = (id: string) => {
    if (confirm("Are you sure you want to remove this milestone?")) {
      removeHistoryMilestone(id);
      setStoreState(getStore());
      triggerToast("Milestone removed.");
    }
  };

  // ─── Resource Handlers ──────────────────────────────────────
  const handleOpenAddResourceModal = () => {
    setEditingResource(null);
    setResourceForm({
      title: "",
      category: "Digital Skills",
      type: "Guide",
      description: "",
      readTime: "10 min read",
      level: "Beginner",
      downloadUrl: "/resources",
      image: "",
    });
    setShowResourceModal(true);
  };

  const handleOpenEditResourceModal = (r: Resource) => {
    setEditingResource(r);
    setResourceForm({
      title: r.title,
      category: r.category,
      type: (r.type as any) || "Guide",
      description: r.description,
      readTime: r.readTime || "10 min read",
      level: (r.level as any) || "Beginner",
      downloadUrl: r.downloadUrl || "/resources",
      image: r.image || "",
    });
    setShowResourceModal(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title.trim() || !resourceForm.description.trim()) {
      alert("Please enter resource title and description.");
      return;
    }
    if (editingResource) {
      updateResource(editingResource.id, {
        title: resourceForm.title.trim(),
        category: resourceForm.category,
        type: resourceForm.type as any,
        description: resourceForm.description.trim(),
        readTime: resourceForm.readTime.trim(),
        level: resourceForm.level,
        downloadUrl: resourceForm.downloadUrl.trim(),
        image: resourceForm.image.trim() || editingResource.image,
      });
      triggerToast("Resource toolkit updated live!");
    } else {
      addResource({
        title: resourceForm.title.trim(),
        category: resourceForm.category,
        type: resourceForm.type as any,
        description: resourceForm.description.trim(),
        readTime: resourceForm.readTime.trim() || "10 min read",
        level: resourceForm.level,
        downloadUrl: resourceForm.downloadUrl.trim() || "/resources",
        image: resourceForm.image.trim() || "/images/resources/default.jpg",
        date: new Date().toISOString().split("T")[0],
        slug: resourceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      });
      triggerToast("New learning toolkit published live!");
    }
    setStoreState(getStore());
    setShowResourceModal(false);
  };

  const handleDeleteResource = (id: string) => {
    if (confirm("Are you sure you want to remove this resource?")) {
      removeResource(id);
      setStoreState(getStore());
      triggerToast("Resource toolkit removed.");
    }
  };

  // ─── Story / Testimonial Handlers ───────────────────────────
  const handleOpenAddStoryModal = () => {
    setEditingStory(null);
    setStoryForm({
      name: "",
      role: "",
      quote: "",
      program: "Coding & Technology",
      location: "Accra",
      image: "/images/testimonials/participant-1.jpg",
      rating: 5,
    });
    setShowStoryModal(true);
  };

  const handleOpenEditStoryModal = (t: Testimonial) => {
    setEditingStory(t);
    setStoryForm({
      name: t.name,
      role: t.role || "Bootcamp Graduate",
      quote: t.quote,
      program: t.program || "Coding & Technology",
      location: t.location || "Accra",
      image: t.image || "/images/testimonials/participant-1.jpg",
      rating: t.rating || 5,
    });
    setShowStoryModal(true);
  };

  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyForm.name.trim() || !storyForm.quote.trim()) {
      alert("Please provide the graduate's name and quote.");
      return;
    }
    if (editingStory) {
      updateTestimonial(editingStory.id, {
        name: storyForm.name.trim(),
        role: storyForm.role.trim(),
        quote: storyForm.quote.trim(),
        program: storyForm.program.trim(),
        location: storyForm.location.trim(),
        image: storyForm.image.trim(),
        rating: storyForm.rating,
      });
      triggerToast("Success story updated live!");
    } else {
      addTestimonial({
        name: storyForm.name.trim(),
        role: storyForm.role.trim() || "Bootcamp Graduate",
        quote: storyForm.quote.trim(),
        program: storyForm.program.trim() || "Coding & Technology",
        location: storyForm.location.trim() || "Accra",
        image: storyForm.image.trim() || "/images/testimonials/participant-1.jpg",
        rating: storyForm.rating,
        outcome: "Bootcamp Graduate",
      });
      triggerToast("New success story published live!");
    }
    setStoreState(getStore());
    setShowStoryModal(false);
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Are you sure you want to remove this story?")) {
      removeTestimonial(id);
      setStoreState(getStore());
      triggerToast("Success story removed.");
    }
  };

  // ─── Program Handlers ───────────────────────────────────────
  const handleAddProgramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgramForm.title.trim() || !newProgramForm.description.trim()) {
      alert("Please provide program title and description.");
      return;
    }
    const slug = (
      newProgramForm.slug.trim() ||
      newProgramForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    );
    const skills = newProgramForm.skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const highlights = newProgramForm.highlightsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    addProgram({
      number: newProgramForm.number.trim() || "06",
      title: newProgramForm.title.trim(),
      shortTitle: newProgramForm.shortTitle.trim() || newProgramForm.title.trim(),
      slug,
      duration: newProgramForm.duration.trim() || "8 Weeks",
      audience: newProgramForm.audience.trim() || "General Youth",
      description: newProgramForm.description.trim(),
      skills: skills.length > 0 ? skills : ["Digital Skills", "Problem Solving"],
      color: newProgramForm.color || "blue",
      accent: (newProgramForm.color as any) || "blue",
      icon: "Code",
      image: newProgramForm.image.trim() || "/images/programs/program-coding.jpg",
      outcomes: highlights.length > 0 ? highlights : ["Hands-on Curriculum"],
      highlights: highlights.length > 0 ? highlights : ["Hands-on Curriculum"],
      prerequisites: newProgramForm.prerequisites.trim() || "Basic interest in tech",
    });
    setStoreState(getStore());
    setShowAddProgramModal(false);
    setNewProgramForm({
      number: "06",
      title: "",
      shortTitle: "",
      slug: "",
      duration: "8 Weeks",
      audience: "Youth & High School Leavers",
      description: "",
      skillsText: "HTML, CSS, Web Basics",
      color: "blue",
      highlightsText: "Hands-on projects, Industry mentorship, Certificate",
      prerequisites: "Basic literacy & passion to learn",
      image: "",
    });
    triggerToast("New program added to curriculum catalog!");
  };

  const handleDeleteProgram = (slug: string) => {
    if (confirm("Are you sure you want to remove this program offering?")) {
      removeProgram(slug);
      setStoreState(getStore());
      triggerToast("Program removed from catalog.");
    }
  };

  // ──────────────────────────────────────────────────────────
  // 1. SIGN-IN SCREEN
  // ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex flex-col justify-center items-center p-5 selection:bg-brand-blue selection:text-white">
        <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle brand glow behind logo */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <Image
                src="/logo.png"
                alt="DigiConnect Ghana"
                width={50}
                height={50}
                className="h-12 w-12 object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              ConnectHub <span className="text-xs px-2 py-0.5 rounded bg-brand-blue text-white font-mono uppercase">Admin</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1.5">
              Autonomous Governance & Content Management Portal
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs mb-5 flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@digiconnectghana.org"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-all text-sm shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Secure Admin Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-brand-blue transition-colors inline-flex items-center gap-1"
            >
              ← Back to DigiConnect Ghana Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ──────────────────────────────────────────────────────────
  const pendingAppsCount = store.applications.filter((a) => a.status === "pending").length;
  const unreadMsgCount = store.messages.filter((m) => m.status === "unread").length;
  const newInqCount = store.inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col lg:flex-row text-neutral-800 font-sans selection:bg-brand-blue selection:text-white w-full max-w-full overflow-x-hidden">

      {/* ─── MOBILE TOP NAVBAR ──────────────────────────── */}
      <header className="lg:hidden sticky top-0 z-40 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="DCG"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block leading-tight">
              ConnectHub
            </span>
            <span className="text-[9px] text-brand-blue font-bold tracking-wider uppercase block">
              DigiConnect Ghana
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(pendingAppsCount + unreadMsgCount + newInqCount) > 0 && (
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          )}
          <button
            onClick={() => setIsMobileNavOpen((v) => !v)}
            aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ─── MOBILE NAV BACKDROP ────────────────────────── */}
      {isMobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-brand-green" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* ─── SIDEBAR ────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-neutral-950 text-white flex flex-col shrink-0 border-r border-neutral-800 overflow-hidden transform transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none lg:static lg:relative lg:translate-x-0 lg:z-auto ${
          isMobileNavOpen
            ? "translate-x-0 pointer-events-auto visible opacity-100"
            : "-translate-x-full pointer-events-none invisible opacity-0 lg:visible lg:opacity-100 lg:pointer-events-auto"
        }`}
      >
        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Subtle Ambient Tech Dot Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Ambient Multi-Colored Corner Glows */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Tech Circuit Buses & Digital Interconnect Vectors */}
          <svg
            className="absolute inset-0 w-full h-full text-white/[0.08] pointer-events-none"
            viewBox="0 0 288 800"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Circuit Bus Routing */}
            <path d="M 24 0 L 24 130 L 68 174 L 140 174 L 176 210 L 176 270" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 264 0 L 264 90 L 220 134 L 150 134" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
            <circle cx="24" cy="130" r="3.5" fill="currentColor" />
            <circle cx="68" cy="174" r="2.5" fill="currentColor" />
            <circle cx="176" cy="210" r="3" fill="currentColor" />
            <circle cx="176" cy="270" r="4" fill="currentColor" />
            <circle cx="220" cy="134" r="3" fill="currentColor" />

            {/* Mid Network Signal Matrix */}
            <path d="M 0 340 L 80 340 L 120 380 L 220 380 L 260 420 L 288 420" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 288 320 L 200 320 L 170 350 L 170 410 L 120 460 L 40 460 L 0 500" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" strokeLinecap="round" />
            <circle cx="80" cy="340" r="3" fill="currentColor" />
            <circle cx="120" cy="380" r="3.5" fill="currentColor" />
            <circle cx="220" cy="380" r="2.5" fill="currentColor" />
            <circle cx="260" cy="420" r="3" fill="currentColor" />
            <circle cx="170" cy="350" r="3" fill="currentColor" />
            <circle cx="120" cy="460" r="3.5" fill="currentColor" />
            <circle cx="40" cy="460" r="2.5" fill="currentColor" />

            {/* Bottom Digital Gateway Grid */}
            <path d="M 30 580 L 100 580 L 150 630 L 150 720 L 190 760 L 288 760" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 250 560 L 180 560 L 130 610 L 80 610 L 30 660 L 30 800" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
            <circle cx="100" cy="580" r="3" fill="currentColor" />
            <circle cx="150" cy="630" r="3.5" fill="currentColor" />
            <circle cx="190" cy="760" r="3" fill="currentColor" />
            <circle cx="180" cy="560" r="2.5" fill="currentColor" />
            <circle cx="80" cy="610" r="3" fill="currentColor" />
            <circle cx="30" cy="660" r="3.5" fill="currentColor" />

            {/* Coordinate Crosshairs */}
            <path d="M 230 215 L 240 215 M 235 210 L 235 220" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 50 295 L 60 295 M 55 290 L 55 300" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 240 685 L 250 685 M 245 680 L 245 690" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 70 735 L 80 735 M 75 730 L 75 740" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Brand Header */}
        <div className="relative z-10 p-5 lg:p-6 border-b border-neutral-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="DCG"
              width={38}
              height={38}
              className="h-9 w-9 object-contain"
            />
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                ConnectHub
              </span>
              <span className="text-[10px] text-brand-blue font-bold tracking-wider uppercase block">
                DigiConnect Ghana
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Online" />
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="lg:hidden p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="relative z-10 p-4 space-y-6 flex-1 overflow-y-auto">
          {/* Section: Intake and community */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 text-xs font-semibold text-neutral-400">
              Intake and community
            </div>

            <button
              onClick={() => { setActiveTab("overview"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Executive briefing</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab("applications"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "applications"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Cohort applications</span>
              </div>
              {pendingAppsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums bg-brand-red text-white shadow-xs">
                  {pendingAppsCount} pending
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("messages"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "messages"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Contact messages</span>
              </div>
              {unreadMsgCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums bg-amber-500 text-white shadow-xs">
                  {unreadMsgCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("inquiries"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "inquiries"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-4 h-4" />
                <span>Volunteer and partners</span>
              </div>
              {newInqCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold tabular-nums bg-emerald-500 text-white shadow-xs">
                  {newInqCount}
                </span>
              )}
            </button>
          </div>

          {/* Section: Curricula and learning */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 text-xs font-semibold text-neutral-400">
              Curricula and learning
            </div>

            <button
              onClick={() => { setActiveTab("digihub"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "digihub"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>DIGIHub</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 rounded-md">
                LMS
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("programs"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "programs"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Programs catalog</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.programs?.length || 0}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("resources"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "resources"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4" />
                <span>Toolkits & guides</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.resources?.length || 0}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("events"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "events"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Events and bootcamps</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.events.length}
              </span>
            </button>
          </div>

          {/* Section: Organization and ecosystem */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 text-xs font-semibold text-neutral-400">
              Organization and ecosystem
            </div>

            <button
              onClick={() => { setActiveTab("team"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "team"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Leadership & mentors</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.team?.length || 0}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("partners"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "partners"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Strategic partners</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.partners?.length || 0}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("history"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "history"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4" />
                <span>History milestones</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.historyMilestones?.length || 0}
              </span>
            </button>
          </div>

          {/* Section: Media and impact */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 text-xs font-semibold text-neutral-400">
              Media and impact
            </div>

            <button
              onClick={() => { setActiveTab("gallery"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "gallery"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4" />
                <span>Gallery manager</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.gallery.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("news"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "news"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-4 h-4" />
                <span>News and stories</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.news?.length || 0}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("stories"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "stories"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Quote className="w-4 h-4" />
                <span>Success stories</span>
              </div>
              <span className="text-xs tabular-nums text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md">
                {store.testimonials?.length || 0}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("impact"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "impact"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Impact statistics</span>
              </div>
            </button>
          </div>

          {/* Section: Administration */}
          <div className="space-y-1">
            <div className="px-3 pb-1.5 text-xs font-semibold text-neutral-400">
              Administration
            </div>

            <button
              onClick={() => { setActiveTab("settings"); setIsMobileNavOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-brand-blue text-white shadow-sm ring-1 ring-white/15"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Organization profile</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Footer info & Logout */}
        <div className="relative z-10 p-4 border-t border-neutral-850 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold transition-colors"
          >
            <span>View public website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center font-bold text-xs text-white">
                AD
              </div>
              <div className="leading-tight">
                <span className="block text-xs font-bold text-white">Admin Director</span>
                <span className="block text-[11px] text-neutral-400">Executive access</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ────────────────────────────── */}
      <main className="flex-1 min-w-0 w-full overflow-x-hidden p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
              <span>ConnectHub</span>
              <span>/</span>
              <span className="text-neutral-700 font-medium">
                {activeTab === "overview" && "Executive briefing"}
                {activeTab === "applications" && "Cohort admissions"}
                {activeTab === "messages" && "Contact messages"}
                {activeTab === "inquiries" && "Volunteer and partner proposals"}
                {activeTab === "gallery" && "Community photo archive"}
                {activeTab === "programs" && "Curricula catalog"}
                {activeTab === "events" && "Workshops and bootcamps"}
                {activeTab === "impact" && "Operational impact metrics"}
                {activeTab === "settings" && "Organization profile"}
                {activeTab === "digihub" && "Self-teaching LMS & 1-on-1 mentorship"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              {activeTab === "overview" && "Operational Briefing"}
              {activeTab === "applications" && "Cohort Admissions and Intake"}
              {activeTab === "messages" && "Public Inquiries"}
              {activeTab === "inquiries" && "Partnership Proposals"}
              {activeTab === "gallery" && "Photo Gallery Archive"}
              {activeTab === "programs" && "Programs Management"}
              {activeTab === "events" && "Bootcamps and Event Calendar"}
              {activeTab === "impact" && "Verified Impact Metrics"}
              {activeTab === "settings" && "Organization and Contact Settings"}
              {activeTab === "digihub" && "DIGIHub LMS & Mentorship Management"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "gallery" && (
              <button
                onClick={() => setShowAddImageModal(true)}
                className="px-4 py-2.5 rounded-xl font-bold bg-brand-blue text-white hover:bg-brand-blue-dark transition-all text-xs flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Add photo
              </button>
            )}
            <button
              onClick={() => {
                setStoreState(getStore());
                triggerToast("Data synchronized with local storage!");
              }}
              className="px-3 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync changes
            </button>
          </div>
        </div>

        {/* ─── TAB 1: OVERVIEW ────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Operational Briefing Banner */}
            <div className="rounded-3xl bg-neutral-900 text-white p-5 sm:p-8 border border-neutral-800 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                    <span>Active intake cycle: Cohort 2026-B</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Youth Digital Skills & Software Foundations
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Reviewing incoming candidate applications from the public enrollment portal across Greater Accra and Ashanti. Screening decisions update prospective students directly via email and WhatsApp.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setAppFilter("pending");
                      setActiveTab("applications");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-brand-yellow text-neutral-950 hover:bg-yellow-400 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Clock className="w-4 h-4 text-neutral-950" />
                    <span>Triage {pendingAppsCount} pending applicants</span>
                  </button>
                  <button
                    onClick={() => setShowAddAppModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
                  >
                    <UserPlus className="w-4 h-4 text-neutral-300" />
                    <span>Register walk-in candidate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scannable Operational Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div
                onClick={() => {
                  setAppFilter("all");
                  setActiveTab("applications");
                }}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-brand-blue cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-500 group-hover:text-brand-blue transition-colors">
                    Admissions pipeline
                  </span>
                  <Users className="w-4 h-4 text-neutral-400 group-hover:text-brand-blue transition-colors" />
                </div>
                <div className="text-3xl font-bold tabular-nums text-neutral-900 tracking-tight mb-1">
                  {store.applications.length}
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  <strong className="text-brand-blue font-semibold">{pendingAppsCount}</strong> awaiting triage
                </div>
              </div>

              <div
                onClick={() => setActiveTab("messages")}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-amber-500 cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-500 group-hover:text-amber-600 transition-colors">
                    Public messages
                  </span>
                  <MessageSquare className="w-4 h-4 text-neutral-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <div className="text-3xl font-bold tabular-nums text-neutral-900 tracking-tight mb-1">
                  {store.messages.length}
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  <strong className="text-amber-600 font-semibold">{unreadMsgCount}</strong> unread inquiries
                </div>
              </div>

              <div
                onClick={() => setActiveTab("gallery")}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-emerald-600 cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-500 group-hover:text-emerald-700 transition-colors">
                    Community gallery
                  </span>
                  <ImageIcon className="w-4 h-4 text-neutral-400 group-hover:text-emerald-700 transition-colors" />
                </div>
                <div className="text-3xl font-bold tabular-nums text-neutral-900 tracking-tight mb-1">
                  {store.gallery.length}
                </div>
                <div className="text-xs text-emerald-700 font-medium">
                  Verified public photos
                </div>
              </div>

              <div
                onClick={() => setActiveTab("programs")}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-brand-blue cursor-pointer transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-neutral-500 group-hover:text-brand-blue transition-colors">
                    Active curricula
                  </span>
                  <BookOpen className="w-4 h-4 text-neutral-400 group-hover:text-brand-blue transition-colors" />
                </div>
                <div className="text-3xl font-bold tabular-nums text-neutral-900 tracking-tight mb-1">
                  {store.programs.length}
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  Accra and Kumasi hubs
                </div>
              </div>
            </div>

            {/* Recent Submissions Feed */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Latest Applications */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <h3 className="font-bold text-sm text-neutral-900">
                      Recent cohort submissions
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark hover:underline"
                  >
                    View all applications
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {store.applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      onClick={() => openAppReview(app)}
                      className="py-3 flex items-center justify-between hover:bg-neutral-50 rounded-xl px-2.5 cursor-pointer transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-xs text-neutral-900">
                          {app.fullName}
                        </div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                          <span>{app.email}</span>
                          <span className="text-neutral-300">/</span>
                          <span>{app.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                            app.status === "accepted"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : app.status === "rejected"
                              ? "bg-rose-50 text-rose-800 border border-rose-200"
                              : app.status === "under_review"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {app.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Contact Messages */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-sm text-neutral-900">
                      Recent inquiries and feedback
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark hover:underline"
                  >
                    View all messages
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {store.messages.slice(0, 5).map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMsg(msg)}
                      className="py-3 flex items-center justify-between hover:bg-neutral-50 rounded-xl px-2.5 cursor-pointer transition-colors"
                    >
                      <div className="max-w-xs space-y-0.5">
                        <span className="font-semibold text-xs text-neutral-900 block truncate">
                          {msg.subject}
                        </span>
                        <div className="text-[11px] text-neutral-500 truncate">
                          <span>{msg.name}</span>
                          <span className="text-neutral-300 mx-1.5">/</span>
                          <span>{msg.email}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          msg.status === "unread"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: APPLICATIONS (COHORT APPLICATION VIEWER) ── */}
        {activeTab === "applications" && (() => {
          const filteredApps = store.applications
            .filter((a) => {
              const matchStatus = appFilter === "all" || a.status === appFilter;
              const matchProgram =
                appProgramFilter === "all" || a.programOfInterest === appProgramFilter;
              const matchExp =
                appExperienceFilter === "all" || a.digitalExperience === appExperienceFilter;
              const matchEdu =
                appEducationFilter === "all" || a.educationLevel === appEducationFilter;
              const q = appSearch.toLowerCase().trim();
              const matchSearch =
                q === "" ||
                a.fullName.toLowerCase().includes(q) ||
                a.email.toLowerCase().includes(q) ||
                a.phone.toLowerCase().includes(q) ||
                a.location.toLowerCase().includes(q) ||
                (a.notes && a.notes.toLowerCase().includes(q));
              return matchStatus && matchProgram && matchExp && matchEdu && matchSearch;
            })
            .sort((a, b) => {
              if (appSortBy === "newest") {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              }
              if (appSortBy === "oldest") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
              }
              if (appSortBy === "name_asc") {
                return a.fullName.localeCompare(b.fullName);
              }
              if (appSortBy === "name_desc") {
                return b.fullName.localeCompare(a.fullName);
              }
              return 0;
            });

          const appCounts = {
            total: store.applications.length,
            pending: store.applications.filter((a) => a.status === "pending").length,
            under_review: store.applications.filter((a) => a.status === "under_review").length,
            accepted: store.applications.filter((a) => a.status === "accepted").length,
            rejected: store.applications.filter((a) => a.status === "rejected").length,
          };

          const isAllFilteredSelected =
            filteredApps.length > 0 &&
            filteredApps.every((a) => selectedAppIds.includes(a.id));

          const hasActiveFilters =
            appSearch !== "" ||
            appFilter !== "all" ||
            appProgramFilter !== "all" ||
            appExperienceFilter !== "all" ||
            appEducationFilter !== "all" ||
            appSortBy !== "newest";

          const resetAllFilters = () => {
            setAppSearch("");
            setAppFilter("all");
            setAppProgramFilter("all");
            setAppExperienceFilter("all");
            setAppEducationFilter("all");
            setAppSortBy("newest");
          };

          return (
            <div className="space-y-6">
              {/* Header & Primary Actions */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                    Cohort Admissions Workspace
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl leading-relaxed">
                    Review and triage incoming student registrations from the public enrollment portal, conduct admissions screenings, contact candidates directly, and track cohort capacity.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => exportApplicationsToCSV(filteredApps)}
                    className="px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs flex items-center gap-2 shadow-2xs transition-colors"
                  >
                    <Download className="w-4 h-4 text-brand-blue" />
                    <span>Export candidate roster ({filteredApps.length})</span>
                  </button>

                  <button
                    onClick={() => setShowAddAppModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register walk-in candidate</span>
                  </button>
                </div>
              </div>

              {/* Segmented Admissions Pipeline */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-2 shadow-2xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  <button
                    onClick={() => setAppFilter("all")}
                    className={`p-3.5 rounded-xl text-left transition-all ${
                      appFilter === "all"
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${appFilter === "all" ? "text-neutral-300" : "text-neutral-500"}`}>
                        All submissions
                      </span>
                      <Users className={`w-3.5 h-3.5 ${appFilter === "all" ? "text-white" : "text-neutral-400"}`} />
                    </div>
                    <div className="text-2xl font-bold tabular-nums mt-1">{appCounts.total}</div>
                  </button>

                  <button
                    onClick={() => setAppFilter("pending")}
                    className={`p-3.5 rounded-xl text-left transition-all ${
                      appFilter === "pending"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-amber-50/60 hover:bg-amber-50 text-neutral-800 border border-amber-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${appFilter === "pending" ? "text-amber-100" : "text-amber-800"}`}>
                        Pending triage
                      </span>
                      <Clock className={`w-3.5 h-3.5 ${appFilter === "pending" ? "text-white" : "text-amber-600"}`} />
                    </div>
                    <div className="text-2xl font-bold tabular-nums mt-1">{appCounts.pending}</div>
                  </button>

                  <button
                    onClick={() => setAppFilter("under_review")}
                    className={`p-3.5 rounded-xl text-left transition-all ${
                      appFilter === "under_review"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-blue-50/60 hover:bg-blue-50 text-neutral-800 border border-blue-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${appFilter === "under_review" ? "text-blue-100" : "text-blue-800"}`}>
                        Under review / waitlist
                      </span>
                      <Eye className={`w-3.5 h-3.5 ${appFilter === "under_review" ? "text-white" : "text-blue-600"}`} />
                    </div>
                    <div className="text-2xl font-bold tabular-nums mt-1">{appCounts.under_review}</div>
                  </button>

                  <button
                    onClick={() => setAppFilter("accepted")}
                    className={`p-3.5 rounded-xl text-left transition-all ${
                      appFilter === "accepted"
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-emerald-50/60 hover:bg-emerald-50 text-neutral-800 border border-emerald-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${appFilter === "accepted" ? "text-emerald-100" : "text-emerald-800"}`}>
                        Accepted candidates
                      </span>
                      <CheckCircle2 className={`w-3.5 h-3.5 ${appFilter === "accepted" ? "text-white" : "text-emerald-600"}`} />
                    </div>
                    <div className="text-2xl font-bold tabular-nums mt-1">{appCounts.accepted}</div>
                  </button>

                  <button
                    onClick={() => setAppFilter("rejected")}
                    className={`p-3.5 rounded-xl text-left transition-all ${
                      appFilter === "rejected"
                        ? "bg-rose-700 text-white shadow-xs"
                        : "bg-rose-50/60 hover:bg-rose-50 text-neutral-800 border border-rose-200/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${appFilter === "rejected" ? "text-rose-100" : "text-rose-800"}`}>
                        Declined
                      </span>
                      <UserX className={`w-3.5 h-3.5 ${appFilter === "rejected" ? "text-white" : "text-rose-600"}`} />
                    </div>
                    <div className="text-2xl font-bold tabular-nums mt-1">{appCounts.rejected}</div>
                  </button>
                </div>
              </div>

              {/* Multi-Criteria Search & Filter Controls */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Search box */}
                  <div className="md:col-span-5 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search applicant name, email, phone, location, or notes..."
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                    {appSearch && (
                      <button
                        onClick={() => setAppSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Program Filter */}
                  <div className="md:col-span-3">
                    <select
                      value={appProgramFilter}
                      onChange={(e) => setAppProgramFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-700 font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    >
                      <option value="all">All programs</option>
                      {store.programs.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div className="md:col-span-2">
                    <select
                      value={appExperienceFilter}
                      onChange={(e) => setAppExperienceFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-700 font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    >
                      <option value="all">All experience</option>
                      <option value="beginner">Beginner</option>
                      <option value="basic">Basic computer skills</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="some-coding">Some coding experience</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div className="md:col-span-2">
                    <select
                      value={appSortBy}
                      onChange={(e) =>
                        setAppSortBy(
                          e.target.value as "newest" | "oldest" | "name_asc" | "name_desc"
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-700 font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    >
                      <option value="newest">Newest received first</option>
                      <option value="oldest">Oldest received first</option>
                      <option value="name_asc">Name (A to Z)</option>
                      <option value="name_desc">Name (Z to A)</option>
                    </select>
                  </div>
                </div>

                {/* Sub-filter row: Education level + Active Filter reset */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-neutral-500 font-medium">Education filter:</span>
                    <select
                      value={appEducationFilter}
                      onChange={(e) => setAppEducationFilter(e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-neutral-200 text-xs bg-white text-neutral-700 focus:outline-none"
                    >
                      <option value="all">All education levels</option>
                      <option value="junior-high">Junior High (JHS)</option>
                      <option value="high-school">Senior High (SHS)</option>
                      <option value="vocational">Vocational / Technical</option>
                      <option value="undergraduate">University / Tertiary</option>
                      <option value="graduate">Postgraduate</option>
                      <option value="other">Other / Self-taught</option>
                    </select>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={resetAllFilters}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline transition-colors"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>
              </div>

              {/* Batch Action Bar */}
              {selectedAppIds.length > 0 && (
                <div className="bg-neutral-900 text-white rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-md border border-neutral-800 transition-all">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-brand-yellow" />
                    <span className="text-xs font-semibold text-neutral-100">
                      {selectedAppIds.length} candidate{selectedAppIds.length > 1 ? "s" : ""} selected for batch review
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleBatchStatusUpdate("accepted")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Accept candidates
                    </button>
                    <button
                      onClick={() => handleBatchStatusUpdate("under_review")}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5" /> Place on waitlist
                    </button>
                    <button
                      onClick={() => handleBatchStatusUpdate("rejected")}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <UserX className="w-3.5 h-3.5" /> Decline candidates
                    </button>
                    <button
                      onClick={handleBatchDelete}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-rose-900/60 text-rose-300 border border-neutral-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                    <button
                      onClick={() => setSelectedAppIds([])}
                      className="px-2.5 py-1.5 text-xs text-neutral-400 hover:text-white underline transition-colors"
                    >
                      Deselect all
                    </button>
                  </div>
                </div>
              )}

              {/* Table Container */}
              <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xs">
                <div className="p-4 bg-neutral-50/80 border-b border-neutral-200 flex items-center justify-between text-xs text-neutral-600 font-medium">
                  <span>
                    Showing <strong className="text-neutral-900 font-semibold">{filteredApps.length}</strong> of{" "}
                    <strong className="text-neutral-900 font-semibold">{store.applications.length}</strong> candidates
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Click candidate name or Review screening for full dossier
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200 font-semibold text-xs text-neutral-600">
                        <th className="py-3.5 px-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={isAllFilteredSelected}
                            onChange={() => {
                              const fIds = filteredApps.map((a) => a.id);
                              if (isAllFilteredSelected) {
                                setSelectedAppIds((prev) =>
                                  prev.filter((id) => !fIds.includes(id))
                                );
                              } else {
                                setSelectedAppIds((prev) =>
                                  Array.from(new Set([...prev, ...fIds]))
                                );
                              }
                            }}
                            className="rounded border-neutral-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                          />
                        </th>
                        <th className="py-3.5 px-4 font-semibold">Applicant</th>
                        <th className="py-3.5 px-4 font-semibold">Program track & background</th>
                        <th className="py-3.5 px-4 font-semibold">Location & education</th>
                        <th className="py-3.5 px-4 font-semibold">Date applied</th>
                        <th className="py-3.5 px-4 font-semibold">Admissions status</th>
                        <th className="py-3.5 px-4 text-center font-semibold">Direct contact</th>
                        <th className="py-3.5 px-4 text-right font-semibold">Screening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredApps.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-16 text-center">
                            <div className="max-w-sm mx-auto space-y-3">
                              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                                <Search className="w-6 h-6" />
                              </div>
                              <h4 className="font-semibold text-neutral-900 text-sm">
                                No cohort submissions found
                              </h4>
                              <p className="text-xs text-neutral-500">
                                No applications match your current search keywords or filters.
                              </p>
                              <div className="pt-2 flex justify-center gap-2">
                                {hasActiveFilters && (
                                  <button
                                    onClick={resetAllFilters}
                                    className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs"
                                  >
                                    Reset filters
                                  </button>
                                )}
                                <button
                                  onClick={() => setShowAddAppModal(true)}
                                  className="px-3.5 py-1.5 rounded-xl bg-brand-blue text-white font-semibold text-xs"
                                >
                                  Register candidate
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredApps.map((app) => {
                          const isSelected = selectedAppIds.includes(app.id);
                          const initials = app.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase();

                          return (
                            <tr
                              key={app.id}
                              className={`transition-colors ${
                                isSelected ? "bg-brand-blue/5" : "hover:bg-neutral-50/70"
                              }`}
                            >
                              {/* Checkbox */}
                              <td className="py-4 px-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    setSelectedAppIds((prev) =>
                                      prev.includes(app.id)
                                        ? prev.filter((id) => id !== app.id)
                                        : [...prev, app.id]
                                    );
                                  }}
                                  className="rounded border-neutral-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                                />
                              </td>

                              {/* Applicant */}
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                    {initials}
                                  </div>
                                  <div>
                                    <button
                                      onClick={() => openAppReview(app)}
                                      className="font-semibold text-neutral-900 hover:text-brand-blue text-left block transition-colors"
                                    >
                                      {app.fullName}
                                    </button>
                                    <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
                                      <a href={`mailto:${app.email}`} className="hover:text-brand-blue transition-colors">
                                        {app.email}
                                      </a>
                                      <span className="text-neutral-300">/</span>
                                      <span>{app.phone}</span>
                                    </div>
                                    {app.notes && (
                                      <span className="inline-block mt-1 text-[11px] text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200 truncate max-w-xs">
                                        Note: {app.notes}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Program & Experience */}
                              <td className="py-4 px-4">
                                <span className="font-semibold text-neutral-900 block text-xs capitalize">
                                  {app.programOfInterest.replace(/-/g, " ")}
                                </span>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium capitalize bg-neutral-100 text-neutral-600">
                                  {app.digitalExperience} background
                                </span>
                              </td>

                              {/* Location & Education */}
                              <td className="py-4 px-4 text-neutral-600">
                                <div className="font-medium text-neutral-800">
                                  {app.location} <span className="text-neutral-400 font-normal">({app.age} yrs)</span>
                                </div>
                                <span className="text-[11px] text-neutral-500 capitalize block mt-0.5">
                                  {app.educationLevel.replace("-", " ")}
                                </span>
                              </td>

                              {/* Applied Date */}
                              <td className="py-4 px-4 text-neutral-500 whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                  <span>{app.date}</span>
                                </div>
                              </td>

                              {/* Decision dropdown */}
                              <td className="py-4 px-4 whitespace-nowrap">
                                <select
                                  value={app.status}
                                  onChange={(e) =>
                                    updateAppStatus(
                                      app.id,
                                      e.target.value as ApplicationSubmission["status"]
                                    )
                                  }
                                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer focus:outline-none transition-colors ${
                                    app.status === "accepted"
                                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                      : app.status === "rejected"
                                      ? "bg-rose-50 text-rose-800 border-rose-300"
                                      : app.status === "under_review"
                                      ? "bg-blue-50 text-blue-800 border-blue-300"
                                      : "bg-amber-50 text-amber-800 border-amber-300"
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="under_review">Under review</option>
                                  <option value="accepted">Accepted</option>
                                  <option value="rejected">Declined</option>
                                </select>
                              </td>

                              {/* Quick Contact Shortcuts */}
                              <td className="py-4 px-4 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1.5">
                                  <a
                                    href={`tel:${app.phone}`}
                                    title={`Call ${app.fullName}`}
                                    className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-brand-blue transition-colors"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={`mailto:${app.email}`}
                                    title={`Email ${app.fullName}`}
                                    className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-brand-blue transition-colors"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={getWhatsAppUrl(app.phone, app.fullName)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`WhatsApp ${app.fullName}`}
                                    className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => openAppReview(app)}
                                    className="px-2.5 py-1.5 rounded-lg bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white font-semibold text-xs transition-colors flex items-center gap-1"
                                  >
                                    <Eye className="w-3.5 h-3.5" /> Review screening
                                  </button>
                                  <button
                                    onClick={() => handleDeleteApp(app.id, app.fullName)}
                                    title="Delete application"
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 3: CONTACT MESSAGES ────────────────────── */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Inbound Public Inquiries ({store.messages.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  General inquiries, partner outreach, and community feedback submitted via public contact channels.
                </p>
              </div>
            </div>

            <div className="divide-y divide-neutral-100">
              {store.messages.map((msg) => (
                <div
                  key={msg.id}
                  className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50/70 p-3 rounded-2xl transition-colors"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-sm text-neutral-900">{msg.subject}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          msg.status === "unread"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{msg.message}</p>
                    <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                      <span>From: <strong className="text-neutral-700 font-semibold">{msg.name}</strong></span>
                      <span className="text-neutral-300">/</span>
                      <span>{msg.email}</span>
                      <span className="text-neutral-300">/</span>
                      <span>{msg.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedMsg(msg)}
                      className="px-3.5 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors"
                    >
                      Read full inquiry
                    </button>
                    {msg.status === "unread" && (
                      <button
                        onClick={() => updateMsgStatus(msg.id, "read")}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-blue text-white hover:bg-brand-blue-dark text-xs font-semibold shadow-2xs transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 4: INQUIRIES & VOLUNTEERS ──────────────── */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="pb-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg text-neutral-900">
                Volunteer and Partner Submissions ({store.inquiries.length})
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Proposals from mentors, guest instructors, and corporate partners supporting tech literacy in Ghana.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {store.inquiries.map((inq) => (
                <div key={inq.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-brand-blue/10 text-brand-blue">
                      {inq.type}
                    </span>
                    <span className="text-[11px] text-neutral-400">{inq.date}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-neutral-900">{inq.fullName}</h4>
                    <p className="text-xs text-neutral-500">{inq.organization || "Independent volunteer"}</p>
                  </div>
                  <div className="text-xs text-neutral-700 bg-white p-3.5 rounded-xl border border-neutral-200">
                    <strong className="font-semibold text-neutral-900">Focus area:</strong> {inq.category || "General"}
                    <p className="mt-1 text-neutral-600 line-clamp-3 leading-relaxed">{inq.message}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-neutral-500">Contact: {inq.phone}</span>
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-brand-blue font-semibold hover:underline"
                    >
                      Contact partner via email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 5: GALLERY MANAGER ─────────────────────── */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  Community Gallery Collection ({store.gallery.length} Photos)
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Only administrators can upload and delete images from this panel. All published images immediately appear on the public Gallery page.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowAddImageModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold bg-brand-green text-white hover:bg-emerald-700 text-xs flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Camera className="w-4 h-4" /> Select from Device Gallery
                </button>
                <button
                  onClick={() => setShowAddImageModal(true)}
                  className="px-4 py-2.5 rounded-xl font-bold bg-brand-blue text-white hover:bg-brand-blue-dark text-xs flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Photo
                </button>
              </div>
            </div>

            {/* Quick Upload Dropzone from Device Gallery */}
            <div
              onClick={() => quickFileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  handleProcessFile(file);
                  setShowAddImageModal(true);
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragOver
                  ? "border-brand-blue bg-brand-blue/5 scale-[1.01]"
                  : "border-neutral-300 hover:border-brand-blue bg-white hover:bg-neutral-50/80 shadow-xs"
              }`}
            >
              <input
                type="file"
                ref={quickFileInputRef}
                accept="image/*,video/*"
                onChange={handleQuickUploadSelect}
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-neutral-800">
                    Tap to Choose Photo or Video from Device or Drag & Drop Here
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Opens your mobile library or computer files. Photos & Videos (MP4, WebM, MOV) supported.
                  </p>
                </div>
                <span className="sm:ml-auto px-3.5 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-bold hover:bg-neutral-200">
                  Browse Files
                </span>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {store.gallery.map((img) => (
                <div
                  key={img.id}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs relative flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
                    {isVideoMedia(img.src) ? (
                      <video
                        src={img.src}
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-xs">
                        {img.category}
                      </span>
                      {isVideoMedia(img.src) && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-600/90 text-white backdrop-blur-xs">
                          Video
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-neutral-800 line-clamp-2 mb-1">
                        {img.caption || img.alt}
                      </p>
                      <span className="text-[10px] text-neutral-400">
                        Added: {img.dateAdded}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="mt-3 w-full py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: PROGRAMS MANAGER ────────────────────── */}
        {activeTab === "programs" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Core Program Offerings ({store.programs.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage curriculum tracks, durations, and target audiences shown across public program pages.
                </p>
              </div>
              <button
                onClick={() => setShowAddProgramModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add new program</span>
              </button>
            </div>

            <div className="space-y-4">
              {store.programs.map((prog, idx) => (
                <div key={prog.slug} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-brand-blue/10 text-brand-blue font-bold text-xs flex items-center justify-center shrink-0">
                        {prog.number}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900">{prog.title}</h4>
                        <span className="text-[11px] text-neutral-400 font-mono">slug: /{prog.slug}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700">
                        {prog.duration}
                      </span>
                      <button
                        onClick={() => handleDeleteProgram(prog.slug)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
                        title="Delete Program"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Program title</label>
                      <input
                        type="text"
                        value={prog.title}
                        onChange={(e) => {
                          const updated = { ...store };
                          updated.programs[idx].title = e.target.value;
                          setStoreState(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Duration & pacing</label>
                      <input
                        type="text"
                        value={prog.duration}
                        onChange={(e) => {
                          const updated = { ...store };
                          updated.programs[idx].duration = e.target.value;
                          setStoreState(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Target learner background</label>
                      <input
                        type="text"
                        value={prog.audience}
                        onChange={(e) => {
                          const updated = { ...store };
                          updated.programs[idx].audience = e.target.value;
                          setStoreState(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Curriculum description</label>
                    <textarea
                      rows={2}
                      value={prog.description}
                      onChange={(e) => {
                        const updated = { ...store };
                        updated.programs[idx].description = e.target.value;
                        setStoreState(updated);
                      }}
                      className="w-full p-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                saveStore(store);
                triggerToast("Programs catalog updated live!");
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-semibold text-xs hover:bg-brand-blue-dark transition-colors shadow-2xs"
            >
              Save curriculum changes
            </button>
          </div>
        )}

        {/* ─── TAB: RESOURCES & TOOLKITS MANAGER ─────────── */}
        {activeTab === "resources" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Learning Toolkits & Guides ({store.resources?.length || 0})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Create, edit, or publish self-paced digital guides, AI toolkits, and career preparation syllabi.
                </p>
              </div>
              <button
                onClick={handleOpenAddResourceModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add new toolkit/guide</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {(store.resources || []).map((res) => (
                <div key={res.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue">
                        {res.category}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500">
                        {res.type} · {res.readTime}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-neutral-900 leading-snug">{res.title}</h4>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600">
                      Level: {res.level}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditResourceModal(res)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteResource(res.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
                        title="Delete Toolkit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: DIGIHUB LMS, CERTIFICATES & MENTORSHIP MANAGER ────────── */}
        {activeTab === "digihub" && (() => {
          const allLessons = getAllLessons();
          const allCoursesList = getAllCourses();
          const filteredSessions = lmsSessions.filter(
            (s) => lmsStatusFilter === "all" || s.status === lmsStatusFilter
          );

          const handleStatusChange = (id: string, newStatus: MentorshipSession["status"]) => {
            updateSessionStatus(id, newStatus);
            setLmsSessions(getBookedSessions());
            triggerToast(`Mentorship session marked as ${newStatus}`);
          };

          const handleSaveCertSettings = () => {
            const saved = saveCertificateSettings({
              signerName: sigFormName.trim(),
              signerTitle: sigFormTitle.trim(),
              institutionName: sigFormInstitution.trim(),
              signatureUrl: sigFormUrl,
              autoApproveOnCompletion: sigAutoApprove,
            });
            setCertSettings(saved);
            triggerToast("Faculty signature and certificate authority settings saved!");
          };

          const handleSignatureFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (!file.type.startsWith("image/") && !file.name.endsWith(".svg")) {
              alert("Please select a valid image file (PNG, JPG, SVG, WebP).");
              return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
              const dataUrl = event.target?.result as string;
              if (dataUrl) {
                setSigFormUrl(dataUrl);
                triggerToast("Signature loaded from device. Click 'Save Certificate Settings' to apply.");
              }
            };
            reader.readAsDataURL(file);
          };

          const handleResetDefaultSignature = () => {
            setSigFormUrl(DEFAULT_OFFICIAL_SIGNATURE);
            triggerToast("Reset to official executive ink signature.");
          };

          const handleApproveCert = (certId: string, studentName: string) => {
            const approved = adminApproveCertificate(certId, sigFormName, sigFormUrl);
            if (approved) {
              setAllCertificates(getAllCertificates());
              triggerToast(`Approved and affixed signature to certificate for ${studentName}!`);
            }
          };

          const handleRejectCert = (certId: string, studentName: string) => {
            const reason = window.prompt(
              `Enter reason for rejecting certificate for ${studentName}:`,
              "Course practical lab review incomplete."
            );
            if (reason !== null) {
              adminRejectCertificate(certId, reason);
              setAllCertificates(getAllCertificates());
              triggerToast(`Certificate for ${studentName} rejected.`);
            }
          };

          const handleExportCertificatesCSV = () => {
            const headers = [
              "Certificate ID",
              "Student ID",
              "Student Name",
              "Student Email",
              "Course Title",
              "Course ID",
              "Status",
              "Completion Date",
              "Approved Date",
              "Approved By",
              "Signer Name",
              "Signer Title",
              "Verification Code",
            ];
            const rows = allCertificates.map((c) => [
              `"${c.id}"`,
              `"${c.studentId}"`,
              `"${c.studentName.replace(/"/g, '""')}"`,
              `"${c.studentEmail}"`,
              `"${c.courseTitle.replace(/"/g, '""')}"`,
              `"${c.courseId}"`,
              `"${c.status}"`,
              `"${c.completionDate}"`,
              `"${c.approvedDate || ""}"`,
              `"${c.approvedBy || ""}"`,
              `"${c.signerName || ""}"`,
              `"${c.signerTitle || ""}"`,
              `"${c.verificationCode}"`,
            ].join(","));
            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `digiconnect_certificates_${new Date().toISOString().split("T")[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            triggerToast("Exported verified credentials roster (CSV)");
          };

          const pendingCerts = allCertificates.filter((c) => c.status === "pending_approval");
          const approvedCerts = allCertificates.filter((c) => c.status === "approved");
          const rejectedCerts = allCertificates.filter((c) => c.status === "rejected");

          const filteredCertificates = allCertificates.filter((c) => {
            const q = certSearchQuery.toLowerCase().trim();
            const matchesSearch =
              !q ||
              c.studentName.toLowerCase().includes(q) ||
              c.studentEmail.toLowerCase().includes(q) ||
              c.courseTitle.toLowerCase().includes(q) ||
              c.id.toLowerCase().includes(q) ||
              c.verificationCode.toLowerCase().includes(q);

            if (!matchesSearch) return false;
            if (certStatusFilter === "pending_approval") return c.status === "pending_approval";
            if (certStatusFilter === "approved") return c.status === "approved";
            if (certStatusFilter === "rejected") return c.status === "rejected";
            return true;
          });

          // Filter students
          const filteredStudents = lmsUsers.filter((u) => {
            const q = studentSearchQuery.toLowerCase().trim();
            const matchesSearch =
              !q ||
              u.name.toLowerCase().includes(q) ||
              u.email.toLowerCase().includes(q) ||
              u.currentTrackId.toLowerCase().includes(q);

            if (!matchesSearch) return false;

            if (studentFilter === "in-progress") {
              return u.completedLessonIds.length > 0 && u.completedLessonIds.length < allLessons.length;
            }
            if (studentFilter === "certified") {
              return u.completedLessonIds.length >= allLessons.length || u.certificateClaimed;
            }
            if (studentFilter === "google") {
              return u.provider === "google";
            }
            if (studentFilter === "email") {
              return u.provider === "email";
            }
            return true;
          });

          const certifiedCount = lmsUsers.filter(
            (u) => u.completedLessonIds.length >= allLessons.length || u.certificateClaimed
          ).length;
          const googleUserCount = lmsUsers.filter((u) => u.provider === "google").length;
          const emailUserCount = lmsUsers.filter((u) => u.provider === "email").length;

          const handleExportStudentsCSV = () => {
            const headers = [
              "Student ID",
              "Full Name",
              "Email",
              "Auth Provider",
              "Role",
              "Enrolled Courses",
              "Current Track",
              "Modules Completed Count",
              "Total Modules",
              "Progress Percentage",
              "Completed Module IDs",
              "Certificate Claimed",
              "Enrolled Date",
              "Last Active",
            ];

            const rows = lmsUsers.map((u) => {
              const completedCount = u.completedLessonIds.length;
              const pct = Math.round((completedCount / allLessons.length) * 100);
              return [
                `"${u.id}"`,
                `"${u.name.replace(/"/g, '""')}"`,
                `"${u.email}"`,
                `"${u.provider}"`,
                `"${u.role}"`,
                `"${(u.enrolledCourseIds || []).join("; ")}"`,
                `"${u.currentTrackId}"`,
                completedCount,
                allLessons.length,
                `"${pct}%"`,
                `"${u.completedLessonIds.join("; ")}"`,
                u.certificateClaimed ? "YES" : "NO",
                `"${u.createdAt}"`,
                `"${u.lastActive}"`,
              ].join(",");
            });

            const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `digihub_students_progress_${new Date().toISOString().split("T")[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            triggerToast("Exported student roster & progress report (CSV)");
          };

          const handleDeleteStudent = (studentId: string, studentName: string) => {
            if (
              window.confirm(
                `Are you sure you want to remove student "${studentName}"? Their progress will be permanently deleted.`
              )
            ) {
              adminDeleteUser(studentId);
              setLmsUsers(getAllLMSUsers());
              if (selectedLmsStudent?.id === studentId) {
                setSelectedLmsStudent(null);
              }
              triggerToast(`Removed student ${studentName}`);
            }
          };

          return (
            <div className="space-y-8">
              {/* ─── CLOUD ENGINE SYNCHRONIZATION & HEALTH STATUS ─── */}
              <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-indigo-950 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-neutral-700/80">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <span className={`w-2 h-2 rounded-full ${isLmsSyncing ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
                        <span>Cloud Engine Active</span>
                      </span>
                      <span className="text-xs text-neutral-400">•</span>
                      <span className="text-xs text-neutral-300 font-mono">Backend Port: 5000</span>
                      <span className="text-xs text-neutral-400">•</span>
                      <span className="text-xs text-neutral-300">Bi-directional LMS Sync</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                      DIGIHub Cloud Synchronization & Analytics Hub
                    </h3>
                    <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                      {lmsCloudSyncStatus}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      onClick={handleSyncLMSMaster}
                      disabled={isLmsSyncing}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-sm transition active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLmsSyncing ? "animate-spin text-amber-300" : ""}`} />
                      <span>{isLmsSyncing ? "Synchronizing..." : "Sync All with Cloud"}</span>
                    </button>

                    <button
                      onClick={handleOpenCreateCourse}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4 text-emerald-400" />
                      <span>Create New Course</span>
                    </button>
                  </div>
                </div>

                {/* Live Telemetry Pills */}
                <div className="mt-5 pt-4 border-t border-neutral-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-neutral-400">Total Courses Synced</div>
                    <div className="text-base font-bold text-white mt-0.5">{allCoursesState.length} Curricula</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-neutral-400">Interactive Labs Suite</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">4 Sandbox Engines</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-neutral-400">Registered Student Roster</div>
                    <div className="text-base font-bold text-blue-400 mt-0.5">{lmsUsers.length} Enrolled</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[11px] text-neutral-400">Cloud API Latency</div>
                    <div className="text-base font-bold text-indigo-300 mt-0.5">&lt; 15ms (Optimal)</div>
                  </div>
                </div>
              </div>

              {/* ─── INTERACTIVE LABS ACTIVITY INSPECTOR ─── */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-brand-blue" />
                      Interactive Labs Completion & Student Engagement Suite
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Real-time activity telemetry across all 4 hands-on interactive environments deployed across DIGIHub.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
                    Industry Benchmark Active
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Web Code Sandbox</div>
                        <div className="text-[10px] text-neutral-500">HTML5 • CSS • JS Engine</div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 mb-3">
                      Automated unit test assertion checker with multi-device viewport rendering and console interceptor.
                    </p>
                    <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                      Deployed in: Coding & Software Track
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Applied Cyber Defense</div>
                        <div className="text-[10px] text-neutral-500">MoMo Fraud • SQLi • Ports</div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 mb-3">
                      4 interactive modules: Ghanaian MoMo fraud, NIST password entropy cracker, SQLi sanitizer, & port scanner.
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      Deployed in: Cybersecurity Defense Track
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Python Automation Lab</div>
                        <div className="text-[10px] text-neutral-500">Terminal stdout • Variables</div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 mb-3">
                      In-browser Python interpreter with standard output stdout console, variable memory inspector, and automated tests.
                    </p>
                    <div className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      Deployed in: Python & Automation Track
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">Digital Literacy Lab</div>
                        <div className="text-[10px] text-neutral-500">Cloud Risk • Spreadsheets</div>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 mb-3">
                      Cloud drive sharing permission vulnerability inspector & interactive spreadsheet formula evaluator.
                    </p>
                    <div className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                      Deployed in: Digital Literacy Track
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Registered Students
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 mt-2">{lmsUsers.length}</div>
                  <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 font-semibold text-blue-600">
                      {googleUserCount} Google
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-neutral-700">{emailUserCount} Email</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Verified Credentials
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 mt-2">{approvedCerts.length}</div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">
                    Conferred & signed by Academic Board
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Pending Sign-Offs
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 mt-2">{pendingCerts.length}</div>
                  <div className="text-xs text-amber-600 font-medium mt-1">
                    {pendingCerts.length > 0 ? "Awaiting admin approval" : "All approvals up to date"}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Student Portal
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-brand-blue-light text-brand-blue flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link
                      href="/digihub"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 w-full justify-center px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs"
                    >
                      <span>Open DIGIHub LMS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* ─── FACULTY SIGNATORY & CERTIFICATE AUTHORITY SETTINGS ──── */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-brand-blue" />
                      Executive Faculty Signature & Certificate Authority
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Upload your official executive signature from your device, configure signatory credentials, and manage auto-approval rules.
                    </p>
                  </div>

                  <button
                    onClick={handleSaveCertSettings}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold shadow-2xs transition active:scale-[0.98] shrink-0"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Save Certificate Settings</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Signatory Fields & Auto-Approval Toggle */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Signatory Full Name
                      </label>
                      <input
                        type="text"
                        value={sigFormName}
                        onChange={(e) => setSigFormName(e.target.value)}
                        placeholder="e.g. Patrick Paul"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Signatory Official Title
                      </label>
                      <input
                        type="text"
                        value={sigFormTitle}
                        onChange={(e) => setSigFormTitle(e.target.value)}
                        placeholder="e.g. Executive Director & Head of Curriculum"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none bg-neutral-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Accrediting Institution
                      </label>
                      <input
                        type="text"
                        value={sigFormInstitution}
                        onChange={(e) => setSigFormInstitution(e.target.value)}
                        placeholder="e.g. DigiConnect Ghana Technical Institute"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none bg-neutral-50/50"
                      />
                    </div>

                    {/* Auto-Approval Switch */}
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">
                          Auto-Approve Upon Course Completion
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sigAutoApprove}
                            onChange={(e) => setSigAutoApprove(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-relaxed">
                        When enabled, student transcripts that reach 100% completion in all course modules will be automatically stamped with your uploaded signature and marked approved. When disabled, transcripts enter the queue below for manual review.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Signature Upload & Live Preview */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Executive Signature Image (Device Upload)
                      </label>

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={signatureFileInputRef}
                        onChange={handleSignatureFileUpload}
                        accept="image/*,.svg"
                        className="hidden"
                      />

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => signatureFileInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold shadow-2xs transition inline-flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Signature from Device</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetDefaultSignature}
                          className="px-3.5 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition"
                        >
                          Use Executive Vector Ink
                        </button>
                      </div>
                    </div>

                    {/* Live Signature Credential Preview */}
                    <div>
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                        Live Certificate Signature Preview
                      </span>
                      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                        <div className="w-48 h-20 flex items-center justify-center">
                          {sigFormUrl ? (
                            <img
                              src={sigFormUrl}
                              alt="Official Signature Preview"
                              className="max-h-18 max-w-full object-contain filter drop-shadow-xs"
                            />
                          ) : (
                            <span className="text-xs text-neutral-400 italic">No signature uploaded</span>
                          )}
                        </div>
                        <div className="w-48 h-px bg-neutral-400 mt-2 mb-1" />
                        <div className="text-xs font-bold text-neutral-900">{sigFormName || "Signatory Name"}</div>
                        <div className="text-[11px] text-neutral-500">{sigFormTitle || "Signatory Title"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── CERTIFICATE APPROVALS & ISSUED CREDENTIALS QUEUE ──── */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Student Certificate Approvals & Issued Credentials ({allCertificates.length})
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Review completed coursework transcripts, approve and affix executive signature, or reject credentials with an administrative note.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleExportCertificatesCSV}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700 hover:text-neutral-900 text-xs font-semibold shadow-2xs transition"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Export Credentials (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Search & Status Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search certificates by student name, email, course title, or ID..."
                      value={certSearchQuery}
                      onChange={(e) => setCertSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none bg-neutral-50/50"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar shrink-0">
                    {[
                      { id: "all", label: `All (${allCertificates.length})` },
                      { id: "pending_approval", label: `Pending Approval (${pendingCerts.length})` },
                      { id: "approved", label: `Approved & Signed (${approvedCerts.length})` },
                      { id: "rejected", label: `Rejected (${rejectedCerts.length})` },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setCertStatusFilter(tab.id as any)}
                        className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                          certStatusFilter === tab.id
                            ? "bg-white text-neutral-900 shadow-2xs font-semibold"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certificates Table */}
                {filteredCertificates.length === 0 ? (
                  <div className="py-12 text-center text-neutral-400 text-xs bg-neutral-50/50 rounded-2xl border border-dashed border-neutral-200">
                    No certificate records matching your filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-100 text-neutral-400 uppercase text-[10px] tracking-wider">
                          <th className="pb-3 font-semibold">Student</th>
                          <th className="pb-3 font-semibold">Course & Credential ID</th>
                          <th className="pb-3 font-semibold">Completion / Conferred</th>
                          <th className="pb-3 font-semibold">Signatory</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredCertificates.map((cert) => {
                          const isPending = cert.status === "pending_approval";
                          const isApproved = cert.status === "approved";
                          const isRejected = cert.status === "rejected";

                          return (
                            <tr key={cert.id} className="hover:bg-neutral-50/80 transition">
                              {/* Student Info */}
                              <td className="py-4 pr-3">
                                <div>
                                  <div className="font-bold text-neutral-900">{cert.studentName}</div>
                                  <div className="text-[11px] text-neutral-500">{cert.studentEmail}</div>
                                </div>
                              </td>

                              {/* Course Title & Credential ID */}
                              <td className="py-4 pr-3">
                                <div>
                                  <div className="font-semibold text-neutral-900">{cert.courseTitle}</div>
                                  <div className="font-mono text-[10px] text-brand-blue font-bold mt-0.5">
                                    {cert.id}
                                  </div>
                                </div>
                              </td>

                              {/* Dates */}
                              <td className="py-4 pr-3">
                                <div className="text-[11px] text-neutral-700">
                                  Completed: {cert.completionDate}
                                </div>
                                {cert.approvedDate && (
                                  <div className="text-[10px] text-emerald-700 font-medium">
                                    Approved: {cert.approvedDate}
                                  </div>
                                )}
                              </td>

                              {/* Signatory */}
                              <td className="py-4 pr-3">
                                <div className="text-[11px] font-medium text-neutral-800">
                                  {cert.signerName || "DigiConnect Faculty"}
                                </div>
                                <div className="text-[10px] text-neutral-400">{cert.signerTitle || "Academic Board"}</div>
                              </td>

                              {/* Status Badge */}
                              <td className="py-4 pr-3">
                                <span
                                  className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    isApproved
                                      ? "bg-emerald-100 text-emerald-800"
                                      : isPending
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {isApproved ? "Approved & Signed" : isPending ? "Pending Review" : "Rejected"}
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                  {isPending && (
                                    <button
                                      onClick={() => handleApproveCert(cert.id, cert.studentName)}
                                      className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition shadow-2xs flex items-center gap-1"
                                      title="Approve and stamp official signature"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Approve & Sign</span>
                                    </button>
                                  )}

                                  {isPending && (
                                    <button
                                      onClick={() => handleRejectCert(cert.id, cert.studentName)}
                                      className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-[11px] transition"
                                      title="Reject certificate"
                                    >
                                      Reject
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      setSelectedCertToPreview(cert);
                                      setIsCertPreviewOpen(true);
                                    }}
                                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px] transition flex items-center gap-1"
                                    title="Preview rendered certificate"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Preview</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* ─── REGISTERED STUDENTS & PROGRESS ADMINISTRATION ──── */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-brand-blue" />
                      Registered Students & Individual Progress ({lmsUsers.length})
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Monitor student coursework completion, view enrolled courses, and manually adjust module progress.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleExportStudentsCSV}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700 hover:text-neutral-900 text-xs font-semibold shadow-2xs transition"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Export Roster (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search students by name, email, or track..."
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none bg-neutral-50/50"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar shrink-0">
                    {[
                      { id: "all", label: `All (${lmsUsers.length})` },
                      {
                        id: "in-progress",
                        label: `In Progress (${
                          lmsUsers.filter((u) => u.completedLessonIds.length > 0 && u.completedLessonIds.length < allLessons.length).length
                        })`,
                      },
                      { id: "certified", label: `Certified (${certifiedCount})` },
                      { id: "google", label: `Google (${googleUserCount})` },
                      { id: "email", label: `Email (${emailUserCount})` },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setStudentFilter(tab.id as any)}
                        className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                          studentFilter === tab.id
                            ? "bg-white text-neutral-900 shadow-2xs"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Students Table */}
                {filteredStudents.length === 0 ? (
                  <div className="py-12 text-center text-neutral-400 text-xs bg-neutral-50/50 rounded-2xl border border-dashed border-neutral-200">
                    No registered students found matching your search or filters.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-100 text-neutral-400 uppercase text-[10px] tracking-wider">
                          <th className="pb-3 font-semibold">Student & Account</th>
                          <th className="pb-3 font-semibold">Enrolled Courses</th>
                          <th className="pb-3 font-semibold min-w-[180px]">Curriculum Progress</th>
                          <th className="pb-3 font-semibold">Completed Modules</th>
                          <th className="pb-3 font-semibold">Activity</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredStudents.map((student) => {
                          const completedCount = student.completedLessonIds.length;
                          const progressPct = Math.round((completedCount / allLessons.length) * 100);
                          const isComplete = completedCount >= allLessons.length || student.certificateClaimed;
                          const enrolledCourseNames = (student.enrolledCourseIds || []).map((cid) => {
                            const c = allCoursesList.find((item) => item.id === cid);
                            return c ? c.title : cid;
                          });

                          return (
                            <tr key={student.id} className="hover:bg-neutral-50/80 transition">
                              {/* Student Info & Auth Provider */}
                              <td className="py-4 pr-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative shrink-0">
                                    {student.avatar ? (
                                      <img
                                        src={student.avatar}
                                        alt={student.name}
                                        className="w-9 h-9 rounded-xl object-cover border border-neutral-200"
                                      />
                                    ) : (
                                      <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                                        {student.name.slice(0, 2).toUpperCase()}
                                      </div>
                                    )}
                                    {student.provider === "google" && (
                                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center">
                                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                                          <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                          />
                                          <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                          />
                                          <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                          />
                                          <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                  </div>

                                  <div>
                                    <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                                      <span>{student.name}</span>
                                      {student.provider === "google" ? (
                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-red-50 text-red-700 border border-red-200">
                                          Google
                                        </span>
                                      ) : (
                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                                          Email
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-neutral-500">{student.email}</div>
                                  </div>
                                </div>
                              </td>

                              {/* Enrolled Courses */}
                              <td className="py-4 pr-3">
                                {enrolledCourseNames.length === 0 ? (
                                  <span className="text-[11px] text-neutral-400 italic">None enrolled</span>
                                ) : (
                                  <div className="flex flex-col gap-1">
                                    {enrolledCourseNames.map((cname, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 truncate max-w-[160px]"
                                        title={cname}
                                      >
                                        {cname}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </td>

                              {/* Curriculum Progress Bar */}
                              <td className="py-4 pr-3">
                                <div>
                                  <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                                    <span className={isComplete ? "text-emerald-700 font-bold" : "text-neutral-700"}>
                                      {completedCount} / {allLessons.length} Modules
                                    </span>
                                    <span className="text-neutral-500 font-semibold">{progressPct}%</span>
                                  </div>
                                  <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-300 ${
                                        isComplete ? "bg-emerald-500" : "bg-brand-blue"
                                      }`}
                                      style={{ width: `${progressPct}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              {/* Completed Module Chips */}
                              <td className="py-4 pr-3">
                                {completedCount === 0 ? (
                                  <span className="text-[11px] text-neutral-400 italic">No modules finished</span>
                                ) : (
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {student.completedLessonIds.map((lid) => {
                                      const lesson = allLessons.find((l) => l.id === lid);
                                      return (
                                        <span
                                          key={lid}
                                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 truncate max-w-[130px]"
                                          title={lesson ? lesson.title : lid}
                                        >
                                          {lesson ? `Mod ${lesson.moduleNumber}: ${lesson.title.split(":")[0]}` : lid}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}
                              </td>

                              {/* Activity */}
                              <td className="py-4 pr-3">
                                <div className="text-[11px] font-medium text-neutral-800">
                                  Enrolled: {student.createdAt}
                                </div>
                                <div className="text-[10px] text-neutral-400">
                                  Last active: {student.lastActive}
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => setSelectedLmsStudent(student)}
                                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-[11px] transition flex items-center gap-1"
                                    title="View student dossier and edit progress"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Dossier</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteStudent(student.id, student.name)}
                                    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                                    title="Delete student"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 1-on-1 Mentorship Sessions Administration */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <Video className="w-5 h-5 text-brand-blue" />
                      1-on-1 Mentorship Sessions ({lmsSessions.length})
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Review live booking requests, track session status, and monitor encrypted video links.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar shrink-0">
                      {(["all", "confirmed", "completed", "cancelled"] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setLmsStatusFilter(filter)}
                          className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                            lmsStatusFilter === filter
                              ? "bg-white text-neutral-900 shadow-2xs"
                              : "text-neutral-500 hover:text-neutral-900"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {filteredSessions.length === 0 ? (
                  <div className="py-12 text-center text-neutral-400 text-xs">
                    No sessions match the selected filter.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-100 text-neutral-400 uppercase text-[10px] tracking-wider">
                          <th className="pb-3 font-semibold">Student</th>
                          <th className="pb-3 font-semibold">Mentor & Track</th>
                          <th className="pb-3 font-semibold">Date & Slot</th>
                          <th className="pb-3 font-semibold">Encrypted Room</th>
                          <th className="pb-3 font-semibold">Status</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredSessions.map((session) => (
                          <tr key={session.id} className="hover:bg-neutral-50/80 transition">
                            <td className="py-4 pr-3">
                              <div className="font-bold text-neutral-900">{session.studentName}</div>
                              <div className="text-[11px] text-neutral-500">{session.studentEmail}</div>
                              {session.studentPhone && (
                                <div className="text-[11px] text-neutral-400">{session.studentPhone}</div>
                              )}
                            </td>

                            <td className="py-4 pr-3">
                              <div className="font-medium text-neutral-900">{session.mentorName}</div>
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase mt-0.5 ${
                                  session.trackTopic === "coding"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-emerald-50 text-emerald-700"
                                }`}
                              >
                                {session.trackTopic === "coding" ? "Web Coding" : "Cybersecurity"}
                              </span>
                            </td>

                            <td className="py-4 pr-3">
                              <div className="font-medium text-neutral-800">{session.date}</div>
                              <div className="text-neutral-500 text-[11px]">{session.timeSlot}</div>
                            </td>

                            <td className="py-4 pr-3">
                              <a
                                href={session.meetingLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline font-mono text-[11px]"
                              >
                                <span>Join Room</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>

                            <td className="py-4 pr-3">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  session.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : session.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {session.status}
                              </span>
                            </td>

                            <td className="py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {session.status !== "completed" && (
                                  <button
                                    onClick={() => handleStatusChange(session.id, "completed")}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px] transition"
                                  >
                                    Mark Done
                                  </button>
                                )}
                                {session.status !== "cancelled" && (
                                  <button
                                    onClick={() => handleStatusChange(session.id, "cancelled")}
                                    className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-[11px] transition"
                                  >
                                    Cancel
                                  </button>
                                )}
                                {session.status !== "confirmed" && (
                                  <button
                                    onClick={() => handleStatusChange(session.id, "confirmed")}
                                    className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-semibold text-[11px] transition"
                                  >
                                    Reactivate
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Curricula Modules Management Grid */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-brand-blue" />
                      DIGIHub Curricula & Course Manager ({allCoursesState.length} Courses)
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Create, update, and deploy university-standard accredited courses equipped with interactive code sandboxes and defensive cyber labs.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCreateCourse}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold shadow-2xs transition active:scale-[0.98] shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Course</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allCoursesState.map((course) => (
                    <div
                      key={course.id}
                      className="p-5 rounded-2xl border border-neutral-200 hover:border-blue-400 transition bg-neutral-50/50 flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                            {course.id.includes("coding") ? (
                              <Code2 className="w-4 h-4" />
                            ) : course.id.includes("cyber") ? (
                              <Shield className="w-4 h-4" />
                            ) : course.id.includes("python") ? (
                              <Terminal className="w-4 h-4" />
                            ) : (
                              <Award className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-400">
                              {course.category} • {course.durationWeeks} Weeks
                            </span>
                            <h4 className="font-bold text-neutral-900 text-sm">{course.title}</h4>
                          </div>
                        </div>

                        <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                          {course.level} Level
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600 line-clamp-2">{course.description}</p>

                      {course.skillsGained && course.skillsGained.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {course.skillsGained.slice(0, 3).map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-600 text-[10px] font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {course.skillsGained.length > 3 && (
                            <span className="text-[10px] text-neutral-400 self-center">
                              +{course.skillsGained.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between border-t border-neutral-200/60 text-xs">
                        <span className="text-neutral-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.lessons.length} Modules (~{course.estimatedHours} hrs)
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditCourse(course)}
                            className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 font-semibold text-[11px] transition flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id, course.title)}
                            className="p-1 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete Course"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href="/digihub"
                            target="_blank"
                            className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                          >
                            <span>Explore</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Faculty Mentors Section */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-blue" />
                    Faculty Mentors Directory ({INITIAL_MENTORS.length})
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Available Ghanaian tech leaders facilitating 1-on-1 career coaching and technical code reviews.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {INITIAL_MENTORS.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl border border-neutral-200 bg-white flex flex-col justify-between"
                    >
                      <div>
                        <img
                          src={m.avatar}
                          alt={m.name}
                          className="w-full h-32 rounded-xl object-cover mb-3"
                        />
                        <h4 className="font-bold text-neutral-900 text-sm">{m.name}</h4>
                        <p className="text-xs text-blue-600 font-medium">{m.title}</p>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                          <span className="text-amber-500 font-bold">★ {m.rating}</span>
                          <span>•</span>
                          <span>{m.totalSessions} sessions</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-wrap gap-1">
                        {(m.specialties || [m.specialty]).map((s: string) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-600"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ─── TAB 7: EVENTS MANAGER ──────────────────────── */}
        {activeTab === "events" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Community Events and Bootcamps ({store.events.length})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage bootcamp schedules, dates, venue locations, and registration links.
                </p>
              </div>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule new event</span>
              </button>
            </div>

            <div className="space-y-4">
              {store.events.map((evt, idx) => (
                <div key={evt.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-brand-blue capitalize">{evt.category}</span>
                    <h4 className="font-semibold text-sm text-neutral-900">{evt.title}</h4>
                    <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                      <span>{evt.date}</span>
                      <span className="text-neutral-300">/</span>
                      <span>{evt.time}</span>
                      <span className="text-neutral-300">/</span>
                      <span>{evt.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={evt.status}
                      onChange={(e) => {
                        const updated = { ...store };
                        updated.events[idx].status = e.target.value as "upcoming" | "past";
                        saveStore(updated);
                        setStoreState(updated);
                        triggerToast("Event status changed!");
                      }}
                      className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white font-semibold text-neutral-700"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>

                    <button
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="p-1.5 text-neutral-400 hover:text-brand-red hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: LEADERSHIP & TEAM MANAGER ─────────────── */}
        {activeTab === "team" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Leadership, Staff & Technical Mentors ({store.team?.length || 0})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage leadership, instructors, and mentors displayed on the public About Us & Team page.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/about/team"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View public page</span>
                </Link>
                <button
                  onClick={handleOpenAddTeamModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add team member</span>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(store.team || []).map((m) => (
                <div key={m.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center overflow-hidden border border-neutral-200 shrink-0 relative">
                        {m.image ? (
                          <Image src={m.image} alt={m.name} fill className="object-cover" />
                        ) : (
                          <span>{m.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 leading-snug">{m.name}</h4>
                        <p className="text-xs text-neutral-500">{m.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue">
                        {m.department || "Leadership"}
                      </span>
                      {m.specialty && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-600 truncate max-w-[150px]">
                          {m.specialty}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {m.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400 font-mono">ID: {m.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditTeamModal(m)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(m.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: STRATEGIC PARTNERS MANAGER ────────────── */}
        {activeTab === "partners" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Strategic Partners & Ecosystem Alliances ({store.partners?.length || 0})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage institutional partners, university hubs, CSR sponsors, and technology allies on the public Partners page.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/about/partners"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View public page</span>
                </Link>
                <button
                  onClick={handleOpenAddPartnerModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add partner</span>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(store.partners || []).map((p) => (
                <div key={p.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">
                        {p.category || "Tech"}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-500 px-2 py-0.5 rounded bg-white border border-neutral-200">
                        {p.location}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-neutral-900 leading-snug">{p.name}</h4>
                    <p className="text-xs text-neutral-600 font-medium">
                      Role: {p.role}
                    </p>
                    {p.website && (
                      <p className="text-[11px] text-brand-blue truncate font-mono">
                        {p.website}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400 font-mono">ID: {p.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditPartnerModal(p)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeletePartner(p.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
                        title="Remove Partner"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: HISTORY & MILESTONES MANAGER ──────────── */}
        {activeTab === "history" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  History Timeline Milestones ({store.historyMilestones?.length || 0})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update DigiConnect Ghana journey milestones and key achievements presented on the public History page.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/about/history"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View public page</span>
                </Link>
                <button
                  onClick={handleOpenAddMilestoneModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add milestone</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {(store.historyMilestones || []).map((m) => (
                <div key={m.id || m.year} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-extrabold text-brand-blue font-mono">
                        {m.year}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700">
                        {m.badge}
                      </span>
                      <h4 className="font-bold text-sm text-neutral-900">{m.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleOpenEditMilestoneModal(m)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMilestone(m.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {m.description}
                  </p>

                  {m.achievements && m.achievements.length > 0 && (
                    <div className="pt-2 border-t border-neutral-200/80">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1.5">
                        Key Achievements:
                      </span>
                      <ul className="space-y-1">
                        {m.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: NEWS & BLOG POSTS MANAGER ─────────────── */}
        {activeTab === "news" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  News and Community Stories ({store.news?.length || 0})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Publish announcements, student success highlights, and press releases to the public site.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/news"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View public page</span>
                </Link>
                <button
                  onClick={() => setShowAddNewsModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Draft news article</span>
                </button>
              </div>
            </div>

            {/* News Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(store.news || []).map((post) => (
                <div key={post.id} className="rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-50/50 flex flex-col justify-between">
                  <div className="relative aspect-[16/10] w-full bg-neutral-100">
                    <Image
                      src={post.image || "/images/gallery/gallery-2.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-neutral-900/80 text-white backdrop-blur-xs capitalize">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-500 mb-1 flex items-center gap-1.5">
                        <span>{post.date}</span>
                        <span className="text-neutral-300">/</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-neutral-900 line-clamp-2 mb-2">{post.title}</h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">{post.excerpt}</p>
                    </div>
                    <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-neutral-500">By {post.author}</span>
                      <button
                        onClick={() => handleDeleteNewsPost(post.id)}
                        className="p-1.5 text-neutral-400 hover:text-brand-red rounded-lg transition-colors"
                        title="Delete story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: ALUMNI SUCCESS STORIES & TESTIMONIALS ─── */}
        {activeTab === "stories" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-lg text-neutral-900">
                  Alumni Success Stories & Quotes ({store.testimonials?.length || 0})
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage student testimonials, career outcomes, and quotes highlighted across the public site.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/impact/stories"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View public page</span>
                </Link>
                <button
                  onClick={handleOpenAddStoryModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add success story</span>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(store.testimonials || []).map((t) => (
                <div key={t.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center overflow-hidden border border-neutral-200 shrink-0 relative">
                        {t.image ? (
                          <Image src={t.image} alt={t.name} fill className="object-cover" />
                        ) : (
                          <span>{t.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 leading-snug">{t.name}</h4>
                        <p className="text-xs text-neutral-500">{t.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-blue/10 text-brand-blue">
                        {t.program || "Bootcamp"}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        📍 {t.location}
                      </span>
                    </div>

                    <blockquote className="text-xs text-neutral-600 italic leading-relaxed border-l-2 border-brand-blue/40 pl-3">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                    <div className="flex items-center text-amber-500 text-xs">
                      {"★".repeat(t.rating || 5)}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditStoryModal(t)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStory(t.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs transition-colors"
                        title="Delete Story"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 8: IMPACT STATISTICS ───────────────────── */}
        {activeTab === "impact" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="pb-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg text-neutral-900">
                Verified Impact Metrics
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Update organizational figures displayed across hero counters and impact sections.
              </p>
            </div>

            <form onSubmit={handleSaveStats} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                {store.impactStats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      {stat.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = { ...store };
                          updated.impactStats[idx].value = parseInt(e.target.value) || 0;
                          setStoreState(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-semibold bg-white"
                      />
                      <span className="font-semibold text-sm text-neutral-600 px-2">{stat.suffix}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs shadow-2xs"
              >
                Save verified metrics
              </button>
            </form>
          </div>
        )}

        {/* ─── TAB 9: SETTINGS & CONTACT DETAILS ──────────── */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-2xs space-y-6 max-w-2xl">
            <div className="pb-4 border-b border-neutral-100">
              <h3 className="font-bold text-lg text-neutral-900">
                Official Organization Profile & Contact Channels
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Modifications saved here immediately reflect across website footers, navigation headers, and contact pages.
              </p>
            </div>

            <form onSubmit={handleSaveContactInfo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Official contact email
                </label>
                <input
                  type="email"
                  value={store.contactInfo.email}
                  onChange={(e) => {
                    const updated = { ...store };
                    updated.contactInfo.email = e.target.value;
                    setStoreState(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Official phone and WhatsApp
                </label>
                <input
                  type="text"
                  value={store.contactInfo.phone}
                  onChange={(e) => {
                    const updated = { ...store };
                    updated.contactInfo.phone = e.target.value;
                    setStoreState(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Headquarters location
                </label>
                <input
                  type="text"
                  value={store.contactInfo.location}
                  onChange={(e) => {
                    const updated = { ...store };
                    updated.contactInfo.location = e.target.value;
                    setStoreState(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Operating hours
                </label>
                <input
                  type="text"
                  value={store.contactInfo.hours}
                  onChange={(e) => {
                    const updated = { ...store };
                    updated.contactInfo.hours = e.target.value;
                    setStoreState(updated);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs shadow-2xs"
              >
                Save organization profile
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ─── MODAL: ADD GALLERY IMAGE (DEVICE GALLERY) ────── */}
      {showAddImageModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Media library publisher
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-brand-blue" />
                  Select photo or video from device
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowAddImageModal(false);
                  setDeviceImagePreview("");
                  setSelectedFileName("");
                  setSelectedFileSize("");
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="space-y-4">
              <DeviceMediaUploader
                label="Device photo or video"
                value={newImageForm.src || deviceImagePreview}
                onChange={(url) => {
                  setNewImageForm((prev) => ({ ...prev, src: url }));
                  setDeviceImagePreview(url);
                }}
                previewAspect="video"
                required
                helperText="Select a photo or video directly from your device, camera, or files"
              />

              {/* Mode toggle / preset fallback */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setImageSourceMode(imageSourceMode === "device" ? "preset" : "device")
                  }
                  className="text-xs font-semibold text-brand-blue hover:underline"
                >
                  {imageSourceMode === "device"
                    ? "Or choose from demo presets / enter media URL instead →"
                    : "← Return to device gallery upload"}
                </button>

                {imageSourceMode === "preset" && (
                  <div className="mt-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                    <label className="block text-xs font-semibold text-neutral-600">
                      Preset library photos
                    </label>
                    <select
                      value={newImageForm.src}
                      onChange={(e) => {
                        setNewImageForm({ ...newImageForm, src: e.target.value });
                        setDeviceImagePreview(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs bg-white"
                    >
                      <option value="">-- Choose a preset photo --</option>
                      <option value="/images/gallery/gallery-1.jpg">Classroom Digital Skills Session</option>
                      <option value="/images/gallery/gallery-2.jpg">Hands-On Coding & Web Project</option>
                      <option value="/images/gallery/gallery-3.jpg">Community Tech Meetup & Mentors</option>
                      <option value="/images/gallery/gallery-4.jpg">Student Project Presentation</option>
                      <option value="/images/gallery/gallery-5.jpg">Youth Hackathon Collaboration</option>
                      <option value="/images/gallery/gallery-6.jpg">1-on-1 Career Mentorship Session</option>
                      <option value="/images/about/about.jpg">Group Innovation Cohort</option>
                    </select>
                    <input
                      type="text"
                      value={newImageForm.src}
                      onChange={(e) => {
                        setNewImageForm({ ...newImageForm, src: e.target.value });
                        setDeviceImagePreview(e.target.value);
                      }}
                      placeholder="Or enter custom URL/path: /images/... or https://..."
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Gallery Category */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Gallery category *
                </label>
                <select
                  value={newImageForm.category}
                  onChange={(e) => setNewImageForm({ ...newImageForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium"
                >
                  <option value="Workshops">Workshops</option>
                  <option value="Hackathons">Hackathons</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="Classrooms">Classrooms</option>
                  <option value="Community">Community</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Graduation">Graduation</option>
                </select>
              </div>

              {/* Photo Caption */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Media caption and context *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Participants building interactive software solutions during our Accra youth coding bootcamp."
                  value={newImageForm.caption}
                  onChange={(e) => setNewImageForm({ ...newImageForm, caption: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!newImageForm.src && !deviceImagePreview}
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark disabled:bg-neutral-300 disabled:cursor-not-allowed text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" /> Publish media to public gallery
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: APPLICATION DETAILS & SCREENING ───────── */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-6 my-8 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-100 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white font-bold text-base flex items-center justify-center shadow-xs shrink-0">
                  {selectedApp.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-blue">
                      Candidate screening dossier
                    </span>
                    <span className="text-xs text-neutral-400">
                      (Record #{selectedApp.id})
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">{selectedApp.fullName}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-500">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Submitted on {selectedApp.date}</span>
                    <span className="text-neutral-300">/</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                        selectedApp.status === "accepted"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : selectedApp.status === "rejected"
                          ? "bg-rose-50 text-rose-800 border border-rose-200"
                          : selectedApp.status === "under_review"
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {selectedApp.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Outreach Action Bar */}
            <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80 flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-xs font-semibold text-neutral-600 pl-1">
                Direct candidate outreach:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                  Call {selectedApp.phone}
                </a>
                <a
                  href={`mailto:${selectedApp.email}`}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-blue" />
                  Email candidate
                </a>
                <a
                  href={getWhatsAppUrl(selectedApp.phone, selectedApp.fullName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs bg-neutral-50/70 p-4 rounded-2xl border border-neutral-100">
              <div>
                <span className="text-xs font-medium text-neutral-500 block mb-0.5">Email address</span>
                <span className="font-semibold text-neutral-900 break-all">{selectedApp.email}</span>
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block mb-0.5">Phone number</span>
                <span className="font-semibold text-neutral-900">{selectedApp.phone}</span>
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block mb-0.5">Location & age</span>
                <span className="font-semibold text-neutral-900">{selectedApp.location} ({selectedApp.age} years)</span>
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block mb-0.5">Education level</span>
                <span className="font-semibold text-neutral-900 capitalize">
                  {selectedApp.educationLevel.replace("-", " ")}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block mb-0.5">Program selected</span>
                <span className="font-semibold text-neutral-900 capitalize">
                  {selectedApp.programOfInterest.replace(/-/g, " ")}
                </span>
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block mb-0.5">Experience level</span>
                <span className="font-semibold text-neutral-900 capitalize">
                  {selectedApp.digitalExperience} background
                </span>
              </div>
            </div>

            {/* Applicant Motivation */}
            <div>
              <h4 className="text-xs font-semibold text-neutral-700 mb-1.5">
                Applicant motivation and aspirations:
              </h4>
              <p className="text-xs text-neutral-700 leading-relaxed bg-neutral-50 border border-neutral-200/80 p-3.5 rounded-2xl italic">
                &ldquo;{selectedApp.motivation}&rdquo;
              </p>
            </div>

            {/* Internal Admissions Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-blue" />
                  Internal interview remarks and screening notes:
                </label>
                <button
                  type="button"
                  onClick={() => handleSaveAppNotes(selectedApp.id)}
                  className="text-xs font-semibold text-brand-blue hover:text-brand-blue-dark hover:underline"
                >
                  Save screening notes
                </button>
              </div>
              <textarea
                rows={3}
                placeholder="Log interview screening remarks, cohort track recommendations, attendance confirmation, or sponsor notes..."
                value={appNotesDraft}
                onChange={(e) => setAppNotesDraft(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Decision Controls & Removal */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-600">Admissions decision:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateAppStatus(selectedApp.id, "accepted", appNotesDraft)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" /> Accept candidate
                  </button>
                  <button
                    onClick={() => updateAppStatus(selectedApp.id, "under_review", appNotesDraft)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <Clock className="w-3.5 h-3.5" /> Place on waitlist
                  </button>
                  <button
                    onClick={() => updateAppStatus(selectedApp.id, "rejected", appNotesDraft)}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <UserX className="w-3.5 h-3.5" /> Decline candidate
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleDeleteApp(selectedApp.id, selectedApp.fullName)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: MANUAL APPLICANT REGISTRATION ─────────── */}
      {showAddAppModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-5 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  Register Walk-In Candidate
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Directly enroll a prospective student who registered in person at an event or campus info session.
                </p>
              </div>
              <button
                onClick={() => setShowAddAppModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualApplication} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ama Ansah"
                    value={newManualAppForm.fullName}
                    onChange={(e) =>
                      setNewManualAppForm({ ...newManualAppForm, fullName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ama.ansah@example.com"
                    value={newManualAppForm.email}
                    onChange={(e) =>
                      setNewManualAppForm({ ...newManualAppForm, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+233 24 000 0000"
                    value={newManualAppForm.phone}
                    onChange={(e) =>
                      setNewManualAppForm({ ...newManualAppForm, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    min={14}
                    max={35}
                    value={newManualAppForm.age}
                    onChange={(e) =>
                      setNewManualAppForm({ ...newManualAppForm, age: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location / city
                  </label>
                  <input
                    type="text"
                    placeholder="Accra, Kumasi..."
                    value={newManualAppForm.location}
                    onChange={(e) =>
                      setNewManualAppForm({ ...newManualAppForm, location: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Program track
                  </label>
                  <select
                    value={newManualAppForm.programOfInterest}
                    onChange={(e) =>
                      setNewManualAppForm({
                        ...newManualAppForm,
                        programOfInterest: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    {store.programs.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Education level
                  </label>
                  <select
                    value={newManualAppForm.educationLevel}
                    onChange={(e) =>
                      setNewManualAppForm({
                        ...newManualAppForm,
                        educationLevel: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="junior-high">Junior High (JHS)</option>
                    <option value="high-school">Senior High (SHS)</option>
                    <option value="vocational">Vocational / Technical</option>
                    <option value="undergraduate">University / Tertiary</option>
                    <option value="graduate">Postgraduate</option>
                    <option value="other">Other / Self-taught</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Experience level
                  </label>
                  <select
                    value={newManualAppForm.digitalExperience}
                    onChange={(e) =>
                      setNewManualAppForm({
                        ...newManualAppForm,
                        digitalExperience: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="basic">Basic computer skills</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="some-coding">Some coding experience</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Candidate motivation and background
                </label>
                <textarea
                  rows={2}
                  placeholder="Applicant's stated career aspirations or reason for enrolling..."
                  value={newManualAppForm.motivation}
                  onChange={(e) =>
                    setNewManualAppForm({ ...newManualAppForm, motivation: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Internal intake remarks (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Registered at campus roadshow; full scholarship recommended."
                  value={newManualAppForm.notes}
                  onChange={(e) =>
                    setNewManualAppForm({ ...newManualAppForm, notes: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddAppModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs shadow-2xs transition-colors"
                >
                  Register candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: CONTACT MESSAGE DETAILS ───────────────── */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Direct inquiry
                </span>
                <h3 className="text-lg font-bold text-neutral-900">{selectedMsg.subject}</h3>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-neutral-600 space-y-1 bg-neutral-50 p-3.5 rounded-xl border border-neutral-150">
              <p><strong>From:</strong> {selectedMsg.name} ({selectedMsg.email})</p>
              <p><strong>Phone:</strong> {selectedMsg.phone || "Not provided"}</p>
              <p><strong>Organization:</strong> {selectedMsg.organization || "Individual"}</p>
              <p><strong>Date:</strong> {selectedMsg.date}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-500 mb-1.5">Inquiry message</h4>
              <p className="text-xs text-neutral-700 leading-relaxed bg-white border border-neutral-200 p-4 rounded-xl">
                {selectedMsg.message}
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <a
                href={`mailto:${selectedMsg.email}?subject=RE: ${selectedMsg.subject}`}
                className="px-4 py-2 rounded-xl bg-brand-blue text-white font-semibold text-xs hover:bg-brand-blue-dark flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Reply to sender via email
              </a>
              <button
                onClick={() => updateMsgStatus(selectedMsg.id, "replied")}
                className="px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-semibold hover:bg-neutral-50 transition-colors"
              >
                Mark as replied
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: CREATE NEWS ARTICLE ──────────────────── */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-5 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Story publisher
                </span>
                <h3 className="text-xl font-bold text-neutral-900">Create news article</h3>
              </div>
              <button
                onClick={() => setShowAddNewsModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewsPost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Article title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50 Young Women Graduate from Accra Web Development Bootcamp"
                  value={newNewsForm.title}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newNewsForm.category}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Bootcamps">Bootcamps</option>
                    <option value="Community">Community</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Partnerships">Partnerships</option>
                    <option value="Stories">Student Stories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Estimated read time
                  </label>
                  <input
                    type="text"
                    value={newNewsForm.readTime}
                    onChange={(e) => setNewNewsForm({ ...newNewsForm, readTime: e.target.value })}
                    placeholder="e.g. 4 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Author byline
                </label>
                <input
                  type="text"
                  value={newNewsForm.author}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, author: e.target.value })}
                  placeholder="e.g. DigiConnect Communications"
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              {/* Image or Video from device */}
              <DeviceMediaUploader
                label="Cover photo or video (select from device)"
                value={newNewsForm.image}
                onChange={(url) => setNewNewsForm((prev) => ({ ...prev, image: url }))}
                previewAspect="video"
                required
                helperText="Upload article cover photo or feature video directly from your device"
              />

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Summary excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise 1-2 sentence overview of the news article..."
                  value={newNewsForm.excerpt}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full article story *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write the full news story here. Paragraph breaks will be formatted cleanly..."
                  value={newNewsForm.content}
                  onChange={(e) => setNewNewsForm({ ...newNewsForm, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isUploadingNewsImage}
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                {isUploadingNewsImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading cover image...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Publish news story
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: CREATE EVENT ─────────────────────────── */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-5 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Community programming
                </span>
                <h3 className="text-xl font-bold text-neutral-900">Schedule new event</h3>
              </div>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Event title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Accra Tech Innovation Day 2025"
                  value={newEventForm.title}
                  onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Format category *
                  </label>
                  <select
                    value={newEventForm.category}
                    onChange={(e) => setNewEventForm({ ...newEventForm, category: e.target.value as "workshop" | "bootcamp" | "meetup" | "conference" | "hackathon" })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="bootcamp">Bootcamp</option>
                    <option value="workshop">Workshop</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="meetup">Meetup / Webinar</option>
                    <option value="conference">Conference / Summit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Schedule status
                  </label>
                  <select
                    value={newEventForm.status}
                    onChange={(e) => setNewEventForm({ ...newEventForm, status: e.target.value as "upcoming" | "past" })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Event date *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. April 18, 2025"
                    value={newEventForm.date}
                    onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Start and end time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10:00 AM – 3:00 PM GMT"
                    value={newEventForm.time}
                    onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Venue or meeting link *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Accra Digital Centre & Zoom Live"
                  value={newEventForm.location}
                  onChange={(e) => setNewEventForm({ ...newEventForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <DeviceMediaUploader
                label="Event banner photo or promo video (from device)"
                value={newEventForm.image}
                onChange={(url) => setNewEventForm({ ...newEventForm, image: url })}
                previewAspect="banner"
                helperText="Upload an event flyer, poster, or teaser video from your device"
              />

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Event description and agenda
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed agenda, who should attend, and what participants will gain..."
                  value={newEventForm.description}
                  onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Action button label
                  </label>
                  <input
                    type="text"
                    value={newEventForm.ctaText}
                    onChange={(e) => setNewEventForm({ ...newEventForm, ctaText: e.target.value })}
                    placeholder="e.g. Register Free"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Registration link
                  </label>
                  <input
                    type="text"
                    value={newEventForm.ctaLink}
                    onChange={(e) => setNewEventForm({ ...newEventForm, ctaLink: e.target.value })}
                    placeholder="e.g. /join"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Plus className="w-4 h-4" /> Schedule community event
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: TEAM MEMBER (ADD / EDIT) ───────────── */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Team & Faculty Management
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  {editingTeamMember ? "Edit Team Member" : "Add Team Member or Mentor"}
                </h3>
              </div>
              <button
                onClick={() => setShowTeamModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kofi Boateng"
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Department
                  </label>
                  <select
                    value={teamForm.department}
                    onChange={(e) => setTeamForm({ ...teamForm, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Education">Education & Curricula</option>
                    <option value="Technology">Technology & Engineering</option>
                    <option value="Partnerships">Partnerships & Outreach</option>
                    <option value="Design">Design & Product</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Official Role / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Head of Learning & Lead Instructor"
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Technical Specialty / Focus (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Python, Data Analytics, STEM"
                  value={teamForm.specialty}
                  onChange={(e) => setTeamForm({ ...teamForm, specialty: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Biography / Profile
                </label>
                <textarea
                  rows={3}
                  placeholder="Background, experience, and educational passion..."
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <DeviceMediaUploader
                label="Profile photo or video (from device)"
                value={teamForm.image}
                onChange={(url) => setTeamForm({ ...teamForm, image: url })}
                previewAspect="square"
                helperText="Upload instructor/mentor portrait photo or brief video greeting"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={teamForm.linkedin}
                    onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Twitter / X URL
                  </label>
                  <input
                    type="text"
                    value={teamForm.twitter}
                    onChange={(e) => setTeamForm({ ...teamForm, twitter: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Check className="w-4 h-4" />
                {editingTeamMember ? "Save Changes" : "Add Team Member"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: PARTNER (ADD / EDIT) ───────────────── */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Strategic Alliances
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  {editingPartner ? "Edit Partner" : "Add Ecosystem Partner"}
                </h3>
              </div>
              <button
                onClick={() => setShowPartnerModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Partner / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AfriTech Cloud Labs"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Alliance Category
                  </label>
                  <select
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Tech">Technology & Cloud</option>
                    <option value="Education">Academic & Secondary Schools</option>
                    <option value="Community">Civil Society & NGOs</option>
                    <option value="Corporate">Corporate Social Responsibility</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location / Region *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Accra, Ghana"
                    value={partnerForm.location}
                    onChange={(e) => setPartnerForm({ ...partnerForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Partnership Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Infrastructure Sponsor or Bootcamp Scholarship Funder"
                  value={partnerForm.role}
                  onChange={(e) => setPartnerForm({ ...partnerForm, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <DeviceMediaUploader
                label="Partner brand logo or media (from device)"
                value={partnerForm.logo}
                onChange={(url) => setPartnerForm({ ...partnerForm, logo: url })}
                previewAspect="square"
                helperText="Upload partner emblem, brand badge, or intro video from your device"
              />

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  placeholder="https://partner-website.com"
                  value={partnerForm.website}
                  onChange={(e) => setPartnerForm({ ...partnerForm, website: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Check className="w-4 h-4" />
                {editingPartner ? "Save Changes" : "Add Strategic Partner"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: MILESTONE (ADD / EDIT) ─────────────── */}
      {showMilestoneModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  History & Milestones
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  {editingMilestone ? "Edit Milestone" : "Add Journey Milestone"}
                </h3>
              </div>
              <button
                onClick={() => setShowMilestoneModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestone} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026"
                    value={milestoneForm.year}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phase / Badge *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Expansion"
                    value={milestoneForm.badge}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Milestone Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Reaching 10,000 Youth Across Ghana"
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Narrative Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain what was accomplished and how it impacted the community..."
                  value={milestoneForm.description}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Key Achievements (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="100+ laptops donated&#10;5 regional hubs opened&#10;1,000 graduates placed"
                  value={milestoneForm.achievementsText}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, achievementsText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Check className="w-4 h-4" />
                {editingMilestone ? "Save Milestone" : "Add Journey Milestone"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: RESOURCE TOOLKIT (ADD / EDIT) ──────── */}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Knowledge Hub Publisher
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  {editingResource ? "Edit Learning Toolkit" : "Add Learning Toolkit / Guide"}
                </h3>
              </div>
              <button
                onClick={() => setShowResourceModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Toolkit Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practical Web Development Roadmap"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Topic Category
                  </label>
                  <select
                    value={resourceForm.category}
                    onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Digital Skills">Digital Skills</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Career">Career & Freelancing</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Resource Type
                  </label>
                  <select
                    value={resourceForm.type}
                    onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Guide">Guide</option>
                    <option value="Toolkit">Toolkit</option>
                    <option value="Syllabus">Syllabus</option>
                    <option value="E-Book">E-Book</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Target Difficulty Level
                  </label>
                  <select
                    value={resourceForm.level}
                    onChange={(e) => setResourceForm({ ...resourceForm, level: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Estimated Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15 min read"
                    value={resourceForm.readTime}
                    onChange={(e) => setResourceForm({ ...resourceForm, readTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Description / Synopsis *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Overview of topics covered, tools introduced, and learning outcomes..."
                  value={resourceForm.description}
                  onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <DeviceMediaUploader
                label="Toolkit cover photo or walkthrough video (from device)"
                value={resourceForm.image}
                onChange={(url) => setResourceForm({ ...resourceForm, image: url })}
                previewAspect="banner"
                helperText="Upload toolkit banner image or overview video from your device"
              />

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Download / Access Link
                </label>
                <input
                  type="text"
                  placeholder="/resources"
                  value={resourceForm.downloadUrl}
                  onChange={(e) => setResourceForm({ ...resourceForm, downloadUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Check className="w-4 h-4" />
                {editingResource ? "Save Toolkit" : "Publish Toolkit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: STORY / TESTIMONIAL (ADD / EDIT) ───── */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Alumni Stories & Quotes
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  {editingStory ? "Edit Story" : "Add Alumni Success Story"}
                </h3>
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Graduate Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priscilla Mensah"
                    value={storyForm.name}
                    onChange={(e) => setStoryForm({ ...storyForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Current Role / Outcome *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Junior Frontend Dev at Hub"
                    value={storyForm.role}
                    onChange={(e) => setStoryForm({ ...storyForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Program Attended
                  </label>
                  <input
                    type="text"
                    placeholder="Coding & Technology Bootcamp"
                    value={storyForm.program}
                    onChange={(e) => setStoryForm({ ...storyForm, program: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Accra, Greater Accra"
                    value={storyForm.location}
                    onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="How DigiConnect transformed their career and opened opportunities..."
                  value={storyForm.quote}
                  onChange={(e) => setStoryForm({ ...storyForm, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <DeviceMediaUploader
                label="Alumni photo or video testimonial (from device)"
                value={storyForm.image}
                onChange={(url) => setStoryForm({ ...storyForm, image: url })}
                previewAspect="square"
                helperText="Upload graduate headshot or short video testimony from your device"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Check className="w-4 h-4" />
                {editingStory ? "Save Story" : "Publish Success Story"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: ADD PROGRAM TRACK ──────────────────── */}
      {showAddProgramModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  Curricula Publisher
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  Add New Program Track
                </h3>
              </div>
              <button
                onClick={() => setShowAddProgramModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProgramSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Track Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 06"
                    value={newProgramForm.number}
                    onChange={(e) => setNewProgramForm({ ...newProgramForm, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10 Weeks"
                    value={newProgramForm.duration}
                    onChange={(e) => setNewProgramForm({ ...newProgramForm, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Program Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI & Data Science Fundamentals"
                  value={newProgramForm.title}
                  onChange={(e) => setNewProgramForm({ ...newProgramForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Short Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AI & Data"
                    value={newProgramForm.shortTitle}
                    onChange={(e) => setNewProgramForm({ ...newProgramForm, shortTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Target Audience *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. High school leavers"
                    value={newProgramForm.audience}
                    onChange={(e) => setNewProgramForm({ ...newProgramForm, audience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Curriculum Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of the syllabus, outcomes, and hands-on projects..."
                  value={newProgramForm.description}
                  onChange={(e) => setNewProgramForm({ ...newProgramForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Core Skills Taught (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Python, Pandas, Machine Learning, Data Viz"
                  value={newProgramForm.skillsText}
                  onChange={(e) => setNewProgramForm({ ...newProgramForm, skillsText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none font-mono"
                />
              </div>

              <DeviceMediaUploader
                label="Curriculum cover photo or track video (from device)"
                value={newProgramForm.image}
                onChange={(url) => setNewProgramForm({ ...newProgramForm, image: url })}
                previewAspect="video"
                helperText="Upload curriculum cover image or intro track preview video from your device"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs"
              >
                <Plus className="w-4 h-4" /> Add Program to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
      {/* ─── MODAL: STUDENT DOSSIER & PROGRESS OVERRIDE ──────── */}
      {selectedLmsStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 space-y-6 my-8 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-100 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  {selectedLmsStudent.avatar ? (
                    <img
                      src={selectedLmsStudent.avatar}
                      alt={selectedLmsStudent.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-neutral-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white font-bold text-base flex items-center justify-center shadow-xs">
                      {selectedLmsStudent.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  {selectedLmsStudent.provider === "google" && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center">
                      <svg className="w-3 h-3" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-neutral-900">{selectedLmsStudent.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        selectedLmsStudent.provider === "google"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {selectedLmsStudent.provider === "google" ? "Google SSO" : "Email & Password"}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5">{selectedLmsStudent.email}</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedLmsStudent(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase">Progress</span>
                <div className="text-lg font-bold text-neutral-900 mt-1">
                  {Math.round((selectedLmsStudent.completedLessonIds.length / getAllLessons().length) * 100)}%
                </div>
                <div className="text-[11px] text-neutral-400">
                  {selectedLmsStudent.completedLessonIds.length} of {getAllLessons().length} modules
                </div>
              </div>
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase">Current Track</span>
                <div className="text-sm font-bold text-neutral-900 mt-1 capitalize">
                  {selectedLmsStudent.currentTrackId === "cybersecurity" ? "Cyber Defense" : "Web Coding"}
                </div>
                <div className="text-[11px] text-neutral-400">Primary track</div>
              </div>
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase">Certificate</span>
                <div className="text-sm font-bold text-neutral-900 mt-1">
                  {selectedLmsStudent.certificateClaimed ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                    </span>
                  ) : selectedLmsStudent.completedLessonIds.length >= getAllLessons().length ? (
                    <span className="text-blue-600 font-semibold">Eligible</span>
                  ) : (
                    <span className="text-neutral-400">In Progress</span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-400">ID #{selectedLmsStudent.id.slice(-6)}</div>
              </div>
            </div>

            {/* Interactive Module Checklist (Admin Override) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">Curriculum Progress (Admin Override)</h4>
                  <p className="text-[11px] text-neutral-500">
                    Click checkboxes to manually grant or revoke module completion credit for this student.
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg">
                  {selectedLmsStudent.completedLessonIds.length}/{getAllLessons().length} Completed
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {getAllLessons().map((lesson) => {
                  const isCompleted = selectedLmsStudent.completedLessonIds.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        adminToggleUserLesson(selectedLmsStudent.id, lesson.id);
                        setLmsUsers(getAllLMSUsers());
                        triggerToast(
                          isCompleted
                            ? `Revoked credit for "${lesson.title}"`
                            : `Granted completion for "${lesson.title}"`
                        );
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition select-none ${
                        isCompleted
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                          : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                            isCompleted
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "border-neutral-300 bg-white"
                          }`}
                        >
                          {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                              {lesson.trackId === "coding" ? "Web Dev" : "Cyber"} • Mod {lesson.moduleNumber}
                            </span>
                            <span className="text-xs font-semibold">{lesson.title}</span>
                          </div>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{lesson.summary}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isCompleted ? "bg-emerald-100 text-emerald-800" : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {isCompleted ? "Done" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mentorship History for this student */}
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <h4 className="font-bold text-xs text-neutral-900 uppercase tracking-wider">
                1-on-1 Mentorship Activity
              </h4>
              {(() => {
                const studentSessions = lmsSessions.filter(
                  (s) => s.studentEmail.toLowerCase() === selectedLmsStudent.email.toLowerCase()
                );
                if (studentSessions.length === 0) {
                  return (
                    <p className="text-xs text-neutral-400 italic">
                      No 1-on-1 mentorship sessions booked yet by this student.
                    </p>
                  );
                }
                return (
                  <div className="space-y-1.5">
                    {studentSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-semibold text-neutral-900">{session.mentorName}</span>
                          <span className="text-neutral-400 mx-1.5">•</span>
                          <span className="text-neutral-600">
                            {session.date} ({session.timeSlot})
                          </span>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            session.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : session.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {session.status}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to remove student "${selectedLmsStudent.name}"? Their progress will be permanently deleted.`
                    )
                  ) {
                    adminDeleteUser(selectedLmsStudent.id);
                    setLmsUsers(getAllLMSUsers());
                    setSelectedLmsStudent(null);
                    triggerToast(`Removed student ${selectedLmsStudent.name}`);
                  }
                }}
                className="px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-xs transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Student</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLmsStudent(null)}
                className="px-5 py-2 rounded-xl bg-neutral-900 text-white font-semibold text-xs hover:bg-neutral-800 transition"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: LMS COURSE (CREATE / EDIT) ─────────────── */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-semibold text-brand-blue block">
                  DIGIHub Curriculum Builder
                </span>
                <h3 className="font-extrabold text-lg text-neutral-900">
                  {editingCourse ? "Edit Course Curriculum" : "Create New Accredited Course"}
                </h3>
              </div>
              <button
                onClick={() => setShowCourseModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full-Stack Web Development & Microservices"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Academic Track / Category
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Coding & Web">Coding & Web</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Programming">Programming (Python)</option>
                    <option value="Digital Literacy">Digital Literacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white font-medium focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Duration (Weeks) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    required
                    value={courseForm.durationWeeks}
                    onChange={(e) => setCourseForm({ ...courseForm, durationWeeks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Estimated Study Hours *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    required
                    value={courseForm.estimatedHours}
                    onChange={(e) => setCourseForm({ ...courseForm, estimatedHours: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Lead Faculty Instructor
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kwame Mensah"
                    value={courseForm.instructorName}
                    onChange={(e) => setCourseForm({ ...courseForm, instructorName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Instructor Academic Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Software Architect"
                    value={courseForm.instructorTitle}
                    onChange={(e) => setCourseForm({ ...courseForm, instructorTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Course Synopsis & Industry Impact *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline what makes this curriculum easy to understand and relatable with Ghanaian analogies..."
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Skills Gained (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern HTML5, Responsive CSS, State Logic, REST APIs"
                  value={courseForm.skillsGained}
                  onChange={(e) => setCourseForm({ ...courseForm, skillsGained: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold bg-brand-blue text-white hover:bg-brand-blue-dark transition-colors text-xs flex items-center justify-center gap-2 shadow-2xs mt-2"
              >
                <Check className="w-4 h-4" />
                {editingCourse ? "Save & Deploy Curriculum" : "Publish Course to DIGIHub"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── CERTIFICATE PREVIEW MODAL FOR ADMIN ─────────── */}
      {selectedCertToPreview && (
        <CertificateModal
          isOpen={isCertPreviewOpen}
          onClose={() => {
            setIsCertPreviewOpen(false);
            setSelectedCertToPreview(null);
          }}
          certificate={selectedCertToPreview}
        />
      )}
    </div>
  );
}
