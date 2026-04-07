# 🎨 MERN Job Portal — Complete Design Details

A comprehensive design specification covering the visual language, component styling, animation system, scroll behavior, and interaction design for the Job Portal — built with Tailwind CSS, Framer Motion, and Locomotive Scroll.

---

## 📑 Table of Contents

- [Design Philosophy](#design-philosophy)
- [Color System — Dark & Light Mode](#color-system--dark--light-mode)
- [Typography System](#typography-system)
- [Spacing & Layout Grid](#spacing--layout-grid)
- [Tailwind CSS Configuration](#tailwind-css-configuration)
- [Dark / Light Mode Setup](#dark--light-mode-setup)
- [Locomotive Scroll Setup & Usage](#locomotive-scroll-setup--usage)
- [Framer Motion — Animation System](#framer-motion--animation-system)
- [Page-by-Page Design Breakdown](#page-by-page-design-breakdown)
  - [Landing / Hero Page](#1-landing--hero-page)
  - [Login Page](#2-login-page)
  - [Signup Page](#3-signup-page)
  - [Job Seeker Dashboard](#4-job-seeker-dashboard)
  - [Job Listing & Cards](#5-job-listing--cards)
  - [Job Details Page](#6-job-details-page)
  - [Applied Jobs Page](#7-applied-jobs-page)
  - [Recruiter Dashboard](#8-recruiter-dashboard)
  - [Post / Edit Job Page](#9-post--edit-job-page)
  - [Applicants List Page](#10-applicants-list-page)
  - [Admin Dashboard](#11-admin-dashboard)
  - [Admin Management Pages](#12-admin-management-pages)
- [Component Design Specifications](#component-design-specifications)
- [Micro-interactions & Hover Effects](#micro-interactions--hover-effects)
- [Navbar Design & Animation](#navbar-design--animation)
- [Loading & Skeleton States](#loading--skeleton-states)
- [Notification System Design](#notification-system-design)
- [Responsive Design Strategy](#responsive-design-strategy)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Package Installation Reference](#package-installation-reference)

---

## 🧠 Design Philosophy

The portal follows a **Modern & Corporate** design language — clean, trustworthy, and professional, similar to LinkedIn but with richer animation and a stronger visual hierarchy. The goal is to feel like a product people trust with their career decisions.

**Core Principles:**

- **Clarity over decoration** — every visual element serves a purpose
- **Depth through motion** — animations communicate state, not just aesthetics
- **Consistency** — a unified token system across light and dark mode
- **Speed perception** — skeleton loaders and staggered reveals make the UI feel instant
- **Hierarchy** — strong typographic scale and whitespace guide the eye naturally

---

## 🎨 Color System — Dark & Light Mode

### Brand Colors (Mode-Agnostic)

| Token | Hex | Usage |
|---|---|---|
| `brand-primary` | `#2563EB` | Primary CTAs, links, active states |
| `brand-primary-hover` | `#1D4ED8` | Hover state on primary buttons |
| `brand-secondary` | `#0EA5E9` | Accents, highlights, badges |
| `brand-success` | `#10B981` | Accepted status, success toasts |
| `brand-warning` | `#F59E0B` | Pending status, warnings |
| `brand-danger` | `#EF4444` | Rejected status, delete actions |

### Light Mode Palette

| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#F8FAFC` | Page background |
| `bg-surface` | `#FFFFFF` | Cards, modals, sidebars |
| `bg-muted` | `#F1F5F9` | Input backgrounds, secondary sections |
| `border-default` | `#E2E8F0` | Card borders, dividers |
| `text-primary` | `#0F172A` | Headings, main body text |
| `text-secondary` | `#475569` | Subtitles, labels, helper text |
| `text-muted` | `#94A3B8` | Placeholder text, timestamps |

### Dark Mode Palette

| Token | Hex | Usage |
|---|---|---|
| `bg-base` | `#0B1120` | Page background (deep navy-black) |
| `bg-surface` | `#111827` | Cards, modals, sidebars |
| `bg-muted` | `#1E2A3B` | Input backgrounds, secondary sections |
| `border-default` | `#1F2D3D` | Card borders, dividers |
| `text-primary` | `#F1F5F9` | Headings, main body text |
| `text-secondary` | `#94A3B8` | Subtitles, labels, helper text |
| `text-muted` | `#475569` | Placeholder text, timestamps |

### Glassmorphism (Dark Mode Cards)
Dark mode cards use a frosted glass effect on key surfaces:
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Backdrop filter: `blur(12px)`
- Applied via a Tailwind custom utility class `glass-card`

---

## 🔤 Typography System

**Font Stack:**
- **Primary Font:** `Inter` — Used for all body text, UI labels, and navigation (imported from Google Fonts)
- **Display Font:** `Cal Sans` or `Sora` — Used for hero headings, dashboard stat numbers, and section titles
- **Monospace:** `JetBrains Mono` — Used for job IDs, status codes, timestamps in admin panel

**Type Scale (Tailwind classes):**

| Role | Class | Size | Weight |
|---|---|---|---|
| Hero Heading | `text-5xl md:text-7xl` | 48–72px | 700 (Bold) |
| Section Heading | `text-3xl md:text-4xl` | 30–36px | 600 (SemiBold) |
| Card Title | `text-xl` | 20px | 600 |
| Body Text | `text-base` | 16px | 400 |
| Label / Caption | `text-sm` | 14px | 500 |
| Micro / Timestamp | `text-xs` | 12px | 400 |

**Line Height:** `leading-relaxed` (1.625) for body, `leading-tight` (1.25) for headings.

**Letter Spacing:** `tracking-tight` on large headings, `tracking-wide` on uppercase labels and badges.

---

## 📐 Spacing & Layout Grid

**Base Unit:** `4px` (Tailwind's default spacing scale)

**Content Max Width:** `max-w-7xl` (1280px) centered with `mx-auto px-4 sm:px-6 lg:px-8`

**Section Vertical Padding:** `py-16 md:py-24` for full-page sections, `py-8 md:py-12` for inner sections

**Card Padding:** `p-6` standard, `p-8` for feature cards and form containers

**Grid System:**
- Job listing grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-6`
- Dashboard stats: `grid-cols-2 md:grid-cols-4` with `gap-4`
- Two-column layout (sidebar + content): `grid-cols-1 lg:grid-cols-[280px_1fr]` with `gap-8`

**Border Radius:**
- Cards: `rounded-2xl`
- Buttons: `rounded-xl`
- Inputs: `rounded-lg`
- Badges: `rounded-full`
- Avatars: `rounded-full`

---

## ⚙️ Tailwind CSS Configuration

Extend `tailwind.config.js` with the following custom tokens to support the design system:

**Custom Colors:** Register all brand, light mode, and dark mode palette values under `theme.extend.colors` with names matching the token table above (e.g., `brand-primary`, `bg-surface`).

**Custom Font Families:** Register `inter`, `sora`, and `jetbrains` under `theme.extend.fontFamily` pointing to the imported Google Font names.

**Custom Animations:** Register the following under `theme.extend.keyframes` and `theme.extend.animation`:
- `fade-up` — Translates from `translateY(20px)` to `translateY(0)` while fading in opacity from 0 to 1 over `0.5s ease-out`
- `fade-in` — Opacity 0 to 1 over `0.4s ease`
- `shimmer` — Background position sweep from left to right for skeleton loading effect
- `float` — Subtle `translateY(-6px)` and back loop for hero decorative elements, infinite with `ease-in-out` easing
- `pulse-glow` — Box shadow pulse from transparent to a blue glow and back, used on the primary CTA button

**Custom Utilities (via plugin):** Register `glass-card` as a utility that applies the glassmorphism background, border, and backdrop-filter values described in the color system.

**Dark Mode Strategy:** Set `darkMode: 'class'` so dark mode is toggled by adding the `dark` class to the `<html>` element programmatically.

---

## 🌗 Dark / Light Mode Setup

**Toggle Mechanism:**

A custom `useTheme` hook manages the current theme. It reads the saved preference from `localStorage` on initial load (defaulting to the OS preference via `window.matchMedia('(prefers-color-scheme: dark)')`). When toggled, it adds or removes the `dark` class from `document.documentElement` and saves the preference to `localStorage`.

**Toggle UI:**

A sun/moon icon button in the Navbar. On toggle, the icon switches with a Framer Motion `AnimatePresence` cross-fade. The button itself uses `whileTap={{ scale: 0.9 }}` for tactile feedback.

**Tailwind Usage Pattern:**

All color classes are written in pairs: `bg-white dark:bg-bg-surface`, `text-text-primary dark:text-text-primary` (using custom tokens), `border-border-default dark:border-border-default`. Components never hardcode colors without their dark mode counterpart.

---

## 🚂 Locomotive Scroll Setup & Usage

Locomotive Scroll provides smooth momentum-based scrolling and scroll-triggered reveal effects throughout the site.

**Installation:** `npm install locomotive-scroll`

**Setup in React:**

Create a custom `useLocomotiveScroll` hook that:
1. Initializes a new `LocomotiveScroll` instance inside a `useEffect` targeting the main scroll container ref
2. Sets `smooth: true`, `multiplier: 0.9`, and `lerp: 0.08` for a fluid, slightly slow easing feel
3. Calls `scroll.destroy()` in the cleanup function to prevent memory leaks on unmount
4. Re-initializes on route changes by listening to the React Router location

**Scroll Container Setup:**

The main wrapper `div` in `App.jsx` gets `data-scroll-container` attribute. All page wrappers get `data-scroll-section`. This is the root element Locomotive targets.

**Scroll-Triggered Reveals:**

Elements that should animate in on scroll get:
- `data-scroll` — marks the element for scroll detection
- `data-scroll-speed="1"` (or `2`, `0.5`) — controls parallax speed relative to page scroll
- `data-scroll-delay="0.1"` — adds momentum delay for a trailing effect

**Parallax Elements:**
- Hero background gradient blob: `data-scroll-speed="-2"` (moves slower than scroll = depth effect)
- Hero illustration/mockup image: `data-scroll-speed="-1"`
- Section decorative shapes: `data-scroll-speed="1.5"`

**Important:** Locomotive Scroll and Framer Motion are used together. Locomotive handles the scroll physics and parallax. Framer Motion handles element entry animations and interaction states. They do not conflict as long as Locomotive's virtual scroll position is passed to Framer Motion's `useScroll` via a custom sync if scroll-linked animations are needed.

---

## 🎬 Framer Motion — Animation System

**Installation:** `npm install framer-motion`

### Reusable Animation Variants

Define a central `animations.js` file in `src/utils/` that exports all shared Framer Motion variants. This ensures consistency across pages.

**`fadeUpVariant`**
Used for text blocks, cards, and sections that enter from below:
- Hidden: `opacity: 0, y: 40`
- Visible: `opacity: 1, y: 0`
- Transition: `duration: 0.6, ease: [0.22, 1, 0.36, 1]` (custom cubic bezier for a natural deceleration feel)

**`fadeInVariant`**
Used for overlays, modals, and backgrounds:
- Hidden: `opacity: 0`
- Visible: `opacity: 1`
- Transition: `duration: 0.4, ease: "easeOut"`

**`staggerContainerVariant`**
Applied to parent containers (e.g., job card grid, stats row) to stagger children:
- `staggerChildren: 0.1`
- `delayChildren: 0.2`

**`scaleUpVariant`**
Used for modal/dialog entrance:
- Hidden: `opacity: 0, scale: 0.95`
- Visible: `opacity: 1, scale: 1`
- Transition: `duration: 0.3, ease: "easeOut"`

**`slideInLeftVariant`**
Used for sidebar drawer and filter panel:
- Hidden: `x: -60, opacity: 0`
- Visible: `x: 0, opacity: 1`

**`slideInRightVariant`**
Used for notification dropdown and right-side panels:
- Hidden: `x: 60, opacity: 0`
- Visible: `x: 0, opacity: 1`

### Page Transition Wrapper

Create a `PageTransition.jsx` component that wraps every page. It uses Framer Motion's `motion.div` with `AnimatePresence` in `App.jsx` and applies `fadeUpVariant` with `initial`, `animate`, and `exit` props. The exit animation fades out with a slight upward drift (`y: -20, opacity: 0`) for a smooth page leave. `AnimatePresence` in `App.jsx` is set to `mode="wait"` so the exit animation fully completes before the new page enters.

### Scroll-Triggered Animations with `useInView`

Use Framer Motion's `useInView` hook (with `once: true` and `margin: "-100px"`) on section wrappers. When a section enters the viewport, set `controls.start("visible")` using `useAnimation`. This provides the scroll-reveal effect for sections that Locomotive Scroll does not cover animation-wise (Locomotive handles physics, Framer handles the motion).

---

## 📄 Page-by-Page Design Breakdown

---

### 1. Landing / Hero Page

**Layout:** Full viewport height hero (`min-h-screen`) with a two-column layout on desktop (text left, visual right) and stacked on mobile.

**Background:**
- Light mode: Soft radial gradient from `#EFF6FF` (blue-50) at top-left bleeding into `#F8FAFC`
- Dark mode: Deep navy `#0B1120` with a large blurred radial gradient blob in `brand-primary` at 8% opacity, positioned top-right. The blob is animated with Framer Motion's `animate` to slowly drift (`x: [0, 30, 0]`, `y: [0, -20, 0]`) on an infinite 12-second loop.

**Hero Text Block (Left Column):**
- Eyebrow label: Small pill badge with "✦ Now with AI-powered matching" — uses `bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full px-4 py-1 text-sm font-medium`
- Main heading: Two lines, `text-5xl md:text-7xl font-bold leading-tight`. First line in `text-primary`, second line uses a CSS gradient text (`bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent`).
- Subheading: `text-lg text-text-secondary max-w-md leading-relaxed` — one concise value proposition sentence
- CTA Buttons: Two buttons side by side. Primary: solid `bg-brand-primary text-white` with `pulse-glow` animation. Secondary: outlined `border border-border-default text-text-primary` with a subtle hover fill.
- Trust line: Below CTAs — small logos or text "Trusted by 500+ companies" in `text-xs text-text-muted`

**Hero Visual (Right Column):**
- A stylized UI mockup of the job listing page as a floating card — use a `div` with a screenshot or a coded mini-replica
- Drop shadow: `shadow-2xl shadow-brand-primary/10`
- Framer Motion: `data-scroll-speed="-1"` for parallax + entry with `fadeUpVariant` delayed `0.3s`
- Three small floating stat cards positioned absolutely around the mockup (e.g., "1200+ Jobs", "98% Match Rate", "Active Today") — each floats with the `float` keyframe animation at different durations (3s, 4s, 3.5s) for organic movement

**Scroll Indicator:**
- Animated bouncing chevron or scroll line at the bottom center of the hero
- Framer Motion: `animate={{ y: [0, 8, 0] }}` on infinite loop with `duration: 1.5`

**Below the Fold Sections (scroll-revealed):**

- **Stats Strip:** Full-width dark/light surface band with 4 key numbers. Numbers animate from 0 to their value using Framer Motion's `useMotionValue` and a spring animation when in view.
- **How It Works:** Three-step horizontal process with connecting lines. Each step card enters with `staggerContainerVariant` and `fadeUpVariant` on scroll.
- **Featured Jobs Strip:** A horizontally scrollable row of 4–5 `JobCard` components with a "View All Jobs" CTA.
- **Testimonials / Companies:** A logo marquee strip. Uses CSS `@keyframes marquee` with `animation: marquee 20s linear infinite` on a duplicated list of company logo placeholders.
- **CTA Banner:** Full-width gradient section with centered heading and signup button. Background uses an animated mesh gradient.

---

### 2. Login Page

**Layout:** Split screen — left decorative panel (40%), right form panel (60%) on desktop. Full-width single column on mobile.

**Left Panel (Desktop Only):**
- Dark navy or brand-primary gradient background
- Large abstract geometric illustration (circles, lines, grid dots) using pure SVG or a Lottie animation
- A quote or tagline over the illustration: `"Your next opportunity starts here."`
- Bottom: Logos or partner company names in muted opacity

**Right Form Panel:**
- White (light) / `bg-surface` (dark) background
- Centered form container: `max-w-sm mx-auto py-16 px-8`
- Logo at top: small portal logo with name
- Heading: "Welcome back" in `text-3xl font-bold`
- Subtext: "Don't have an account? Sign up" with link in `text-brand-primary`
- Form fields: Email and Password inputs with floating labels (label sits inside the input and floats up on focus/filled state using CSS transition)
- Password field includes an eye toggle icon using Framer Motion `AnimatePresence` to swap between eye-open and eye-closed icons
- Primary button: Full width, `bg-brand-primary` with loading spinner replacing text on submit (Framer Motion `AnimatePresence` swaps the button content)
- Social/divider: "or continue with" divider, followed by Google OAuth button placeholder
- Error message: Slides down from above the button using `slideInVariant` with a red background alert

**Animations:**
- Form panel enters with `fadeUpVariant` on mount
- Each form field enters sequentially using `staggerContainerVariant` with `0.08s` stagger
- Input focus ring animates width using a CSS transition: `transition: all 0.2s ease`

---

### 3. Signup Page

**Layout:** Identical split-screen structure as Login. The right panel form is slightly taller due to additional fields.

**Form Fields (in order):**
- Full Name
- Email Address
- Password
- Confirm Password
- Role Selector (two large toggle cards side by side: "Job Seeker" with a person icon and "Recruiter" with a building icon; selected card gets `border-brand-primary bg-brand-primary/5` styling)

**Recruiter Notice:**
- After selecting "Recruiter", a small animated info box slides down using `scaleUpVariant`:
  `ℹ️ Recruiter accounts require admin approval before you can post jobs.` — styled in `bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary rounded-lg p-3 text-sm`

**Password Strength Indicator:**
- Rendered below the password input as a row of 4 thin bars
- Bars fill and color-change (red → orange → yellow → green) as password complexity increases
- Width transition: `transition: width 0.3s ease` on each bar

---

### 4. Job Seeker Dashboard

**Layout:** Full-width page. Top welcome header, then filter panel + job grid.

**Welcome Header:**
- `"Good morning, [Name] 👋"` in `text-3xl font-semibold`
- Subtext with today's date and quick stats ("You have 3 active applications")
- Framer Motion: Text enters with `fadeUpVariant` on page load

**Filter Bar:**
- Sticky `top-[72px]` filter bar (below Navbar) with horizontal scroll on mobile
- Contains: Search input (with animated search icon that slides left on focus), Location dropdown, Salary range slider, a Tags row for quick filters (Full-time, Remote, Internship)
- On filter change, the job grid re-renders with `AnimatePresence` — exiting cards fly out with `x: -20, opacity: 0` and new cards enter with `fadeUpVariant`

**Job Cards Grid:**
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Cards use `staggerContainerVariant` so they load in sequence rather than all at once
- "No results" state: A centered illustration with `fadeInVariant` and a friendly message

---

### 5. Job Listing & Cards

**JobCard Component Design:**

The `JobCard` is the most important visual component in the system. It should feel premium and interactive.

**Card Structure:**
- Container: `bg-surface border border-border-default rounded-2xl p-6 flex flex-col gap-4`
- Dark mode: Uses `glass-card` utility for the frosted glass effect
- Hover: `hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/5` — the border subtly glows blue on hover
- Hover Lift: Framer Motion `whileHover={{ y: -4 }}` with `transition: { duration: 0.2 }`

**Card Top Row:**
- Company logo placeholder: 48×48px circle with the first letter of company in `bg-brand-primary/10 text-brand-primary font-bold rounded-xl`
- Company name: `text-sm text-text-secondary font-medium`
- "New" badge (if posted within 24 hours): `bg-brand-success/10 text-brand-success text-xs font-semibold px-2 py-0.5 rounded-full`

**Card Middle:**
- Job title: `text-lg font-semibold text-text-primary` — truncated to 2 lines with `line-clamp-2`
- Tags row: Location chip, Salary chip, Job type chip — each using `bg-bg-muted text-text-secondary text-xs px-3 py-1 rounded-full`

**Card Bottom:**
- Posted date: `text-xs text-text-muted`
- "Apply Now" button: `bg-brand-primary text-white text-sm px-4 py-2 rounded-lg` with `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.97 }}`

---

### 6. Job Details Page

**Layout:** Centered single column, `max-w-3xl mx-auto`

**Header Block:**
- Large company logo (80px), job title in `text-4xl font-bold`, company name, and location
- Row of tag chips (salary, type, location)
- "Apply Now" CTA button — sticky on mobile (fixed to bottom of screen)
- Share icon button on the right

**Content:**
- Description rendered with prose styling: `prose prose-slate dark:prose-invert max-w-none`
- Section dividers using a simple `border-t border-border-default my-8`

**Sidebar (Desktop):** Company info card, similar jobs list

**Apply Button Interaction:**
- On click: Button animates to a loading state (spinner)
- On success: Framer Motion `AnimatePresence` replaces the button with a green checkmark + "Applied!" text
- On already-applied: Button is disabled with `opacity-50 cursor-not-allowed` and shows "Already Applied"

---

### 7. Applied Jobs Page

**Layout:** Full-width list view

**Status Tabs:**
- Three tabs at the top: "All", "Pending", "Accepted", "Rejected"
- Active tab has an animated underline indicator using `layoutId="tab-indicator"` in Framer Motion — the blue underline slides smoothly between tabs

**Application List Items:**
- Each item: `bg-surface border border-border-default rounded-2xl p-5 flex items-center justify-between gap-4`
- Left: Company logo + Job title + Company name
- Center: Applied date
- Right: `ApplicationStatusBadge` + a "View Job" link
- Entry animation: `staggerContainerVariant` so items load top to bottom in sequence

---

### 8. Recruiter Dashboard

**Pending Approval State:**
- If `isApproved === false`: Full page centered message with an animated hourglass Lottie or SVG animation, heading "Your account is under review", and a subtext explaining the process. Uses `scaleUpVariant` to enter.

**Approved State Layout:**

- **Stats Row:** 4 stat cards — Total Jobs Posted, Total Applicants, Active Jobs, Applications This Week
  - Each card: `bg-surface border border-border-default rounded-2xl p-6`
  - Stat number animates from 0 on mount using Framer Motion `useSpring`
  - Icon in top-right corner in a `bg-brand-primary/10` rounded square

- **Recent Applicants Table:** Last 5 applicants across all jobs, showing name, job they applied for, and status badge

- **Quick Actions:** Two large CTA cards — "Post a New Job" and "Manage Existing Jobs" — with icons and hover lift animation

---

### 9. Post / Edit Job Page

**Layout:** Centered form, `max-w-2xl mx-auto`

**Form Design:**
- White card container with `shadow-sm rounded-2xl p-8`
- Section heading: "Post a New Job" or "Edit Job"
- All inputs use the floating label pattern
- Salary field: Two inputs side by side (Min / Max) with a "per month" label
- Description: A styled `textarea` with character count shown bottom-right in `text-xs text-text-muted`
- Form progress indicator: A thin progress bar at the top of the card that fills as required fields are completed — `bg-brand-primary h-1 rounded-full transition-all duration-300`

**Submit Button:**
- Full-width with Framer Motion loading state (text swaps to spinner + "Posting..." on submit)
- Success: Redirects with a toast notification

---

### 10. Applicants List Page

**Layout:** Two-panel on desktop — left panel shows the job summary card, right panel shows the applicants table.

**Applicants Table:**
- Columns: Avatar + Name, Email, Applied On, Status, Actions
- Each row enters with `staggerContainerVariant`
- Status column: `ApplicationStatusBadge`
- Actions column: A small dropdown (Accept / Reject) that slides down with `scaleUpVariant`

**Status Change Interaction:**
- On status change: The status badge animates out and the new badge animates in using `AnimatePresence` with `scaleUpVariant`
- A toast notification confirms the action

---

### 11. Admin Dashboard

**Layout:** Two-column — left sidebar navigation (fixed), right content area (scrollable)

**Sidebar:**
- `w-64 bg-surface border-r border-border-default h-screen sticky top-0`
- Logo at top
- Navigation links with active state: Active link gets `bg-brand-primary/10 text-brand-primary border-r-2 border-brand-primary rounded-l-none rounded-r-lg`
- Active link indicator slides with `layoutId="sidebar-indicator"` for smooth transition
- Bottom: User avatar + name + logout button

**Stats Cards Row:**
- 4 large stat cards: Total Users, Total Recruiters (split into Approved / Pending), Total Jobs
- Pending Recruiters card uses `bg-brand-warning/10 border-brand-warning/20` to visually highlight action needed
- All numbers animate from 0 using `useSpring`

**Recent Activity Feed:**
- Right side of the dashboard shows a live activity log
- Each event (new user registered, job posted, application submitted) is a list item with a timestamp
- New items slide in from the top using `slideInRightVariant` with `AnimatePresence`

---

### 12. Admin Management Pages

**Manage Users / Manage Jobs:**
- Table-based layout with search input at the top
- Column headers are sortable — clicking a header sorts the data and shows a sort arrow icon with `animate={{ rotate: 180 }}` for descending
- Delete action: Clicking delete triggers a confirmation modal that enters with `scaleUpVariant` on a `fadeInVariant` backdrop overlay

**Manage Recruiters:**
- Card-grid layout using `RecruiterApprovalCard` components
- Pending approval cards visually differentiated: `border-brand-warning/40 bg-brand-warning/5`
- Approve button: `bg-brand-success` with check icon. On success, the card flips (CSS 3D `rotateY(180deg)` with front/back faces) to show an "Approved" state before sliding out of the pending list.

---

## 🧩 Component Design Specifications

### Primary Button
- Base: `bg-brand-primary text-white font-semibold px-6 py-3 rounded-xl`
- Hover: `hover:bg-brand-primary-hover`
- Active: `active:scale-[0.97]` via Tailwind or `whileTap={{ scale: 0.97 }}`
- Disabled: `opacity-50 cursor-not-allowed`
- Loading state: Spinner icon replaces label using `AnimatePresence`
- Framer Motion: `whileHover={{ scale: 1.01 }}` and `whileTap={{ scale: 0.97 }}`

### Secondary Button (Outlined)
- Base: `border border-border-default text-text-primary font-semibold px-6 py-3 rounded-xl`
- Hover: `hover:bg-bg-muted`
- Framer Motion: Same as primary

### Text Input / Floating Label Input
- Container: `relative`
- Input: `w-full bg-bg-muted border border-border-default rounded-lg px-4 pt-6 pb-2 text-text-primary focus:outline-none focus:border-brand-primary peer`
- Label: `absolute left-4 top-2 text-xs text-text-muted peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary transition-all duration-200`
- Focus ring: `focus:ring-2 focus:ring-brand-primary/20`
- Error state: `border-brand-danger focus:border-brand-danger focus:ring-brand-danger/20` with error text below

### Status Badge
- Pending: `bg-brand-warning/10 text-brand-warning border border-brand-warning/20`
- Accepted: `bg-brand-success/10 text-brand-success border border-brand-success/20`
- Rejected: `bg-brand-danger/10 text-brand-danger border border-brand-danger/20`
- All: `text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5`
- Dot indicator: `w-1.5 h-1.5 rounded-full bg-current`

### Toast Notification
- Position: Fixed `bottom-6 right-6`
- Container: `flex flex-col gap-2`
- Each toast: `bg-surface border border-border-default shadow-xl rounded-xl px-5 py-4 flex items-center gap-3 min-w-[300px]`
- Left icon: Colored based on type (success/error/info)
- Framer Motion: Enters with `x: 60, opacity: 0` → `x: 0, opacity: 1` and exits with `x: 60, opacity: 0`. Uses `AnimatePresence` in the toast container.
- Auto-dismiss after 4 seconds with a shrinking progress bar at the bottom of the toast card

### Modal / Dialog
- Backdrop: Full-screen fixed overlay with `bg-black/60 backdrop-blur-sm` — enters with `fadeInVariant`
- Dialog box: `bg-surface rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4` — enters with `scaleUpVariant`
- Close button: Top-right `×` button with `whileHover={{ rotate: 90 }}` Framer Motion

---

## ✨ Micro-interactions & Hover Effects

**All Interactive Elements** use a consistent set of micro-interactions:

- **Buttons:** `whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}` — feels tactile and responsive
- **Cards:** `whileHover={{ y: -4 }}` with border color transition — communicates clickability
- **Links:** Underline grows from left using CSS `::after` pseudo-element with `scaleX` transform
- **Icons:** `whileHover={{ rotate: 15 }}` on action icons (edit, delete) for playfulness
- **Checkboxes / Toggles:** Custom styled with Framer Motion path draw animation for the checkmark (`pathLength: 0 → 1` using `motion.svg`)
- **Dropdowns:** Content enters with `scaleUpVariant` from `transformOrigin: "top"` — feels natural and grounded

**Cursor:** On desktop, all clickable elements trigger `cursor-pointer`. A custom cursor follower can optionally be implemented using a `motion.div` that tracks `mouseX` and `mouseY` using Framer Motion's `useMotionValue` and `useSpring` for smooth lag following.

---

## 🔼 Navbar Design & Animation

**Structure:** Fixed top `h-18 bg-surface/80 backdrop-blur-md border-b border-border-default`

**Behavior:**
- On page load: Navbar slides down from `y: -80` to `y: 0` using `fadeUpVariant` with `duration: 0.5`
- On scroll down: Navbar shadow deepens using Framer Motion's `useScroll` — `boxShadow` is a `useTransform` of scroll position from `"none"` to a deep shadow value
- On scroll up: Navbar reappears if it was hidden (optional progressive reveal behavior)

**Contents (left to right):**
- Logo: Portal name with a small icon — `text-xl font-bold`
- Center nav links (desktop): Animated underline for active route using `layoutId="nav-underline"` — the indicator slides between links
- Right side: Theme toggle, Notification bell, User avatar dropdown

**Mobile:** Hamburger menu that opens a slide-in drawer from the right using `slideInRightVariant`

---

## ⏳ Loading & Skeleton States

Every page that fetches data shows skeleton loaders, not a full-page spinner. This is the single biggest perceived performance improvement.

**Skeleton Card:**
- Same dimensions and structure as `JobCard`
- All content areas replaced with `bg-bg-muted rounded-lg animate-shimmer` elements
- The shimmer is a CSS gradient sweep animation defined in Tailwind config

**Skeleton Table Row:**
- Avatar placeholder + 3 text line placeholders
- Used in all admin table pages

**Skeleton Stats Card:**
- Icon placeholder (circle) + number placeholder + label placeholder

**Full Page Loader (route change):**
- A thin progress bar at the very top of the viewport (like YouTube/GitHub)
- `fixed top-0 left-0 h-[3px] bg-brand-primary`
- Width animates from 0% to 90% quickly using Framer Motion, then completes to 100% and fades out when the route fully loads

---

## 🔔 Notification System Design

**Bell Icon:**
- In Navbar, right side
- Unread count badge: `absolute -top-1 -right-1 w-4 h-4 bg-brand-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center`
- On new notification: Badge entrance uses `scaleUpVariant` and the bell itself does a brief `rotate: [0, -15, 15, -10, 10, 0]` wiggle animation using Framer Motion keyframes

**Notification Dropdown:**
- Enters from top-right with `slideInRightVariant`
- `w-80 bg-surface border border-border-default rounded-2xl shadow-xl overflow-hidden`
- Header: "Notifications" heading + "Mark all read" link
- List of notification items with unread ones having a left `border-l-2 border-brand-primary` accent and a subtle `bg-brand-primary/5` background
- Each item has an icon, message text, and timestamp
- "No notifications" empty state: centered icon + message with `fadeInVariant`

---

## 📱 Responsive Design Strategy

**Breakpoint Usage:**

| Tailwind Prefix | Width | Strategy |
|---|---|---|
| (none) | 0px+ | Mobile-first base styles |
| `sm:` | 640px+ | Tablet adjustments |
| `md:` | 768px+ | Tablet landscape / small desktop |
| `lg:` | 1024px+ | Full desktop layout activates |
| `xl:` | 1280px+ | Wide desktop, max content width |

**Mobile-Specific Decisions:**
- Navbar collapses to hamburger + slide drawer
- Job grid collapses to single column
- Filter panel collapses to a "Filters" button that opens a bottom sheet modal
- Dashboard sidebars collapse to a top tab bar on mobile
- Apply button is sticky at the bottom of the screen on Job Details page (`fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border-default`)
- Locomotive Scroll is disabled on mobile (touch devices have native momentum scrolling); regular browser scroll is used on `max-width: 768px`

---

## ♿ Accessibility Guidelines

- All interactive elements are keyboard focusable with a visible `focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2` ring
- All images and icon buttons have descriptive `aria-label` attributes
- Color is never the sole indicator of state — status badges use text + icon + color
- Font sizes never go below `text-xs` (12px) for readable content
- Contrast ratio meets WCAG AA — all text/background combinations tested with at least 4.5:1 ratio
- Modals use `role="dialog"` and `aria-modal="true"` with focus trapped inside while open
- Framer Motion animations respect `prefers-reduced-motion` — wrap all animations with a check: if reduced motion is preferred, set `transition: { duration: 0 }` and skip transforms

---

## 📦 Package Installation Reference

```bash
# Core animation library
npm install framer-motion

# Smooth scroll with momentum and parallax
npm install locomotive-scroll

# Icon library (used throughout the UI)
npm install lucide-react

# Toast notification system (or build custom)
npm install react-hot-toast

# Google Fonts (add to index.html <head>)
# Inter: https://fonts.google.com/specimen/Inter
# Sora: https://fonts.google.com/specimen/Sora
```

Add to `index.html` head:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap" rel="stylesheet" />
```

---

> **Design Tip:** Build the design token system (colors, fonts, spacing) first. Then build the 5 core reusable components (Button, Input, Card, Badge, Modal) in isolation. Every page then assembles from these primitives — making the entire site visually consistent without extra effort.
