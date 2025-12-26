import type { ToolCall, SectionContent, SectionType } from "../types";

/**
 * Result of executing an action
 */
export type ActionResult = {
  success: boolean;
  action: string;
  description: string;
  changes?: Record<string, unknown>;
  error?: string;
};

/**
 * Site state that actions can modify
 */
export type SiteState = {
  projectId: string;
  siteId: string;
  sections: SectionContent[];
  styles: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    headingFont?: string;
    bodyFont?: string;
  };
  meta: {
    title: string;
    description: string;
  };
};

/**
 * Action Executor - Executes AI tool calls and modifies site state
 */
export class ActionExecutor {
  private state: SiteState;
  private pendingChanges: ActionResult[] = [];

  constructor(initialState: SiteState) {
    this.state = { ...initialState };
  }

  /**
   * Execute a tool call from the AI
   */
  async execute(toolCall: ToolCall): Promise<ActionResult> {
    const { name, arguments: args } = toolCall;

    try {
      switch (name) {
        case "add_section":
          return this.addSection(args);
        case "remove_section":
          return this.removeSection(args);
        case "edit_section":
          return this.editSection(args);
        case "reorder_sections":
          return this.reorderSections(args);
        case "update_colors":
          return this.updateColors(args);
        case "update_fonts":
          return this.updateFonts(args);
        case "update_seo":
          return this.updateSeo(args);
        case "get_site_info":
          return this.getSiteInfo(args);
        default:
          return {
            success: false,
            action: name,
            description: `Unknown action: ${name}`,
            error: "Action not implemented",
          };
      }
    } catch (error) {
      return {
        success: false,
        action: name,
        description: `Failed to execute ${name}`,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Execute multiple tool calls
   */
  async executeAll(toolCalls: ToolCall[]): Promise<ActionResult[]> {
    const results: ActionResult[] = [];
    for (const toolCall of toolCalls) {
      const result = await this.execute(toolCall);
      results.push(result);
      this.pendingChanges.push(result);
    }
    return results;
  }

  /**
   * Get the current state after modifications
   */
  getState(): SiteState {
    return this.state;
  }

  /**
   * Get pending changes that haven't been saved
   */
  getPendingChanges(): ActionResult[] {
    return this.pendingChanges;
  }

  /**
   * Clear pending changes after saving
   */
  clearPendingChanges(): void {
    this.pendingChanges = [];
  }

  // ============================================
  // Action Implementations
  // ============================================

  private addSection(args: Record<string, unknown>): ActionResult {
    const sectionType = args.section_type as SectionType;
    const position = (args.position as string) || "end";
    const content = args.content as Partial<SectionContent> | undefined;

    const newSection: SectionContent = {
      id: `section_${Date.now()}`,
      type: sectionType,
      title: content?.title || this.getDefaultTitle(sectionType),
      subtitle: content?.subtitle,
      content: content?.content as string | undefined,
      items: content?.items as SectionContent["items"],
    };

    // Insert at the right position
    if (position === "start") {
      this.state.sections.unshift(newSection);
    } else if (position === "after_hero") {
      const heroIndex = this.state.sections.findIndex((s) => s.type === "hero");
      this.state.sections.splice(heroIndex + 1, 0, newSection);
    } else if (position === "before_contact") {
      const contactIndex = this.state.sections.findIndex((s) => s.type === "contact");
      if (contactIndex >= 0) {
        this.state.sections.splice(contactIndex, 0, newSection);
      } else {
        this.state.sections.push(newSection);
      }
    } else {
      this.state.sections.push(newSection);
    }

    return {
      success: true,
      action: "add_section",
      description: `Added ${sectionType} section`,
      changes: { section: newSection },
    };
  }

  private removeSection(args: Record<string, unknown>): ActionResult {
    const sectionId = args.section_id as string | undefined;
    const sectionType = args.section_type as SectionType | undefined;

    let removedIndex = -1;
    if (sectionId) {
      removedIndex = this.state.sections.findIndex((s) => s.id === sectionId);
    } else if (sectionType) {
      removedIndex = this.state.sections.findIndex((s) => s.type === sectionType);
    }

    if (removedIndex === -1) {
      return {
        success: false,
        action: "remove_section",
        description: "Section not found",
        error: "Could not find section to remove",
      };
    }

    const [removed] = this.state.sections.splice(removedIndex, 1);

    return {
      success: true,
      action: "remove_section",
      description: `Removed ${removed.type} section`,
      changes: { removed },
    };
  }

  private editSection(args: Record<string, unknown>): ActionResult {
    const sectionId = args.section_id as string | undefined;
    const sectionType = args.section_type as SectionType | undefined;
    const updates = args.updates as Partial<SectionContent>;

    let section: SectionContent | undefined;
    if (sectionId) {
      section = this.state.sections.find((s) => s.id === sectionId);
    } else if (sectionType) {
      section = this.state.sections.find((s) => s.type === sectionType);
    }

    if (!section) {
      return {
        success: false,
        action: "edit_section",
        description: "Section not found",
        error: "Could not find section to edit",
      };
    }

    // Apply updates
    Object.assign(section, updates);

    return {
      success: true,
      action: "edit_section",
      description: `Updated ${section.type} section`,
      changes: { section, updates },
    };
  }

  private reorderSections(args: Record<string, unknown>): ActionResult {
    const newOrder = args.section_order as string[];

    const reorderedSections: SectionContent[] = [];
    for (const id of newOrder) {
      const section = this.state.sections.find((s) => s.id === id);
      if (section) {
        reorderedSections.push(section);
      }
    }

    // Add any sections not in the order list at the end
    for (const section of this.state.sections) {
      if (!newOrder.includes(section.id)) {
        reorderedSections.push(section);
      }
    }

    this.state.sections = reorderedSections;

    return {
      success: true,
      action: "reorder_sections",
      description: "Reordered sections",
      changes: { newOrder: reorderedSections.map((s) => s.id) },
    };
  }

  private updateColors(args: Record<string, unknown>): ActionResult {
    const updates: Record<string, string> = {};

    if (args.primary_color) {
      this.state.styles.primaryColor = args.primary_color as string;
      updates.primaryColor = args.primary_color as string;
    }
    if (args.secondary_color) {
      this.state.styles.secondaryColor = args.secondary_color as string;
      updates.secondaryColor = args.secondary_color as string;
    }
    if (args.accent_color) {
      this.state.styles.accentColor = args.accent_color as string;
      updates.accentColor = args.accent_color as string;
    }

    return {
      success: true,
      action: "update_colors",
      description: "Updated color scheme",
      changes: updates,
    };
  }

  private updateFonts(args: Record<string, unknown>): ActionResult {
    const updates: Record<string, string> = {};

    if (args.heading_font) {
      this.state.styles.headingFont = args.heading_font as string;
      updates.headingFont = args.heading_font as string;
    }
    if (args.body_font) {
      this.state.styles.bodyFont = args.body_font as string;
      updates.bodyFont = args.body_font as string;
    }

    return {
      success: true,
      action: "update_fonts",
      description: "Updated typography",
      changes: updates,
    };
  }

  private updateSeo(args: Record<string, unknown>): ActionResult {
    const updates: Record<string, unknown> = {};

    if (args.page_title) {
      this.state.meta.title = args.page_title as string;
      updates.title = args.page_title;
    }
    if (args.meta_description) {
      this.state.meta.description = args.meta_description as string;
      updates.description = args.meta_description;
    }

    return {
      success: true,
      action: "update_seo",
      description: "Updated SEO settings",
      changes: updates,
    };
  }

  private getSiteInfo(_args: Record<string, unknown>): ActionResult {
    return {
      success: true,
      action: "get_site_info",
      description: "Retrieved site information",
      changes: {
        sectionCount: this.state.sections.length,
        sectionTypes: this.state.sections.map((s) => s.type),
        styles: this.state.styles,
        meta: this.state.meta,
      },
    };
  }

  // ============================================
  // Helpers
  // ============================================

  private getDefaultTitle(type: SectionType): string {
    const titles: Record<SectionType, string> = {
      hero: "Welcome",
      about: "About Us",
      features: "Features",
      services: "Our Services",
      menu: "Menu",
      portfolio: "Our Work",
      gallery: "Gallery",
      testimonials: "What Our Customers Say",
      team: "Meet the Team",
      pricing: "Pricing",
      contact: "Get in Touch",
      cta: "Ready to Get Started?",
      newsletter: "Stay Updated",
      faq: "Frequently Asked Questions",
      blog: "Latest Posts",
    };
    return titles[type] || "New Section";
  }
}
