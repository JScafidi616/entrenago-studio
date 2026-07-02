DESIGN_SYSTEM.md

# EntrenaGo — Design System

Source of truth for UI/UX consistency across the EntrenaGo project.
Reverse-engineered from the live codebase. Do not redesign — extend only.

---

## 1. Brand Identity
- **Product name**: Entrena GO Studio
- **Internal codename (legacy)**: FitTracker
- **Brand personality**: Energetic, focused, modern. The product feels like a personal trainer — direct, motivating, and no-nonsense.
- **Visual tone**: Dark-first, high contrast, sport-tech. Uses a cyan-to-green gradient as its signature accent, evoking speed and health simultaneously.
- **User perception**: "This app is built for serious people who also want something that looks great."
- **Design philosophy**: Mobile-first, card-based layouts with frosted glass surfaces. Rounded corners everywhere signal approachability. The brand accent gradient is used sparingly and always purposefully — it marks the most important action or active state on any given screen.
- **Product goals**: Help users track workout routines and personal progress with minimum friction and maximum clarity.

## 2. Design Principles
- **Clarity over decoration**: Information is presented cleanly. Decoration is minimal. The gradient accent is used only for CTAs, active states, and key identity moments.
- **Mobile-first**: Every layout is designed for mobile and enhanced progressively. Bottom navigation, bottom padding (`pb-24`), and touch-friendly tap targets (min `40px` height) are core.
- **Dark mode default**: `defaultTheme="dark"` is set in the root layout. All surfaces are coded with dark mode as the primary experience.
- **Progressive disclosure**: Complex features are hidden behind modals. Dashboards show summaries; depth is revealed on demand.
- **Immediate feedback**: Every interactive element provides instant visual feedback: hover state, active scale, color shift, or progress update.
- **Consistency through tokens**: Color, spacing, radius, and shadow reference shadcn/ui CSS variables or Tailwind utility classes.


### Clarity over decoration
Information is presented cleanly. Decoration is minimal. The gradient accent is used only for CTAs, active states, and key identity moments (logo, avatar fallback).

### Mobile-first
Every layout is designed for mobile and enhanced progressively. The bottom navigation bar, bottom padding (`pb-24`), and touch-friendly tap targets (min `40px` height) are core to the mobile experience.

### Dark mode default
`defaultTheme="dark"` is set in the root layout. All surfaces, borders, and backgrounds are coded with dark mode as the primary experience and light mode as a supported alternative.

### Progressive disclosure
Complex features (workout details, full exercise lists) are hidden behind modals. Dashboards show summaries; depth is revealed on demand.

### Immediate feedback
Every interactive element provides instant visual feedback: hover state, active scale, color shift, or progress update. No silent actions.

### Consistency through tokens
Color, spacing, radius, and shadow are not hardcoded — they reference shadcn/ui CSS variables (`bg-background`, `text-muted-foreground`, `border-border`, etc.) or Tailwind utility classes that map to the same token system.

---

## 3. Color System

### Brand Accent (Gradient)
The signature visual identity of EntrenaGo. 
- **Value**: `bg-linear-to-r from-cyan-500 to-green-400` *(Note: Tailwind v4 syntax)*
- **Hover**: `hover:from-cyan-600 hover:to-green-500`
- **Text on gradient**: Always `text-white`
- **Directional variants**: `bg-linear-to-br` is used for card background tints (e.g., Day Cards).
- **Rule**: Do not use this gradient for standard backgrounds or decorative elements.

### Semantic Tokens (shadcn/ui CSS variables)
| Token | Light mode purpose | Dark mode purpose |
|---|---|---|
| `--background` | Page background (white/gray-100) | Near-black (neutral-900) |
| `--foreground` | Primary text (near-black) | Primary text (near-white/gray-300) |
| `--card` | Card surface (white) | Card surface (neutral-800) |
| `--muted` | Subtle backgrounds | Subtle backgrounds (neutral-700/800) |
| `--muted-foreground` | Secondary/caption text | Secondary/caption text |
| `--border` | Borders, dividers | Borders, dividers |
| `--primary` | Primary actions, progress bars | Primary actions, progress bars |
| `--destructive` | Error, danger, delete actions | Error, danger |

### Extended Semantic Colors (Stat Icons & States)
| Color | Usage |
|---|---|
| `cyan-500` / `green-400` | Brand accent, active states, focus borders |
| `orange-500` (bg: `orange-100`/`orange-900/30`) | Streak stat icon, rest timer, warning indicators |
| `blue-500` (bg: `blue-100`/`blue-900/30`) | Weekly progress stat icon |
| `green-500` (bg: `green-100`/`green-900/30`) | Time stat icon, completed workout states |
| `purple-500` (bg: `purple-100`/`purple-900/30`) | Exercises stat icon |
| `red-500` / `red-600` | Destructive actions |

### Opacity modifiers
Surfaces use opacity modifiers extensively for frosted glass effects:
- `bg-card/50`, `dark:bg-neutral-800/50` — standard card surface
- `bg-muted/30`, `dark:bg-neutral-800/30` — input and row backgrounds
- `bg-background/95`, `dark:bg-neutral-800/95` — nav bars
- `supports-backdrop-filter:bg-background/60` — enhanced blur fallback

Surfaces use opacity modifiers extensively for frosted glass effects:
- `bg-card/50`, `dark:bg-neutral-800/50` — standard card surface
- `bg-muted/30`, `dark:bg-neutral-800/30` — input and row backgrounds
- `bg-background/95`, `dark:bg-neutral-800/95` — nav bars
- `border-border/50` — all card and nav borders
- `bg-gradient-to-r from-cyan-500/10 to-green-400/10` — subtle tinted panels (e.g., mobile nav user card)

---

## 4. Typography
- **Font family**: `Mulish` (Google Fonts, loaded via `<link>` in `<head>`).
- **Applied via**: Global CSS or body class. Uses default Tailwind `font-sans` stack as fallback.

### Heading Hierarchy
| Level | Classes | Usage |
|---|---|---|
| Page title | `text-2xl md:text-3xl font-bold text-foreground` | Section headers |
| Card title | `text-xl font-semibold text-foreground` | Modal exercise name, card headers |
| Stat value | `text-lg md:text-2xl font-bold text-foreground` | Profile stat numbers |
| Section label | `text-sm font-semibold text-foreground` | Settings row labels |

### Body Text
| Type | Classes | Usage |
|---|---|---|
| Body default | `text-sm leading-relaxed text-muted-foreground` | Descriptive paragraphs |
| Body medium | `text-sm font-medium text-foreground` | Nav labels, row titles |
| Caption | `text-xs text-muted-foreground` | Stat labels, timestamps |
| Error text | `text-xs text-destructive` | Inline form validation errors |

## 5. Spacing System
EntrenaGo uses Tailwind's default spacing scale.
- **Card inner padding**: `p-6` (standard), `p-4` (compact)
- **Settings row padding**: `p-3` (desktop), `p-2.5` (mobile)
- **Nav bar horizontal padding**: `px-6`
- **Section spacing**: `space-y-6 md:space-y-8` between major sections.
- **Mobile bottom clearance**: All scrollable pages use `pb-12 md:pb-8` or `pb-24 md:pb-8` to clear the bottom nav.
- **Container**: `container mx-auto px-6 max-w-7xl` (dashboard), `max-w-4xl` (profile).

## 6. Border Radius
EntrenaGo uses large, consistent radii, but introduces `rounded-md` for specific full-width elements.
| Radius | Tailwind class | Usage |
|---|---|---|
| 16px | `rounded-2xl` | Cards, nav bars, inputs, settings rows, day cards, bottom nav |
| 24px | `rounded-3xl` | Modal `DialogContent`, Sheet left panel |
| 9999px | `rounded-full` | Icon containers, avatar ring, logo icon background, scroll dots |
| 12px | `rounded-xl` | Bottom nav items, auth page inputs |
| 6px | `rounded-md` | **Full-width primary CTAs** (e.g., "Start Workout"), modal submit buttons, progress bars |

**Key rule**: Use `rounded-2xl` for standard components. Use `rounded-md` *only* for full-width action buttons and modal footers.

## 7. Shadows
| Level | Class | Usage |
|---|---|---|
| Subtle | `shadow-sm` | Standard cards, nav bars |
| Standard | `shadow` | "Today's Workout" card |
| Hover elevation | `shadow-md` | Cards on hover, active gradient buttons |
| High elevation | `shadow-lg` | Bottom nav bar, Day cards |
| Extra high | `shadow-xl` | Modals, Day cards on hover (`hover:shadow-xl`) |

## 8. Buttons

### Primary (Brand Gradient)
**Purpose:** The most important action on the screen. Used for CTA, "Start Workout", "Save Changes", form submits.

```
bg-linear-to-r from-cyan-500 to-green-400 
hover:from-cyan-600 hover:to-green-500 
text-white font-semibold 
h-10 rounded-md px-6 has-[>svg]:px-4 w-full 
py-3 shadow-lg hover:shadow-xl transition-all duration-200
```

### Secondary / Outline
**Purpose:** Secondary actions, "Previous", "Reset", "Change" buttons.

```
variant="outline"
bg-transparent | bg-muted/30
border-border/50
rounded-2xl
hover:bg-muted/50
```

### Ghost
**Purpose:** Icon-only utility buttons (close, theme toggle).

```
variant="ghost"
size="icon"
rounded-full h-8 w-8 | h-10 w-10
hover:bg-accent
```

### Destructive
**Purpose:** Dangerous or irreversible actions (delete account).

```
variant="destructive"
bg-red-600 hover:bg-red-700
text-white rounded-2xl
```

### Back / Navigation Button
**Purpose:** Return to previous screen (profile page back-to-dashboard).

```
flex items-center gap-2 px-3 md:px-4 h-10
rounded-2xl text-sm font-medium
text-foreground
bg-muted/40 dark:bg-neutral-700/40
hover:bg-muted/70 dark:hover:bg-neutral-700/70
active:scale-95 transition-all duration-200
```

### Button sizing
- Default: `h-11` for form CTAs
- Small: `size="sm"` for inline settings actions
- Icon: `h-8 w-8` or `h-10 w-10` with `rounded-full`

---

## 9. Forms

### Inputs
```
h-11 rounded-xl
bg-muted/30 dark:bg-neutral-700/40
border-border/50
focus:border-cyan-500 focus:ring-cyan-500/20
transition-colors
```

Icon-prefixed inputs use `pl-10` and position an absolute icon at `left-3 top-1/2 -translate-y-1/2`.

Password inputs add a visibility toggle button at `right-3`.

**Disabled state:** `disabled:opacity-70` — field remains visible but clearly inactive. Used in Profile edit mode.

**Error state:** `border-destructive focus:border-destructive focus:ring-destructive/20`

### Labels
```
text-sm font-medium text-foreground
```
Always paired with `htmlFor` pointing to the input `id`.

### Error messages
```
text-xs text-destructive mt-0.5
role="alert"
id="[field]-error"
aria-describedby="[field]-error" on the input
```

### Textareas
Same style as inputs. Add `resize-none` and explicit `rows` prop.

### Switches (Toggle settings)
```
data-[state=checked]:bg-cyan-500
```
Paired with a `Label` using `htmlFor` for accessibility.

### Validation pattern
Client-side, on submit. Errors are shown inline below the field. No toast for validation — only for async server errors.

---

## 10. Cards

### Standard Card
The foundational surface for all content blocks.

```
border-border/50
bg-card/50 dark:bg-neutral-800/50
backdrop-blur
supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50
rounded-2xl
shadow-sm
```

### Interactive Card (hover elevation)
```
hover:shadow-md transition-all duration-200
```
Used for profile stat cards and weekly schedule day cards.

### Tinted state cards
Used inside the workout modal for rest and completed states:
- **Rest:** `border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30`
- **Completed:** `border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30`
- **Active exercise:** `border-cyan-200 dark:border-cyan-800 bg-cyan-100 dark:bg-cyan-900/30`

### Settings row (inner card)
Not a `<Card>` component — a styled `div`:
```
p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30
```

### CardHeader / CardContent
- `CardHeader` uses default padding with optional `pb-3` for tighter mobile headers.
- `CardContent` uses `p-4` (compact) or `p-6` (standard).

---

## 11. Modals & Dialogs

### WorkoutModal (DialogContent)
```
max-w-2xl w-full mx-4
bg-background/95 dark:bg-neutral-800/95
backdrop-blur-xl
border border-border/50
rounded-3xl
shadow-2xl
```

**Backdrop:** Provided by Radix `Dialog` — dark semi-transparent overlay.  
**Dismiss:** X button (`variant="ghost" size="icon" rounded-full h-8 w-8`) in the header, plus clicking the backdrop.  
**Footer:** Action buttons separated from content by `border-t border-border/50`.  
**Scrollable inner list:** `max-h-40 overflow-y-auto` for the exercise list inside the modal.

### Sheet (MobileNav drawer)
```
side="right"
w-80
dark:bg-neutral-800
rounded-l-3xl
border-l border-border/50
```
Close button is positioned `absolute right-4 top-4`.

---

## 12. Navigation

### Desktop Top Nav (Dashboard)
- Sticky, `top-0 z-50`
- `bg-background/95 dark:bg-neutral-800/95 backdrop-blur`
- `border-b border-border/50`
- `mx-4 rounded-2xl shadow-sm` — floats above the page with margin
- Height: `h-16`
- Left: Logo (gradient rounded-full icon + brand name)
- Right: ThemeToggle + UserDropdown

### Profile/Auth Top Nav
Same structure as dashboard nav. No ThemeToggle — only the back button on the right.

### Bottom Navigation (Mobile only, `md:hidden`)
```
fixed bottom-4 left-4 right-4 z-50
bg-background/95 dark:bg-neutral-800/95 backdrop-blur
border border-border/50 rounded-2xl shadow-lg
```
Three items: Dashboard, Progress, Routines.

**Active item:**
```
bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md rounded-xl
```

**Inactive item:**
```
text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl
```

### Mobile Sheet Nav (hamburger menu)
Triggered by a ghost icon button. Contains: user identity card (tinted gradient panel), Profile link, Settings link, Log Out (red tint on hover).

### UserDropdown (Desktop)
Avatar trigger → dropdown with Profile, Settings, Log Out items. Navigation via `useRouter().push()`.

---

## 13. Feedback Components

### Success state (auth pages)
Centered layout with:
- `w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/15` container
- `CheckCircle2 h-8 w-8 text-green-500 strokeWidth={1.75}` icon
- Bold title, muted body text, optional countdown in `text-cyan-500 font-semibold`
- Back link using the standard link style

### Rest timer (workout modal)
Orange-tinted card (`border-orange-200 bg-orange-50`) with large `text-4xl font-bold` countdown. Pause/Resume and Skip buttons.

### Progress bar
`<Progress />` component with `h-2` height. Used in the workout modal header to track completion.

### Ad placeholder
```
rounded-2xl border border-dashed border-border/40
bg-muted/20 dark:bg-neutral-800/30
h-24 md:h-28 (horizontal) | aspect-square (square)
```
Centered muted label in `text-[10px] uppercase tracking-widest`.

### Loading states
Buttons show a text label change: "Enviando...", "Procesando..." — no spinner component is currently used in forms.

### Validation errors
Inline, below the relevant field. `text-xs text-destructive role="alert"`.

---

## 14. Icons

**Library:** `lucide-react` — used exclusively throughout the project.

### Sizing conventions

| Size | Context |
|---|---|
| `h-3 w-3` | Inline badge icons, tiny indicators |
| `h-3.5 w-3.5` | Small inline link icons (back arrow in auth) |
| `h-4 w-4` | Button icons, form prefix icons, settings row icons |
| `h-5 w-5` | Nav icons, card title icons, bottom nav icons |
| `h-6 w-6` | Logo icon (inside nav), modal exercise icon (large card) |
| `h-8 w-8` | Success state checkmark |

### Icon containers
Icons are often placed inside a rounded container to create visual grouping:
```
p-2 rounded-full bg-[color]-100 dark:bg-[color]-900/30
```
For settings rows:
```
p-2 rounded-full bg-background/50 dark:bg-neutral-700/30
```

### Icon colors
- Brand: `text-cyan-500`
- Success: `text-green-500` / `text-green-600 dark:text-green-400`
- Warning/Rest: `text-orange-500`
- Muted/secondary: `text-muted-foreground`
- White (on gradient): `text-white`

---

## 15. Motion

### Philosophy
Transitions are fast and functional — they signal state change, not entertain. Animation duration is consistently `200ms`. No complex keyframe animations exist in the current codebase.

### Standard transition
```
transition-all duration-200
```
Applied to: buttons (hover + active), cards (shadow change), nav items, input border/ring changes.

### Scale interactions
- Buttons: `active:scale-[0.98]` (primary CTA) or `active:scale-95` (back button)
- These provide tactile "press" feedback without a library.

### Theme transition
`disableTransitionOnChange` is set on `ThemeProvider` — theme switches are instant, not animated.

### Scrollbar behavior
The weekly schedule uses `scrollbar-hide` and touch momentum scrolling (`-webkit-overflow-scrolling: touch`). A 4px styled scrollbar is shown on the weekly schedule only.

---

## 16. Responsive Design

### Breakpoints (Tailwind defaults)
| Name | Min-width | Usage |
|---|---|---|
| `sm` | 640px | Show full text in buttons (`hidden sm:inline`), switch to row layouts |
| `md` | 768px | Show desktop nav, hide bottom nav, adjust type scale, increase padding |
| `lg` | 1024px | Not currently used explicitly |

### Mobile adaptations
- Bottom nav replaces top nav tabs for section switching
- Cards stack vertically; profile identity switches from column to row at `sm:`
- Paddings reduce (`px-2` inner, `pb-24` bottom clearance)
- Modal uses `mx-4` to ensure viewport margin on small screens
- Weekly schedule scrolls horizontally with `overflow-x-auto`

### Touch targets
All interactive elements meet a minimum `40px` height/width: `h-10`, `h-11`, `py-3`, `min-w-[44px]`.

---

## 17. Accessibility

### ARIA
- Form inputs paired with `<Label htmlFor="...">` and `aria-describedby` on error
- Error messages use `role="alert"` for immediate announcement
- Icon-only buttons use `aria-label`
- Close buttons have `<span className="sr-only">Close</span>`
- Bottom nav and tab triggers are native `<button>` elements

### Focus indicators
Inputs use `focus:border-cyan-500 focus:ring-cyan-500/20`. Radix primitives (Dialog, Sheet, Tabs, DropdownMenu) provide built-in focus trapping and keyboard navigation.

### Keyboard navigation
All interactive elements are reachable by keyboard. Radix UI components (Sheet, Dialog, DropdownMenu, Tabs) handle arrow-key navigation, Escape to close, and focus restoration automatically.

### Contrast
Dark mode default ensures high contrast between `text-foreground` (near-white) and `bg-neutral-800` surfaces. Muted text (`text-muted-foreground`) is used only for secondary/supportive content, never for primary actionable labels.

### Screen reader considerations
Decorative icon-only buttons carry `aria-label`. The `<Progress />` component from shadcn/ui includes the accessible `role="progressbar"` and `aria-valuenow` attributes.

---

## 18. Component Inventory

| Component | File | Purpose | Variants | Reusable |
|---|---|---|---|---|
| `BottomNav` | `components/bottom-nav.tsx` | Mobile section navigation | Fixed 3 items | Yes |
| `MobileNav` | `components/mobile-nav.tsx` | Hamburger slide-in menu (Sheet) | Single | Yes |
| `UserDropdown` | `components/user-dropdown.tsx` | Desktop user menu | Single | Yes |
| `ThemeToggle` | `components/theme-toggle.tsx` | Light/dark/system switcher | Dropdown | Yes |
| `WorkoutModal` | `components/workout-modal.tsx` | Active workout session tracker | Full-screen modal | Yes |
| `AdBox` | `components/ad-box.tsx` | Ad placeholder | `horizontal`, `square` | Yes |
| `SiteFooter` | `components/site-footer.tsx` | Copyright footer | Single line | Yes |
| `ProfileSettings` | `components/profile-settings.tsx` | Tabbed profile/settings layout wrapper | Two tabs | Yes |
| `ProfileSection` | `components/profile-section.tsx` | User identity + stats + edit form | Edit mode / view mode | No (page-specific) |
| `SettingsSection` | `components/settings-section.tsx` | App settings grouped by category | — | No (page-specific) |
| `PasswordForm` | `components/password-form.tsx` | New + confirm password fields with validation | Configurable submit label | Yes |
| `ExerciseLegend` | `components/exercise-legend.tsx` | Exercise category color legend | — | Yes |
| `ThemeProvider` | `components/theme-provider.tsx` | next-themes wrapper | — | Infrastructure |
| Auth page: Forgot Password | `app/forgot-password/page.tsx` | Email input + success state | Form / email-sent | No |
| Auth page: Reset Password | `app/reset-password/page.tsx` | New password + countdown success | Form / success + timer | No |
| Email: Confirm Signup | `public/emails/confirm-signup.html` | Transactional email template | Single | No |
| Email: Reset Password | `public/emails/reset-password.html` | Transactional email template | Single | No |
| Email Preview | `app/email-preview/page.tsx` | Internal template preview tool | Toggle between 2 | Internal only |

---

## 19. UX Patterns

### Authentication flow
1. User arrives at `/forgot-password`
2. Submits email → optimistic loading state on button ("Enviando...")
3. On success → in-page transition to confirmation state (no route change)
4. Confirmation shows the submitted email address to reduce anxiety
5. `/reset-password` → PasswordForm → success state with 5-second countdown + manual skip link

### Form pattern
1. Label above input, icon prefix inside input
2. Submit triggers client-side validation first
3. If invalid: inline error below field, input border turns destructive
4. If valid: button enters loading state, async call, then success state

### Confirmation / success screens
Always shown in-place (same card, same route). Never navigate to a separate "success page". Show a green `CheckCircle2` icon, a bold title, a body sentence, and a single action link.

### Navigation
- Dashboard: section state managed in React (`useState("dashboard")`). No route changes between Dashboard / Progress / Routines.
- Profile/Settings: separate route (`/profile`). Tab state is controlled and deep-linkable via `?tab=settings`.
- All nav links use `useRouter().push()` — no `<a href>` for in-app navigation except in auth pages (which use `<Link>`).

### Empty states
Rest days in the weekly schedule show a dash/null state card. No separate "empty state" component exists yet.

### Loading states
Button label mutation ("Enviando...", "Procesando...") is the only loading indicator on forms. No global spinner or skeleton exists in the current implementation.

---

## 20. AI Implementation Guidelines

These rules are specifically for AI coding assistants generating new features for EntrenaGo.

### Mandatory rules

1. **Never introduce a new button style.** Use one of the five documented variants: Primary gradient, Outline, Ghost (icon), Destructive, Back/Navigation. If none fits, use Outline.

2. **Never hardcode a color value.** Always use semantic Tailwind tokens (`bg-background`, `text-muted-foreground`, `border-border/50`, etc.) or the documented inline colors (`text-cyan-500`, `text-green-500`, etc.). No `#hex`, no `rgb()`.

3. **Always use `rounded-2xl` as the default radius.** Use `rounded-full` only for circular containers. Use `rounded-xl` only for auth-page inputs and CTAs. Never use `rounded-lg` or `rounded-md`.

4. **Always include dark mode classes.** Every `bg-*` and `border-*` should have a `dark:` counterpart. Follow the pattern: `bg-card/50 dark:bg-neutral-800/50`.

5. **Always add `transition-all duration-200`** to interactive elements.

6. **Use `space-y-6` between major sections, `space-y-3` within a card's rows.** Do not mix `gap` and `space-*` on the same element. Use `gap-*` for flex/grid children, `space-y-*` for stacked block elements.

7. **New pages that contain content must include `pb-24 md:pb-8`** on their scrollable content wrapper to clear the mobile bottom nav.

8. **Never create a new icon component.** Use `lucide-react` imports only. Size icons using the documented size table (`h-4 w-4`, `h-5 w-5`, etc.).

9. **The brand gradient (`from-cyan-500 to-green-400`) is reserved** for: primary CTA buttons, active nav/tab states, the logo icon background, and avatar fallbacks. Do not use it for card backgrounds, section headers, or decorative elements.

10. **Form inputs must follow the full pattern:** `h-11 rounded-xl bg-muted/30 dark:bg-neutral-700/40 border-border/50 focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors`. Never use plain `<input>` — always use the `<Input>` shadcn component.

11. **New cards must match the standard card surface:** `border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl shadow-sm`. Copy this class string exactly.

12. **Reuse `<PasswordForm>` for any new password input screen.** Do not build a new password component.

13. **Settings rows (toggles, preferences)** must use the inner-row pattern: `p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30`. Not a `<Card>` — a styled `<div>`.

14. **Keep type hierarchy consistent.** Page title: `text-2xl md:text-3xl font-bold`. Card header: use `<CardTitle>`. Body: `text-sm leading-relaxed text-muted-foreground`. Error: `text-xs text-destructive`. Do not invent new combinations.

15. **Success states always show `CheckCircle2`** from lucide-react in a `w-16 h-16 rounded-full bg-green-500/10` container. Follow the auth success state pattern exactly.

16. **Accessibility is not optional.** Every new button must have a label or `aria-label`. Every new form field must have a `<Label>` with `htmlFor`. Every error message must have `role="alert"`.

17. **Use `useRouter().push()` for in-app navigation** from client components. Use `<Link>` only in auth/public pages or for anchor-style links.

18. **The sticky nav pattern is:** `sticky top-0 z-50 mx-4 mt-1 rounded-2xl shadow-sm border-b border-border/50 bg-background/95 dark:bg-neutral-800/95 backdrop-blur`. Match it exactly when building new page-level nav bars.

19. **Never add animation libraries.** All motion uses Tailwind's `transition-*`, `duration-200`, `hover:*`, and `active:scale-*` utilities only.

20. **SWR is the preferred data-fetching pattern** for client components that need remote data. Do not use `useEffect` + `fetch`.
