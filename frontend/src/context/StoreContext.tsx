"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  AppStore,
  INITIAL_STORE,
  getStore,
  saveStore,
  GalleryItem,
  NewsPost,
  DCGEvent,
  ApplicationSubmission,
  TeamMember,
  Partner,
  HistoryMilestone,
  Resource,
  Testimonial,
  Program,
  addGalleryImage as addGalleryImageLib,
  removeGalleryImage as removeGalleryImageLib,
  addNewsPost as addNewsPostLib,
  removeNewsPost as removeNewsPostLib,
  addEvent as addEventLib,
  removeEvent as removeEventLib,
  addApplication as addApplicationLib,
  updateApplicationStatus as updateApplicationStatusLib,
  removeApplication as removeApplicationLib,
  addTeamMember as addTeamMemberLib,
  updateTeamMember as updateTeamMemberLib,
  removeTeamMember as removeTeamMemberLib,
  addPartner as addPartnerLib,
  updatePartner as updatePartnerLib,
  removePartner as removePartnerLib,
  addHistoryMilestone as addHistoryMilestoneLib,
  updateHistoryMilestone as updateHistoryMilestoneLib,
  removeHistoryMilestone as removeHistoryMilestoneLib,
  addProgram as addProgramLib,
  updateProgram as updateProgramLib,
  removeProgram as removeProgramLib,
  addResource as addResourceLib,
  updateResource as updateResourceLib,
  removeResource as removeResourceLib,
  addTestimonial as addTestimonialLib,
  updateTestimonial as updateTestimonialLib,
  removeTestimonial as removeTestimonialLib,
} from "@/lib/store";

interface StoreContextType {
  store: AppStore;
  isHydrated: boolean;
  saveStoreData: (newStore: AppStore) => void;
  updateContactInfo: (contactInfo: AppStore["contactInfo"]) => void;
  updateImpactStats: (impactStats: AppStore["impactStats"]) => void;
  updatePrograms: (programs: AppStore["programs"]) => void;
  updateEvents: (events: AppStore["events"]) => void;
  addGalleryImage: (img: Omit<GalleryItem, "id" | "dateAdded">) => GalleryItem;
  removeGalleryImage: (id: string) => void;
  addNewsPost: (post: Omit<NewsPost, "id" | "date" | "slug">) => NewsPost;
  removeNewsPost: (id: string) => void;
  addEvent: (evt: Omit<DCGEvent, "id" | "slug" | "image"> & { slug?: string; image?: string }) => DCGEvent;
  removeEvent: (id: string) => void;
  addApplication: (app: Omit<ApplicationSubmission, "id" | "date" | "status">) => ApplicationSubmission;
  updateApplicationStatus: (id: string, status: ApplicationSubmission["status"], notes?: string) => void;
  removeApplication: (id: string) => void;
  // Team
  addTeamMember: (member: Omit<TeamMember, "id">) => TeamMember;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  removeTeamMember: (id: string) => void;
  // Partners
  addPartner: (partner: Omit<Partner, "id">) => Partner;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  removePartner: (id: string) => void;
  // Milestones
  addHistoryMilestone: (milestone: Omit<HistoryMilestone, "id">) => HistoryMilestone;
  updateHistoryMilestone: (id: string, milestone: Partial<HistoryMilestone>) => void;
  removeHistoryMilestone: (id: string) => void;
  // Programs
  addProgram: (program: Program) => Program;
  updateProgram: (slug: string, program: Partial<Program>) => void;
  removeProgram: (slug: string) => void;
  // Resources
  addResource: (resource: Omit<Resource, "id">) => Resource;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  removeResource: (id: string) => void;
  // Testimonials
  addTestimonial: (t: Omit<Testimonial, "id">) => Testimonial;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  removeTestimonial: (id: string) => void;
  reloadStore: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AppStore>(INITIAL_STORE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Initial client hydration from localStorage
    const initial = getStore();
    setStore(initial);
    setIsHydrated(true);

    const handleLocalUpdate = () => {
      setStore(getStore());
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === "digiconnect_admin_store_v2" || !e.key) {
        setStore(getStore());
      }
    };

    window.addEventListener("digiconnect_store_updated", handleLocalUpdate);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("digiconnect_store_updated", handleLocalUpdate);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const saveStoreData = (newStore: AppStore) => {
    saveStore(newStore);
    setStore(newStore);
  };

  const updateContactInfo = (contactInfo: AppStore["contactInfo"]) => {
    const updated = { ...store, contactInfo };
    saveStoreData(updated);
  };

  const updateImpactStats = (impactStats: AppStore["impactStats"]) => {
    const updated = { ...store, impactStats };
    saveStoreData(updated);
  };

  const updatePrograms = (programs: AppStore["programs"]) => {
    const updated = { ...store, programs };
    saveStoreData(updated);
  };

  const updateEvents = (events: AppStore["events"]) => {
    const updated = { ...store, events };
    saveStoreData(updated);
  };

  const addGalleryImage = (img: Omit<GalleryItem, "id" | "dateAdded">) => {
    const item = addGalleryImageLib(img);
    setStore(getStore());
    return item;
  };

  const removeGalleryImage = (id: string) => {
    removeGalleryImageLib(id);
    setStore(getStore());
  };

  const addNewsPost = (post: Omit<NewsPost, "id" | "date" | "slug">) => {
    const item = addNewsPostLib(post);
    setStore(getStore());
    return item;
  };

  const removeNewsPost = (id: string) => {
    removeNewsPostLib(id);
    setStore(getStore());
  };

  const addEvent = (evt: Omit<DCGEvent, "id" | "slug" | "image"> & { slug?: string; image?: string }) => {
    const item = addEventLib(evt);
    setStore(getStore());
    return item;
  };

  const removeEvent = (id: string) => {
    removeEventLib(id);
    setStore(getStore());
  };

  const addApplication = (app: Omit<ApplicationSubmission, "id" | "date" | "status">) => {
    const item = addApplicationLib(app);
    setStore(getStore());
    return item;
  };

  const updateApplicationStatus = (id: string, status: ApplicationSubmission["status"], notes?: string) => {
    updateApplicationStatusLib(id, status, notes);
    setStore(getStore());
  };

  const removeApplication = (id: string) => {
    removeApplicationLib(id);
    setStore(getStore());
  };

  const addTeamMember = (member: Omit<TeamMember, "id">) => {
    const item = addTeamMemberLib(member);
    setStore(getStore());
    return item;
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    updateTeamMemberLib(id, member);
    setStore(getStore());
  };

  const removeTeamMember = (id: string) => {
    removeTeamMemberLib(id);
    setStore(getStore());
  };

  const addPartner = (partner: Omit<Partner, "id">) => {
    const item = addPartnerLib(partner);
    setStore(getStore());
    return item;
  };

  const updatePartner = (id: string, partner: Partial<Partner>) => {
    updatePartnerLib(id, partner);
    setStore(getStore());
  };

  const removePartner = (id: string) => {
    removePartnerLib(id);
    setStore(getStore());
  };

  const addHistoryMilestone = (milestone: Omit<HistoryMilestone, "id">) => {
    const item = addHistoryMilestoneLib(milestone);
    setStore(getStore());
    return item;
  };

  const updateHistoryMilestone = (id: string, milestone: Partial<HistoryMilestone>) => {
    updateHistoryMilestoneLib(id, milestone);
    setStore(getStore());
  };

  const removeHistoryMilestone = (id: string) => {
    removeHistoryMilestoneLib(id);
    setStore(getStore());
  };

  const addProgram = (program: Program) => {
    const item = addProgramLib(program);
    setStore(getStore());
    return item;
  };

  const updateProgram = (slug: string, program: Partial<Program>) => {
    updateProgramLib(slug, program);
    setStore(getStore());
  };

  const removeProgram = (slug: string) => {
    removeProgramLib(slug);
    setStore(getStore());
  };

  const addResource = (res: Omit<Resource, "id">) => {
    const item = addResourceLib(res);
    setStore(getStore());
    return item;
  };

  const updateResource = (id: string, res: Partial<Resource>) => {
    updateResourceLib(id, res);
    setStore(getStore());
  };

  const removeResource = (id: string) => {
    removeResourceLib(id);
    setStore(getStore());
  };

  const addTestimonial = (t: Omit<Testimonial, "id">) => {
    const item = addTestimonialLib(t);
    setStore(getStore());
    return item;
  };

  const updateTestimonial = (id: string, t: Partial<Testimonial>) => {
    updateTestimonialLib(id, t);
    setStore(getStore());
  };

  const removeTestimonial = (id: string) => {
    removeTestimonialLib(id);
    setStore(getStore());
  };

  const reloadStore = () => {
    setStore(getStore());
  };

  return (
    <StoreContext.Provider
      value={{
        store,
        isHydrated,
        saveStoreData,
        updateContactInfo,
        updateImpactStats,
        updatePrograms,
        updateEvents,
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
        reloadStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    const fallbackStore = getStore();
    return {
      store: fallbackStore,
      isHydrated: false,
      saveStoreData: saveStore,
      updateContactInfo: () => {},
      updateImpactStats: () => {},
      updatePrograms: () => {},
      updateEvents: () => {},
      addGalleryImage: addGalleryImageLib,
      removeGalleryImage: removeGalleryImageLib,
      addNewsPost: addNewsPostLib,
      removeNewsPost: removeNewsPostLib,
      addEvent: addEventLib,
      removeEvent: removeEventLib,
      addApplication: addApplicationLib,
      updateApplicationStatus: updateApplicationStatusLib,
      removeApplication: removeApplicationLib,
      addTeamMember: addTeamMemberLib,
      updateTeamMember: updateTeamMemberLib,
      removeTeamMember: removeTeamMemberLib,
      addPartner: addPartnerLib,
      updatePartner: updatePartnerLib,
      removePartner: removePartnerLib,
      addHistoryMilestone: addHistoryMilestoneLib,
      updateHistoryMilestone: updateHistoryMilestoneLib,
      removeHistoryMilestone: removeHistoryMilestoneLib,
      addProgram: addProgramLib,
      updateProgram: updateProgramLib,
      removeProgram: removeProgramLib,
      addResource: addResourceLib,
      updateResource: updateResourceLib,
      removeResource: removeResourceLib,
      addTestimonial: addTestimonialLib,
      updateTestimonial: updateTestimonialLib,
      removeTestimonial: removeTestimonialLib,
      reloadStore: () => {},
    };
  }
  return context;
}
