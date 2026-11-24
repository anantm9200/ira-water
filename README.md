# Ira Water — V6 homepage prototype

**Status:** Homepage-only preview. Do not publish as the approved production website until Ira Water signs off.

## Scope
Built against the attached *Ira — Website Sitemap: Homepage + Main Menu / V6*.

The homepage has exactly ten primary sections:
1. Hero
2. Trust & Experience
3. Who We Work With
4. Our Expertise: Audit, Consulting, Projects
5. Water Problems We Solve & Our Solutions (one combined section)
6. Project & Results
7. How We Work: Diagnose, Design, Deliver
8. Purpose & Recognition
9. Insights & Tools
10. Final CTA & Footer

The six navigation items are About Us, Solutions, Impact, Insights, Join Us and Contact. They link to relevant places **on the homepage**, not unfinished internal pages.

## Design
- Single light appearance, no theme switcher.
- Inter body copy, Poppins headings; mobile-first responsive layouts.
- Header and footer side gutters: 1.5%. Main sections: 3%.
- Premium, minimal, bright palette with emerald, aqua and soft ivory.
- Stock photos are **illustrative**, not claims about Ira projects.
- Reduced-motion support and accessible mobile navigation.
- Water challenge selector and simple rainwater estimate are operational.

## Functionality / truth-in-claims
- Contact form opens the visitor's email application with the enquiry prepared. It **does not** send or store an enquiry server-side. Production email delivery to be integrated after approval.
- Rainwater calculator = roof area × annual rainfall × 80% illustrative collection factor. It is not an engineering guarantee.
- Project before/after photos and verified impact figures need real approved project records.
- Client logos, awards, founder quote, authentic event photographs and downloads await approved assets.
- Inner pages and complete legal policies are intentionally **not created yet**.
- Stock photos are served from Unsplash URLs; check relevant image licences and use local licensed assets before production.
- The header and footer use Ira's original logo asset copied from the archived repository, while project and editorial imagery remain stock placeholders.

## Files
- `index.html`: full homepage content
- `styles.css`: responsive design system
- `script.js`: navigation, reveal effects, water selector, calculator and enquiry
- `robots.txt`: blocks search indexing while this is a draft

No framework or build dependencies. Deploy as a static site.

## Existing site
The old version is preserved in the separate private repository `anantm9200/ira-water-backup`.
