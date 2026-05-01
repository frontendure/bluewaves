# 📘 Blue Waves: Comprehensive Developer & Architecture Guide

Welcome to the definitive backend architecture and code-editing manual for the Blue Waves aquatic center platform. This document serves as the absolute blueprint detailing how every system, script, CSS variable, and API interacts, ensuring any future developer can seamlessly modify or expand the application without breaking core functionality.

---

## 1. Directory Structure & Apache Routing

The application relies on a strictly static-first client-side architecture intended to maximize loading speed.

### Files of Critical Importance:
*   `index.html` → Defines the core Hero landing state and dynamic layout swaps.
*   `programs.html` & `membership.html` → Utilize advanced Bootstrap 5 flexbox alignment algorithms.
*   `.htaccess` → The Apache server configuration override. It is programmed specifically to intercept `404 Not Found` requests globally and route them to `404.html` bypassing default web server error screens.
*   `sitemap.xml` & `robots.txt` → Pre-configured SEO matrices. The robots file uniquely targets search-engine spiders (like GoogleBot) prohibiting them from indexing backend URLs like `/admin.html`.

---

## 2. The CSS Variable Matrix (`style.css`)

The theme relies extensively on **CSS Variables** located inside the `:root` pseudo-class at the very beginning of the stylesheet. **Never hardcode hex values** on individual HTML elements. Always inherit from these centralized variables so the theme can be updated system-wide simultaneously.

### Color Mapping:
*   `--primary: #00A3E0;` → Standard hyperlink and interactive button highlights.
*   `--accent: #D4AF37;` → Champagne Gold (used specifically for the 'Advanced Coaching' tier and italicized Hero brand highlights).
*   `--dark-bg: #0B192C;` → Deep Navy Blue (The primary surface block for `.premium-box`).
*   `--darker-bg: #071120;` → Ultra Dark Navy (Used mainly to sink the footer and root headers).
*   `--soft-bg: rgba(255, 255, 255, 0.03);` → Translucent White used heavily inside frosted-glass components (`.hero-logo-circle`).

### Component Scaling:
To modify the site's general font layout (which inherently utilizes `Inter` and `Playfair Display`), manipulate the global clamps:
```css
/* Example of fluid typography used in Blue Waves */
font-size: clamp(1.8rem, 8vw, 2.2rem) !important;
```
*This `clamp` function ensures headers seamlessly shrink natively scaling to viewport width instead of needing distinct break-points for every device size.*

---

## 3. DOM Hardware Acceleration & Animation Logic

### 3.1 Intersection Observers (`script.js`)
Smooth fade-in rendering operates via a JavaScript `IntersectionObserver` built tightly into `js/script.js`.
1.  Any HTML element assigned the `.animate-on-scroll` class is flagged into memory.
2.  When the user actively scrolls vertically across the Y-axis and that designated element crosses exactly `15%` of the viewable threshold (`threshold: 0.15`), the JavaScript dynamically binds a secondary pseudo-class to it called `.is-visible`.
3.  The `.is-visible` class natively forces `opacity: 1` and `transform: translateY(0)`.

### 3.2 Cascading Render Processing
You can instruct elements to trigger consecutively (a visual cascading chain) by dropping delay classes onto the HTML node:
```html
<!-- This appears immediately on intersection -->
<div class="animate-on-scroll">Content A</div> 

<!-- This appears 200 milliseconds AFTER Content A is loaded -->
<div class="animate-on-scroll delay-200">Content B</div> 
```
*Always ensure `.animate-on-scroll` possesses `will-change: transform, opacity;` in the CSS to lock native hardware acceleration rendering parameters directly to the user's mobile GPU, eliminating Chrome jitter.*

---

## 4. Mobile Refactoring Overrides

Future expansion of the CSS must respect the `@media (max-width: 767.98px)` media query positioned at the utter bottom of `style.css`. 

### 4.1 Eradicating Viewport Wobble 
By default, placing negative margins on `.row` bootstrap grids breaks Mobile limits creating infinite horizontal scrolling bugs (the "Screen Wobble"). 
The application eradicates this natively:
1.  **Global Constraints:** `html, body { max-width: 100%; overflow-x: hidden !important; }`. Inheriting 100% instead of `100vw` intrinsically deducts the system's scrollbar width dynamically enforcing a hard container boundary.
2.  **User-Scalable Lock:** The HTML head utilizes `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />` outright banning two-finger pinching bounding breaks across Android/IOS hardware.

### 4.2 DOM Swapping Subroutines
If you wish to program UI elements specifically meant exclusively for Laptops that disappear on Phones without needing heavy JS frameworks, utilize Bootstrap's flex classes:
*   `d-none d-lg-block`: Destroys the HTML node on small hardware devices outright, generating it fully rendered on Desktop monitors.
*   `d-lg-none`: Executes the exact reverse.

### 4.3 Nav-Bar Off-Click Script Subroutine
In `js/script.js` an explicit click tracker binds globally to the DOM rendering engine:
```javascript
document.addEventListener('click', function(event) { ... });
```
To avoid Bootstrap transition race-condition issues, instead of the script pseudo-clicking the menu to retract it, the code establishes a native Object hook targeting `bootstrap.Collapse.getInstance(navMenu)` and triggers `.hide()` forcefully whenever a click registers outside of its physical border.

---

## 5. Webhook Editing (Formspree.io API)

The `/contact.html` application does not require a native PHP backend logic processing engine preventing massive attack-vector spam loops.
All HTML forms are serialized seamlessly directly utilizing `action="https://formspree.io/f/xaqalelw"`.

**To Add New Form Fields**:
Just utilize a standard HTML `<input>` but you **MUST** attach a standardized `name=` parameter, e.g., `<input type="text" name="Address">`. Formspree reads the `name` attribute payload and bundles it neatly inside the email sent.

---

## 6. Remote Database Administration (Supabase APIs)

Should the website be actively pulling backend dynamic data (e.g. `gallery.html`, schedules), execution operates within `frontend/js/supabase-config.js`.

The config strictly requires:
1.  `const SUPABASE_URL` → The absolute API gateway for HTTP requests.
2.  `const SUPABASE_ANON_KEY` → The secure REST access-level token verifying database permissions. 

*If rows in the Supabase schema are modified, ensure the explicit Javascript Promise fetch array inside the frontend specifically maps identical variables parsing JSON payloads. Never expose a database root or SERVICE_KEY inside the URL structures.*

---

## 7. Direct Code Component Snippets

### Modifying the Pricing List Variables:
In `membership.html`, if you need to build another line item under *Swimming with Coaching*:
Copy the structural table row (`<tr>`) parameter, maintaining the strict `.py-3` spacing paddings:
```html
<tr class="border-bottom">
   <td class="fw-bold py-3">Advanced Level - Annual</td>
   <td class="text-end py-3 text-brand" style="color: var(--accent);">₹25,000</td>
</tr>
```

### Expanding Mobile Icon Arrays:
In `programs.html`, we modified `.schedule-list li` via `style.css` to sit naturally side-by-side using `flex-direction: row;`. If you place a long badge into this element requiring wrapping, edit the `<span class="badge">` element to have `white-space: normal` removing the overflow boundaries restricting text breaks!
