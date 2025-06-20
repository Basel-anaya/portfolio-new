// ===== RESPONSIVE SPACING UTILITIES =====
// Consistent spacing system for mobile, tablet, and desktop views

export const spacing = {
  // Container spacing
  container: {
    padding: "px-4 sm:px-6 lg:px-8", // 16px -> 24px -> 32px
    maxWidth: "max-w-7xl mx-auto",
  },

  // Section spacing
  section: {
    padding: "py-12 sm:py-16 lg:py-20", // 48px -> 64px -> 80px
    gap: "space-y-8 sm:space-y-12 lg:space-y-16",
  },

  // Hero section spacing
  hero: {
    paddingTop: "pt-24 sm:pt-32 lg:pt-40", // 96px -> 128px -> 160px
    paddingBottom: "pb-12 sm:pb-16 lg:pb-20", // 48px -> 64px -> 80px
    gap: "space-y-6 sm:space-y-8 lg:space-y-12",
  },

  // Card spacing
  card: {
    padding: "p-6 sm:p-8 lg:p-10", // 24px -> 32px -> 40px
    gap: "gap-4 sm:gap-6 lg:gap-8", // 16px -> 24px -> 32px
    grid: "grid gap-4 sm:gap-6 lg:gap-8",
  },

  // Content spacing
  content: {
    gap: "space-y-4 sm:space-y-6 lg:space-y-8", // 16px -> 24px -> 32px
    flexGap: "gap-4 sm:gap-6 lg:gap-8",
  },

  // Text spacing
  text: {
    gap: "space-y-3 sm:space-y-4 lg:space-y-5", // 12px -> 16px -> 20px
    marginBottom: "mb-3 sm:mb-4 lg:mb-5",
  },

  // Button spacing
  button: {
    padding: "px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-4", // Responsive button padding
    gap: "gap-2 sm:gap-3",
  },

  // Grid layouts
  grid: {
    cols1: "grid grid-cols-1",
    cols2: "grid grid-cols-1 md:grid-cols-2",
    cols3: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    cols4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    gap: "gap-4 sm:gap-6 lg:gap-8",
  },

  // Navigation
  nav: {
    height: "h-16 lg:h-20", // 64px -> 80px
    padding: "px-4 sm:px-6 lg:px-8",
  },

  // Form elements
  form: {
    gap: "space-y-4 sm:space-y-6",
    input: "px-4 py-3 sm:px-6 sm:py-4",
    maxWidth: "max-w-md sm:max-w-lg",
  },

  // Timeline/List items
  timeline: {
    gap: "space-y-6 sm:space-y-8 lg:space-y-12",
    itemPadding: "p-4 sm:p-6 lg:p-8",
  },

  // Modal/Dialog spacing
  modal: {
    padding: "p-6 sm:p-8 lg:p-10",
    gap: "space-y-4 sm:space-y-6",
  },
} as const

// ===== RESPONSIVE BREAKPOINT UTILITIES =====
export const breakpoints = {
  mobile: "max-w-sm", // 384px
  tablet: "max-w-2xl", // 672px
  desktop: "max-w-6xl", // 1152px
  wide: "max-w-7xl", // 1280px
} as const

// ===== COMPONENT-SPECIFIC SPACING =====
export const componentSpacing = {
  // Project cards
  projectCard: {
    container: `${spacing.card.padding} ${spacing.card.gap}`,
    grid: `${spacing.grid.cols2} lg:grid-cols-1 ${spacing.grid.gap}`,
    featuredGrid: `${spacing.grid.cols1} lg:grid-cols-2 ${spacing.grid.gap}`,
  },

  // Research papers
  researchCard: {
    container: `${spacing.card.padding} ${spacing.content.gap}`,
    grid: `${spacing.grid.cols1} md:grid-cols-2 ${spacing.grid.gap}`,
    featuredContainer: `${spacing.card.padding} space-y-6 sm:space-y-8`,
  },

  // Blog posts
  blogCard: {
    container: `${spacing.card.padding} ${spacing.content.gap}`,
    grid: `${spacing.grid.cols1} lg:grid-cols-2 ${spacing.grid.gap}`,
    listGap: "space-y-4 sm:space-y-6",
  },

  // Experience timeline
  timeline: {
    container: `${spacing.timeline.gap}`,
    item: `${spacing.timeline.itemPadding} ${spacing.content.gap}`,
  },

  // Services/Skills grid
  services: {
    grid: `${spacing.grid.cols1} md:grid-cols-2 lg:grid-cols-3 ${spacing.grid.gap}`,
    card: `${spacing.card.padding} text-center ${spacing.content.gap}`,
  },

  // Contact form
  contact: {
    form: `${spacing.form.gap} ${spacing.form.maxWidth}`,
    input: spacing.form.input,
  },
} as const

// ===== UTILITY FUNCTIONS =====
export const getResponsiveSpacing = (
  mobile: string,
  tablet?: string,
  desktop?: string
) => {
  const tabletClass = tablet ? `sm:${tablet}` : ""
  const desktopClass = desktop ? `lg:${desktop}` : ""
  return [mobile, tabletClass, desktopClass].filter(Boolean).join(" ")
}

// Helper function to combine spacing classes
export const combineSpacing = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

// ===== COMMON LAYOUT PATTERNS =====
export const layouts = {
  // Full-width section with container
  section: `${spacing.section.padding} ${spacing.container.padding}`,
  
  // Hero section layout
  hero: `${spacing.hero.paddingTop} ${spacing.hero.paddingBottom} ${spacing.container.padding}`,
  
  // Content section with max-width
  content: `${spacing.section.padding} ${spacing.container.padding} ${spacing.container.maxWidth}`,
  
  // Card grid layout
  cardGrid: `${spacing.container.padding} ${spacing.container.maxWidth} ${spacing.content.gap}`,
  
  // Centered content
  centered: "flex flex-col items-center justify-center text-center",
  
  // Two-column layout
  twoColumn: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
} as const

export default spacing 