import { AstroActionState } from "./AstroAnimations";

export interface SectionWaypoint {
  sectionId: string;
  defaultPose: AstroActionState;
  screenAlignX: "right" | "left" | "center";
  offsetBottomPx: number; // Offset from bottom of viewport
  offsetSidePx: number;   // Offset from right or left edge
  rotationY: number;      // In radians
}

export const SECTION_WAYPOINTS: Record<string, SectionWaypoint> = {
  introduction: {
    sectionId: "introduction",
    defaultPose: "wave",
    screenAlignX: "right",
    offsetBottomPx: 24,
    offsetSidePx: 28,
    rotationY: -0.2,
  },
  about: {
    sectionId: "about",
    defaultPose: "sit",
    screenAlignX: "right",
    offsetBottomPx: 32,
    offsetSidePx: 28,
    rotationY: -0.3,
  },
  journey: {
    sectionId: "journey",
    defaultPose: "walk",
    screenAlignX: "right",
    offsetBottomPx: 28,
    offsetSidePx: 28,
    rotationY: -0.15,
  },
  "skills-section": {
    sectionId: "skills-section",
    defaultPose: "point",
    screenAlignX: "right",
    offsetBottomPx: 36,
    offsetSidePx: 28,
    rotationY: -0.35,
  },
  workbench: {
    sectionId: "workbench",
    defaultPose: "float",
    screenAlignX: "right",
    offsetBottomPx: 28,
    offsetSidePx: 28,
    rotationY: -0.25,
  },
  projects: {
    sectionId: "projects",
    defaultPose: "celebrate",
    screenAlignX: "right",
    offsetBottomPx: 32,
    offsetSidePx: 28,
    rotationY: 0,
  },
  certifications: {
    sectionId: "certifications",
    defaultPose: "float",
    screenAlignX: "right",
    offsetBottomPx: 28,
    offsetSidePx: 28,
    rotationY: -0.2,
  },
  contact: {
    sectionId: "contact",
    defaultPose: "wave",
    screenAlignX: "right",
    offsetBottomPx: 24,
    offsetSidePx: 28,
    rotationY: 0.1,
  },
};

export class AstroMovementController {
  private currentSectionId: string = "introduction";
  private isTraveling: boolean = false;
  private travelProgress: number = 1.0;

  public getCurrentSection(): string {
    return this.currentSectionId;
  }

  public getWaypoint(sectionId: string): SectionWaypoint {
    return SECTION_WAYPOINTS[sectionId] || SECTION_WAYPOINTS.introduction;
  }

  public updateScrollPosition(scrollY: number, windowHeight: number): {
    sectionId: string;
    hasChanged: boolean;
    defaultPose: AstroActionState;
  } {
    const sections = Object.keys(SECTION_WAYPOINTS);
    const probePoint = scrollY + windowHeight * 0.45;

    let active = this.currentSectionId;

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (probePoint >= top && probePoint < top + height) {
          active = id;
          break;
        }
      }
    }

    const hasChanged = active !== this.currentSectionId;
    if (hasChanged) {
      this.currentSectionId = active;
      this.isTraveling = true;
      this.travelProgress = 0;
    }

    return {
      sectionId: active,
      hasChanged,
      defaultPose: this.getWaypoint(active).defaultPose,
    };
  }
}
